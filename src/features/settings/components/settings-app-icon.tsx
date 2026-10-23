import type { CSSProperties } from 'react';

import { SettingsSectionIcon } from '@/features/settings/components/settings-section-icon';
import type { SettingsSection } from '@/features/settings/domain/models/settings-section';
import { cn } from '@/shared/utils/cn';

type SettingsAppIconProps = {
  section: SettingsSection;
  /** Edge length in px; the corner radius and glyph scale with it. */
  size: 20 | 64;
};

/** A pane icon: a white glyph on the pane's colour, lit from the top. */
export function SettingsAppIcon({ section, size }: SettingsAppIconProps) {
  return (
    <span
      className={cn(
        'grid flex-none place-items-center text-white [background:linear-gradient(180deg,color-mix(in_oklch,var(--settings-icon-tint)_80%,white),var(--settings-icon-tint))]',
        size === 20
          ? 'size-5 rounded-[5px] [box-shadow:inset_0_0_0_0.5px_oklch(0_0_0/0.12)]'
          : 'size-16 rounded-[15px] [box-shadow:inset_0_0_0_0.5px_oklch(0_0_0/0.12),0_2px_6px_oklch(0.15_0.02_250/0.18)]',
      )}
      style={{ '--settings-icon-tint': section.tint } as CSSProperties}
      aria-hidden='true'
    >
      <SettingsSectionIcon
        sectionId={section.id}
        size={size === 20 ? 13 : 38}
        strokeWidth={size === 20 ? 2.2 : 1.8}
      />
    </span>
  );
}
