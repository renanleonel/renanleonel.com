import { useState, type ReactNode } from 'react';

import {
  SettingsActionsContext,
  type SettingsActionsContextValue,
} from '@/features/settings/contexts/settings-actions-context';
import {
  SettingsStateContext,
  type SettingsStateContextValue,
} from '@/features/settings/contexts/settings-state-context';
import { SETTINGS_PANEL_COPY } from '@/features/settings/domain/constants/settings-panel-copy';
import type { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

type SettingsProviderProps = {
  children: ReactNode;
  selectedSection: SettingsSectionId;
  setSelectedSection: (section: SettingsSectionId) => void;
};

function createInitialToggleValues(): Record<SettingsControlId, boolean> {
  return Object.fromEntries(
    Object.values(SETTINGS_PANEL_COPY).flatMap((panel) =>
      panel.controls.map((control) => [control.id, control.defaultChecked]),
    ),
  ) as Record<SettingsControlId, boolean>;
}

export function SettingsProvider({
  children,
  selectedSection,
  setSelectedSection,
}: SettingsProviderProps) {
  const [toggleValues, setToggleValues] = useState(createInitialToggleValues);
  // Back/forward history of panes chosen inside the window, like the toolbar
  // arrows in System Settings.
  const [history, setHistory] = useState({ entries: [selectedSection], index: 0 });

  const selectSection = (section: SettingsSectionId) => {
    if (section === selectedSection) return;
    setSelectedSection(section);
    setHistory(({ entries, index }) => ({
      entries: [...entries.slice(0, index + 1), section],
      index: index + 1,
    }));
  };
  const stepHistory = (offset: -1 | 1) => {
    const index = history.index + offset;
    const section = history.entries[index];
    if (!section) return;
    setSelectedSection(section);
    setHistory({ entries: history.entries, index });
  };
  const toggleLocalSetting = (controlId: SettingsControlId) => {
    setToggleValues((current) => ({
      ...current,
      [controlId]: !current[controlId],
    }));
  };

  const state: SettingsStateContextValue = {
    selectedSection,
    toggleValues,
    canGoBack: history.index > 0,
    canGoForward: history.index < history.entries.length - 1,
  };
  const actions: SettingsActionsContextValue = {
    selectSection,
    goBack: () => stepHistory(-1),
    goForward: () => stepHistory(1),
    toggleLocalSetting,
  };

  return (
    <SettingsActionsContext value={actions}>
      <SettingsStateContext value={state}>{children}</SettingsStateContext>
    </SettingsActionsContext>
  );
}
