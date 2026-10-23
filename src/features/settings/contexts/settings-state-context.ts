import { createContext } from 'react';

import type { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

export type SettingsStateContextValue = {
  selectedSection: SettingsSectionId;
  toggleValues: Readonly<Record<SettingsControlId, boolean>>;
  canGoBack: boolean;
  canGoForward: boolean;
};

export const SettingsStateContext = createContext<SettingsStateContextValue | undefined>(undefined);
