import type { FinderSection } from '@/features/finder/domain/enums/finder-section';

/** Back/forward stack for one Finder window, like a browser session history. */
export type FinderHistory = {
  entries: FinderSection[];
  index: number;
};
