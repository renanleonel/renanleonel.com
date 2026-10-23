import type { CSSProperties } from 'react';

import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';
import { SETTINGS_GROUP, SETTINGS_ROW } from '@/features/settings/domain/constants/settings-form';
import type { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsPanel as SettingsPanelModel } from '@/features/settings/domain/models/settings-panel';
import { MENU_SWITCH, SYSTEM_SLIDER } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type SettingsPanelProps = {
  selectedSection: SettingsSectionId;
  selectedPanel: SettingsPanelModel;
  lowPower: boolean;
  systemPreferences: SystemPreferences;
  settingChecked: (id: SettingsControlId) => boolean;
  toggleSetting: (id: SettingsControlId) => void;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
};

const BATTERY_LEVEL = 84;

export function SettingsPanel({
  selectedSection,
  selectedPanel,
  lowPower,
  systemPreferences,
  settingChecked,
  toggleSetting,
  updateSystemPreferences,
}: SettingsPanelProps) {
  const slider =
    selectedSection === SettingsSectionId.SOUND
      ? {
          label: 'Output volume',
          min: 0,
          max: 100,
          value: systemPreferences.volume,
          update: (value: number) => updateSystemPreferences({ volume: value }),
        }
      : selectedSection === SettingsSectionId.DESKTOP
        ? {
            label: 'Size',
            min: 36,
            max: 64,
            value: systemPreferences.dockSize,
            update: (value: number) => updateSystemPreferences({ dockSize: value }),
          }
        : null;

  return (
    <>
      {selectedSection === SettingsSectionId.BATTERY ? (
        <section className={SETTINGS_GROUP} aria-label='Battery status'>
          <div className={SETTINGS_ROW}>
            <span>
              Battery Level
              <small>{lowPower ? 'Low Power Mode is on' : 'Power Adapter'}</small>
            </span>
            <span className='flex items-center gap-2 tabular-nums'>
              <span className='h-2.5 w-24 overflow-hidden rounded-full [background:oklch(0.2_0.01_250/0.12)] [.desktop--dark_&]:[background:oklch(1_0_0/0.14)]'>
                <span
                  className={cn(
                    'block h-full rounded-full',
                    lowPower ? 'bg-(--low-power-yellow)' : 'bg-[oklch(0.72_0.19_145)]',
                  )}
                  style={{ width: `${BATTERY_LEVEL}%` }}
                />
              </span>
              {BATTERY_LEVEL}%
            </span>
          </div>
        </section>
      ) : null}
      <section className={SETTINGS_GROUP} key={`${selectedSection}-settings`}>
        {selectedPanel.controls.map((control) => (
          <label className={SETTINGS_ROW} key={control.id}>
            <span className='min-w-0'>
              {control.title}
              <small>{control.detail}</small>
            </span>
            <input
              className={MENU_SWITCH}
              type='checkbox'
              role='switch'
              checked={settingChecked(control.id)}
              onChange={() => toggleSetting(control.id)}
            />
          </label>
        ))}
        {slider ? (
          <label className={SETTINGS_ROW}>
            <span>{slider.label}</span>
            <input
              className={cn(SYSTEM_SLIDER, 'w-[min(220px,50%)]')}
              style={
                {
                  '--fill': `${((slider.value - slider.min) / (slider.max - slider.min)) * 100}%`,
                } as CSSProperties
              }
              aria-label={slider.label}
              type='range'
              min={slider.min}
              max={slider.max}
              value={slider.value}
              onChange={(event) => slider.update(Number(event.target.value))}
            />
          </label>
        ) : null}
      </section>
    </>
  );
}
