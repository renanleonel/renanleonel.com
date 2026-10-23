import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsSection } from '@/features/settings/domain/models/settings-section';

/** Labels and icon tints, using the colours of the matching macOS panes. */
export const SETTINGS_SECTIONS: SettingsSection[] = [
  { id: SettingsSectionId.WIFI, label: 'Wi-Fi', tint: '#0a84ff' },
  { id: SettingsSectionId.BLUETOOTH, label: 'Bluetooth', tint: '#0a7aff' },
  { id: SettingsSectionId.NETWORK, label: 'Network', tint: '#0a84ff' },
  { id: SettingsSectionId.BATTERY, label: 'Battery', tint: '#30c158' },
  { id: SettingsSectionId.GENERAL, label: 'General', tint: '#8e8e93' },
  { id: SettingsSectionId.APPEARANCE, label: 'Appearance', tint: '#3a3a3c' },
  { id: SettingsSectionId.DESKTOP, label: 'Desktop & Dock', tint: '#3a3a3c' },
  { id: SettingsSectionId.NOTIFICATIONS, label: 'Notifications', tint: '#ff3b30' },
  { id: SettingsSectionId.SOUND, label: 'Sound', tint: '#ff2d55' },
  { id: SettingsSectionId.FOCUS, label: 'Focus', tint: '#5e5ce6' },
];

/** Sidebar groups in macOS order: connectivity, system, then attention. */
export const SETTINGS_SIDEBAR_GROUPS: SettingsSectionId[][] = [
  [
    SettingsSectionId.WIFI,
    SettingsSectionId.BLUETOOTH,
    SettingsSectionId.NETWORK,
    SettingsSectionId.BATTERY,
  ],
  [SettingsSectionId.GENERAL, SettingsSectionId.APPEARANCE, SettingsSectionId.DESKTOP],
  [SettingsSectionId.NOTIFICATIONS, SettingsSectionId.SOUND, SettingsSectionId.FOCUS],
];
