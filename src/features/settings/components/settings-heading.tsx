import { SettingsAppIcon } from '@/features/settings/components/settings-app-icon';
import { SETTINGS_GROUP } from '@/features/settings/domain/constants/settings-form';
import type { SettingsSection } from '@/features/settings/domain/models/settings-section';
import { cn } from '@/shared/utils/cn';

type SettingsHeadingProps = {
  selected: SettingsSection;
  description: string;
};

/** The centred hero that opens a pane: large icon, title, one-line summary. */
export function SettingsHeading({ selected, description }: SettingsHeadingProps) {
  return (
    <header className={cn(SETTINGS_GROUP, 'flex flex-col items-center px-6 pt-5 pb-4 text-center')}>
      <SettingsAppIcon section={selected} size={64} />
      <h1 className='mt-2.5 text-[20px] leading-6 font-bold tracking-[-0.01em]'>{selected.label}</h1>
      <p className='mt-1 max-w-[46ch] text-[13px] leading-4.5 text-(--label-secondary)'>
        {description}
      </p>
    </header>
  );
}
