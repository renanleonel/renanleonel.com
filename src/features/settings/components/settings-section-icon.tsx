import {
  BatteryFull,
  Bell,
  Bluetooth,
  Contrast,
  Globe,
  Moon,
  PanelBottom,
  Settings,
  Volume2,
  Wifi,
  type LucideIcon,
} from 'lucide-react';

import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

const SETTINGS_SECTION_ICONS: Record<SettingsSectionId, LucideIcon> = {
  [SettingsSectionId.WIFI]: Wifi,
  [SettingsSectionId.BLUETOOTH]: Bluetooth,
  [SettingsSectionId.NETWORK]: Globe,
  [SettingsSectionId.NOTIFICATIONS]: Bell,
  [SettingsSectionId.SOUND]: Volume2,
  [SettingsSectionId.BATTERY]: BatteryFull,
  [SettingsSectionId.FOCUS]: Moon,
  [SettingsSectionId.GENERAL]: Settings,
  [SettingsSectionId.APPEARANCE]: Contrast,
  [SettingsSectionId.DESKTOP]: PanelBottom,
};

type SettingsSectionIconProps = {
  sectionId: SettingsSectionId;
  size: number;
  strokeWidth: number;
};

export function SettingsSectionIcon({ sectionId, size, strokeWidth }: SettingsSectionIconProps) {
  const Icon = SETTINGS_SECTION_ICONS[sectionId];
  return <Icon size={size} strokeWidth={strokeWidth} />;
}
