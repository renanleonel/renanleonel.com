import type { FinderSection } from '@/features/finder/domain/enums/finder-section';
import type { FinderHistory } from '@/features/finder/domain/models/finder-history';

/** Visiting a section drops any forward entries, as navigation does in Finder. */
export function visitFinderSection(history: FinderHistory, section: FinderSection): FinderHistory {
  if (history.entries[history.index] === section) return history;
  const entries = [...history.entries.slice(0, history.index + 1), section];
  return { entries, index: entries.length - 1 };
}

export function stepFinderHistory(history: FinderHistory, delta: -1 | 1): FinderHistory {
  const index = history.index + delta;
  if (index < 0 || index >= history.entries.length) return history;
  return { ...history, index };
}
