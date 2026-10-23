import { useRef, type PointerEvent as ReactPointerEvent } from 'react';

import {
  cancelWindowFrame,
  readViewportSize,
  requestWindowFrame,
} from '@/features/window-manager/adapters/browser-window';
import { clampWindowPosition } from '@/features/window-manager/domain/clamp-window-position';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';

type UseWindowInteractionsOptions = {
  window: WindowState;
  moveWindow: (id: number, x: number, y: number) => void;
  toggleMaximizeWindow: (id: number) => void;
};

/** Controls inside a drag region keep their own pointer behavior. */
const NON_DRAGGABLE_SELECTOR =
  'button, a, input, textarea, select, label, [role="slider"], [role="button"], [data-window-no-drag]';

/**
 * Unified windows have no title strip, so any element marked with
 * `data-window-drag-region` — a toolbar, a sidebar header — moves the window,
 * except where the pointer lands on a control.
 */
function isWindowDragHandle(target: EventTarget) {
  return (
    target instanceof Element &&
    target.closest('[data-window-drag-region]') !== null &&
    target.closest(NON_DRAGGABLE_SELECTOR) === null
  );
}

type WindowDrag = {
  startX: number;
  startY: number;
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  frame: number | null;
};

export function useWindowInteractions({
  window,
  moveWindow,
  toggleMaximizeWindow,
}: UseWindowInteractionsOptions) {
  const windowElement = useRef<HTMLElement>(null);
  const drag = useRef<WindowDrag | null>(null);
  // Pointer capture retargets the follow-up `dblclick` to the window itself, so
  // whether the press began on a drag handle is remembered here instead.
  const pressedOnDragHandle = useRef(false);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    pressedOnDragHandle.current = event.button === 0 && isWindowDragHandle(event.target);
    if (window.maximized || !pressedOnDragHandle.current) return;
    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      x: window.x,
      y: window.y,
      lastX: event.clientX,
      lastY: event.clientY,
      frame: null,
    };
    // A data attribute, not a class: pressing a background window focuses it,
    // and React's re-render rewrites `className`, which would drop a class
    // added here and bring the transform transition back mid-drag.
    windowElement.current?.setAttribute('data-dragging', '');
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!drag.current) return;
    drag.current.lastX = event.clientX;
    drag.current.lastY = event.clientY;
    if (drag.current.frame !== null) return;
    drag.current.frame = requestWindowFrame(() => {
      const current = drag.current;
      const element = windowElement.current;
      if (!current || !element) return;
      element.style.transform = `translate3d(${current.lastX - current.startX}px, ${current.lastY - current.startY}px, 0)`;
      current.frame = null;
    });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const current = drag.current;
    const element = windowElement.current;
    if (!current || !element) return;
    if (current.frame !== null) cancelWindowFrame(current.frame);
    const nextPosition = clampWindowPosition(
      current.x + event.clientX - current.startX,
      current.y + event.clientY - current.startY,
      readViewportSize(),
    );
    element.style.left = `${nextPosition.x}px`;
    element.style.top = `${nextPosition.y}px`;
    element.style.transform = 'translate3d(0, 0, 0)';
    drag.current = null;
    moveWindow(window.id, nextPosition.x, nextPosition.y);
    requestWindowFrame(() => element.removeAttribute('data-dragging'));
  };

  const toggleMaximize = () => {
    const element = windowElement.current;
    if (!element) return toggleMaximizeWindow(window.id);
    const first = element.getBoundingClientRect();
    toggleMaximizeWindow(window.id);
    requestWindowFrame(() => {
      const last = element.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const scaleX = first.width / last.width;
      const scaleY = first.height / last.height;
      element.animate(
        [
          {
            transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`,
          },
          { transform: 'translate3d(0, 0, 0) scale(1)' },
        ],
        { duration: 240, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    });
  };

  const onDoubleClick = () => {
    if (pressedOnDragHandle.current) toggleMaximize();
  };

  return {
    windowElement,
    onDoubleClick,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    toggleMaximize,
  };
}
