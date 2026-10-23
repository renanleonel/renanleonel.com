import { cn } from '@/shared/utils/cn';

/**
 * A grouped form box, as System Settings draws its panes: a quiet rounded slab
 * with a hairline edge. Rows inside separate with inset hairlines.
 */
export const SETTINGS_GROUP = cn(
  'mb-5 overflow-hidden rounded-[12px] [background:oklch(0.2_0.01_250/0.03)] [box-shadow:inset_0_0_0_0.5px_oklch(0.2_0.01_250/0.1)]',
  '[.desktop--dark_&]:[background:oklch(1_0_0/0.05)] [.desktop--dark_&]:[box-shadow:inset_0_0_0_0.5px_oklch(1_0_0/0.1)]',
);

/**
 * One row of a group: label on the left, control on the right. The separator
 * is inset 12px from the leading edge and omitted on the last row.
 */
export const SETTINGS_ROW = cn(
  'relative min-h-10 w-full flex items-center justify-between gap-4 px-3 py-2 text-left text-[13px] text-(--label-primary)',
  "after:absolute after:inset-x-3 after:bottom-0 after:h-px after:scale-y-50 after:bg-(--separator) after:content-[''] last:after:hidden",
  '[&_small]:block [&_small]:text-[11px] [&_small]:leading-3.5 [&_small]:text-(--label-secondary)',
);
