import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import { cn } from '@/shared/utils/cn';

type FinderStatusBarProps = {
  itemCount: number;
  preferences: FinderPreferences;
  canResizeIcons: boolean;
  onUpdatePreferences: (patch: Partial<FinderPreferences>) => void;
};

export function FinderStatusBar({
  itemCount,
  preferences,
  canResizeIcons,
  onUpdatePreferences,
}: FinderStatusBarProps) {
  return (
    <div
      className={cn(
        'finder-status',
        '[&.finder-status]:h-7 [&.finder-status]:flex-none [&.finder-status]:grid [&.finder-status]:grid-cols-[1fr_auto_1fr] [&.finder-status]:items-center [&.finder-status]:gap-3 [&.finder-status]:px-3.5 [&.finder-status]:text-(--label-secondary) [&.finder-status]:text-[11px] [&.finder-status]:[font-variant-numeric:tabular-nums]',
        '[&.finder-status_>_span]:col-start-2',
        '[&.finder-status_label]:justify-self-end max-[700px]:[&.finder-status_label]:hidden',
        '[&.finder-status_label]:flex [&.finder-status_label]:items-center [&.finder-status_label]:gap-1.75 [&.finder-status_label]:whitespace-nowrap',
        '[&.finder-status_label.is-disabled]:opacity-[0.48]',
        '[&.finder-status_input]:w-22 [&.finder-status_input]:accent-(--system-blue)',
        '[&.finder-status_output]:w-7.25 [&.finder-status_output]:[font-variant-numeric:tabular-nums] [&.finder-status_output]:text-right',
      )}
    >
      <span>
        {itemCount} {itemCount === 1 ? 'item' : 'items'}, 214.3 GB available
      </span>
      <label className={cn(canResizeIcons ? '' : 'is-disabled')}>
        Icon size{' '}
        <input
          aria-label='Icon size'
          aria-valuetext={`${preferences.iconSize} pixels`}
          type='range'
          min='40'
          max='88'
          step='4'
          value={preferences.iconSize}
          disabled={!canResizeIcons}
          onChange={(event) => onUpdatePreferences({ iconSize: Number(event.target.value) })}
        />
        <output>{preferences.iconSize}px</output>
      </label>
    </div>
  );
}
