import { ChevronLeft, ChevronRight } from 'lucide-react';

import { AppearanceSettings } from '@/features/settings/components/appearance-settings';
import { SettingsHeading } from '@/features/settings/components/settings-heading';
import { SettingsPanel } from '@/features/settings/components/settings-panel';
import { SettingsSidebar } from '@/features/settings/components/settings-sidebar';
import { SETTINGS_PANEL_COPY } from '@/features/settings/domain/constants/settings-panel-copy';
import { SETTINGS_SECTIONS } from '@/features/settings/domain/constants/settings-sections';
import { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsPanelSectionId } from '@/features/settings/domain/models/settings-panel';
import { useSettingsActions } from '@/features/settings/hooks/use-settings-actions';
import { useSettingsState } from '@/features/settings/hooks/use-settings-state';
import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';
import {
  GLASS_TOOLBAR_GROUP,
  TOOLBAR_BUTTON,
  WINDOW_TOOLBAR,
} from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

const APPEARANCE_DESCRIPTION = 'Choose how windows and controls look across the portfolio.';

type SettingsContentProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
  systemPreferences: SystemPreferences;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
};

export function SettingsContent({
  dark,
  setDark,
  accentColor,
  setAccentColor,
  lowPower,
  setLowPower,
  systemPreferences,
  updateSystemPreferences,
}: SettingsContentProps) {
  const { selectedSection, toggleValues, canGoBack, canGoForward } = useSettingsState();
  const { selectSection, goBack, goForward, toggleLocalSetting } = useSettingsActions();
  const selected =
    SETTINGS_SECTIONS.find((section) => section.id === selectedSection) ?? SETTINGS_SECTIONS[0];
  const selectedPanel = SETTINGS_PANEL_COPY[selectedSection as SettingsPanelSectionId];

  const settingChecked = (id: SettingsControlId) => {
    if (id === SettingsControlId.BATTERY_LOW_POWER) return lowPower;
    if (id === SettingsControlId.DESKTOP_AUTO_HIDE) return systemPreferences.dockAutoHide;
    if (id === SettingsControlId.DESKTOP_RECENTS) return systemPreferences.showRecentApps;
    if (id === SettingsControlId.FOCUS_DO_NOT_DISTURB) return systemPreferences.doNotDisturb;
    return toggleValues[id] ?? false;
  };

  const toggleSetting = (id: SettingsControlId) => {
    if (id === SettingsControlId.BATTERY_LOW_POWER) return setLowPower(!lowPower);
    if (id === SettingsControlId.DESKTOP_AUTO_HIDE)
      return updateSystemPreferences({ dockAutoHide: !systemPreferences.dockAutoHide });
    if (id === SettingsControlId.DESKTOP_RECENTS)
      return updateSystemPreferences({ showRecentApps: !systemPreferences.showRecentApps });
    if (id === SettingsControlId.FOCUS_DO_NOT_DISTURB)
      return updateSystemPreferences({ doNotDisturb: !systemPreferences.doNotDisturb });
    toggleLocalSetting(id);
  };

  return (
    <div className='settings-app h-full flex text-(--label-primary) [background:var(--material-content)]'>
      <SettingsSidebar selectedSection={selectedSection} selectSection={selectSection} />
      <div className='min-w-0 flex-1 flex flex-col'>
        <div
          className={cn(WINDOW_TOOLBAR, 'touch-none gap-3 pl-3 pr-5 max-[600px]:pl-24')}
          data-window-drag-region
        >
          <span className={cn(GLASS_TOOLBAR_GROUP, 'px-0.5')}>
            <button
              type='button'
              className={TOOLBAR_BUTTON}
              aria-label='Back'
              disabled={!canGoBack}
              onClick={goBack}
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type='button'
              className={TOOLBAR_BUTTON}
              aria-label='Forward'
              disabled={!canGoForward}
              onClick={goForward}
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </span>
          <h2 className='m-0 truncate text-[15px] font-bold tracking-[-0.01em]'>{selected.label}</h2>
        </div>
        <main className='min-h-0 flex-1 overflow-auto px-5 pt-1 pb-6'>
          <div className='mx-auto max-w-150'>
            <SettingsHeading
              selected={selected}
              description={
                selectedSection === SettingsSectionId.APPEARANCE
                  ? APPEARANCE_DESCRIPTION
                  : selectedPanel.description
              }
            />
            {selectedSection === SettingsSectionId.APPEARANCE ? (
              <AppearanceSettings
                dark={dark}
                setDark={setDark}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
              />
            ) : (
              <SettingsPanel
                selectedSection={selectedSection}
                selectedPanel={selectedPanel}
                lowPower={lowPower}
                systemPreferences={systemPreferences}
                settingChecked={settingChecked}
                toggleSetting={toggleSetting}
                updateSystemPreferences={updateSystemPreferences}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
