import { GLASS_MENU } from '@/shared/domain/constants/liquid-glass';

export const FINDER_TOOLBAR_POPOVER_CLASSES = [
  GLASS_MENU,
  '[&.finder-toolbar-popover]:absolute [&.finder-toolbar-popover]:z-60 [&.finder-toolbar-popover]:top-10.5 [&.finder-toolbar-popover]:right-0 [&.finder-toolbar-popover]:w-50 [&.finder-toolbar-popover]:p-1.5 [&.finder-toolbar-popover]:text-[13px] [&.finder-toolbar-popover]:text-(--label-primary) [&.finder-toolbar-popover]:origin-top-right [&.finder-toolbar-popover]:animate-[menu-in_160ms_var(--ease-mac)]',
  '[&.finder-toolbar-popover_>_strong]:block [&.finder-toolbar-popover_>_strong]:p-[6px_8px_7px] [&.finder-toolbar-popover_>_strong]:text-[12px]',
  '[&.finder-toolbar-popover_button]:w-full [&.finder-toolbar-popover_button]:min-h-7 [&.finder-toolbar-popover_button]:flex [&.finder-toolbar-popover_button]:items-center [&.finder-toolbar-popover_button]:gap-2 [&.finder-toolbar-popover_button]:p-[4px_8px] [&.finder-toolbar-popover_button]:[border:0] [&.finder-toolbar-popover_button]:rounded-[8px] [&.finder-toolbar-popover_button]:[background:transparent] [&.finder-toolbar-popover_button]:text-left',
  '[&.finder-toolbar-popover_button:hover]:text-[white] [&.finder-toolbar-popover_button:hover]:[background:var(--system-blue)]',
  '[&.finder-toolbar-popover_button_>_span]:min-w-0 [&.finder-toolbar-popover_button_>_span]:flex [&.finder-toolbar-popover_button_>_span]:items-center [&.finder-toolbar-popover_button_>_span]:gap-1.5',
  '[&.finder-toolbar-popover_button_>_span_svg]:w-3.25',
  '[&.finder-toolbar-popover_hr]:m-[4px_7px] [&.finder-toolbar-popover_hr]:[border:0] [&.finder-toolbar-popover_hr]:[border-top:1px_solid_var(--separator)]',
  '[&.finder-toolbar-popover_>_small]:min-h-4.25 [&.finder-toolbar-popover_>_small]:block [&.finder-toolbar-popover_>_small]:p-[3px_8px_1px] [&.finder-toolbar-popover_>_small]:text-(--muted) [&.finder-toolbar-popover_>_small]:text-[10px]',
  '[@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar-popover]:[background:var(--material-menu)]',
] as const;
