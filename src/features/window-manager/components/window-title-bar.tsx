import { WindowControls } from '@/features/window-manager/components/window-controls';

type WindowTitleBarProps = {
  title: string;
  maximized: boolean;
  close: () => void;
  minimize: () => void;
  toggleMaximize: () => void;
};

export function WindowTitleBar({
  title,
  maximized,
  close,
  minimize,
  toggleMaximize,
}: WindowTitleBarProps) {
  return (
    <div
      className='window-titlebar [&.window-titlebar]:relative [&.window-titlebar]:h-8 [&.window-titlebar]:flex-[0_0_32px] [&.window-titlebar]:grid [&.window-titlebar]:grid-cols-[1fr_auto_1fr] [&.window-titlebar]:items-center [&.window-titlebar]:px-3 [&.window-titlebar]:text-(--window-frame-text) [&.window-titlebar]:[background:var(--material-titlebar)] [&.window-titlebar]:[border-bottom:1px_solid_var(--separator)] [&.window-titlebar]:cursor-default [&.window-titlebar]:touch-none [&.window-titlebar_>_strong]:text-[13px] [&.window-titlebar_>_strong]:font-[650] [&.window-titlebar_>_strong]:tracking-[-0.006em] [&.window-titlebar_>_strong]:truncate'
      data-window-drag-region
    >
      <WindowControls
        title={title}
        maximized={maximized}
        close={close}
        minimize={minimize}
        toggleMaximize={toggleMaximize}
      />
      <strong>{title}</strong>
      <span />
    </div>
  );
}
