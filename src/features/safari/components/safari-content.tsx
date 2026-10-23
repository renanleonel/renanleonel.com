import {
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  PanelLeft,
  PanelTop,
  Plus,
  RotateCw,
  Share,
} from 'lucide-react';
import { useState } from 'react';

import { SafariPage } from '@/features/safari/components/safari-page';
import { PROFILE } from '@/shared/domain/constants/profile';
import {
  GLASS_TOOLBAR_FIELD,
  GLASS_TOOLBAR_GROUP,
  TOOLBAR_BUTTON,
  WINDOW_TOOLBAR,
} from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

/** Safari chrome that this simulated page cannot act on stays visibly inert. */
const STATIC_TOOLBAR_ICON = 'h-8 min-w-8 grid place-items-center px-1.5';

/**
 * Safari 26 on Tahoe: sidebar and history capsules, a centred smart search
 * field (page menu, domain, reload), and the share / new tab / tab overview
 * capsule. The page runs edge to edge and scrolls beneath the glass toolbar,
 * softened by the scroll-edge blur.
 */
export function SafariContent() {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className='safari-app relative h-full overflow-hidden [background:oklch(0.985_0.004_250)]'>
      <SafariPage key={reloadKey} />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 z-[5] h-17 [background:linear-gradient(to_bottom,oklch(0.985_0.004_250/0.9)_30%,oklch(0.985_0.004_250/0))] [backdrop-filter:blur(8px)] [-webkit-backdrop-filter:blur(8px)] [mask-image:linear-gradient(to_bottom,black_50%,transparent)]'
      />
      <div
        className={cn('safari-toolbar', WINDOW_TOOLBAR, 'absolute! inset-x-0 top-0 touch-none pl-24 pr-2')}
        data-window-drag-region
      >
        <span
          className={cn(GLASS_TOOLBAR_GROUP, 'px-1 text-(--label-secondary) max-[700px]:hidden')}
          aria-hidden='true'
        >
          <span className={STATIC_TOOLBAR_ICON}>
            <PanelLeft size={17} strokeWidth={1.8} />
          </span>
        </span>
        <span
          className={cn(GLASS_TOOLBAR_GROUP, 'px-1 text-(--label-tertiary) max-[600px]:hidden')}
          aria-hidden='true'
        >
          <span className={STATIC_TOOLBAR_ICON}>
            <ChevronLeft size={18} strokeWidth={2} />
          </span>
          <span className={STATIC_TOOLBAR_ICON}>
            <ChevronRight size={18} strokeWidth={2} />
          </span>
        </span>
        <div
          className={cn(
            'address-bar',
            GLASS_TOOLBAR_FIELD,
            'relative min-w-0 flex-1 justify-center px-9 text-(--label-primary)',
          )}
        >
          <PanelTop
            size={15}
            strokeWidth={1.8}
            className='absolute left-3 text-(--label-secondary)'
            aria-hidden='true'
          />
          <span className='truncate'>{PROFILE.site}</span>
          <button
            type='button'
            className={cn(TOOLBAR_BUTTON, 'absolute right-0.5 h-8 min-w-8 text-(--label-secondary)')}
            aria-label='Reload page'
            onClick={() => setReloadKey((key) => key + 1)}
          >
            <RotateCw size={14} strokeWidth={2} />
          </button>
        </div>
        <span
          className={cn(GLASS_TOOLBAR_GROUP, 'px-1 text-(--label-secondary) max-[600px]:hidden')}
          aria-hidden='true'
        >
          <span className={STATIC_TOOLBAR_ICON}>
            <Share size={16} strokeWidth={1.9} />
          </span>
          <span className={STATIC_TOOLBAR_ICON}>
            <Plus size={18} strokeWidth={1.9} />
          </span>
          <span className={STATIC_TOOLBAR_ICON}>
            <Grid2X2 size={16} strokeWidth={1.9} />
          </span>
        </span>
      </div>
    </div>
  );
}
