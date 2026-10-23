import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import {
  readFinderPreferences,
  writeFinderPreferences,
} from '@/features/finder/adapters/finder-preferences-storage';
import {
  FinderActionsContext,
  type FinderActions,
} from '@/features/finder/contexts/finder-actions-context';
import { FinderStateContext } from '@/features/finder/contexts/finder-state-context';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import type { FinderHistory } from '@/features/finder/domain/models/finder-history';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import type { FinderState } from '@/features/finder/domain/models/finder-state';
import {
  stepFinderHistory,
  visitFinderSection,
} from '@/features/finder/domain/reducers/navigate-finder-history';

type FinderProviderProps = {
  children: ReactNode;
};

export function FinderProvider({ children }: FinderProviderProps) {
  const [preferences, setPreferences] = useState<FinderPreferences>(readFinderPreferences);
  const preferencesRef = useRef(preferences);
  const [history, setHistory] = useState<FinderHistory>({
    entries: [FinderSection.PORTFOLIO],
    index: 0,
  });
  const section = history.entries[history.index];

  useLayoutEffect(() => {
    preferencesRef.current = preferences;
  }, [preferences]);

  const updatePreferences = (patch: Partial<FinderPreferences>) => {
    const next = { ...preferencesRef.current, ...patch };
    setPreferences(next);
    writeFinderPreferences(next);
  };

  const state: FinderState = {
    preferences,
    section,
    canGoBack: history.index > 0,
    canGoForward: history.index < history.entries.length - 1,
  };
  const actions: FinderActions = {
    setSection: (next) => setHistory((current) => visitFinderSection(current, next)),
    goBack: () => setHistory((current) => stepFinderHistory(current, -1)),
    goForward: () => setHistory((current) => stepFinderHistory(current, 1)),
    updatePreferences,
  };

  return (
    <FinderActionsContext value={actions}>
      <FinderStateContext value={state}>{children}</FinderStateContext>
    </FinderActionsContext>
  );
}
