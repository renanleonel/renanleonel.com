import { ACCENT_COLORS } from '@/features/desktop/domain/constants/accent-colors';
import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import { SETTINGS_GROUP, SETTINGS_ROW } from '@/features/settings/domain/constants/settings-form';
import { MENU_SWITCH } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type AppearanceSettingsProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
};

/** A miniature desktop: wallpaper with a window and its title strip. */
const APPEARANCE_PREVIEW =
  'relative block h-11.5 w-17 overflow-hidden rounded-[7px] [box-shadow:inset_0_0_0_0.5px_oklch(0_0_0/0.18)] before:absolute before:top-2 before:left-2.5 before:h-7 before:w-11 before:rounded-[4px] before:content-[""] after:absolute after:top-2 after:left-2.5 after:h-2 after:w-11 after:rounded-t-[4px] after:content-[""]';

/**
 * The Appearance pane as macOS lays it out: theme thumbnails, the accent colour
 * row of swatches, and window tinting, each a row of one grouped form.
 */
export function AppearanceSettings({
  dark,
  setDark,
  accentColor,
  setAccentColor,
}: AppearanceSettingsProps) {
  const themes = [
    {
      label: 'Light',
      selected: !dark,
      select: () => setDark(false),
      preview:
        '[background:linear-gradient(160deg,oklch(0.72_0.11_230),oklch(0.55_0.13_250))] before:bg-[oklch(0.98_0_0)] after:bg-[oklch(0.92_0.004_250)]',
    },
    {
      label: 'Dark',
      selected: dark,
      select: () => setDark(true),
      preview:
        '[background:linear-gradient(160deg,oklch(0.32_0.08_255),oklch(0.18_0.05_260))] before:bg-[oklch(0.26_0.005_250)] after:bg-[oklch(0.34_0.005_250)]',
    },
  ];
  const accents = Object.entries(ACCENT_COLORS) as [
    AccentColorId,
    (typeof ACCENT_COLORS)[AccentColorId],
  ][];

  return (
    <section className={SETTINGS_GROUP} key='appearance-settings'>
      <div className={cn(SETTINGS_ROW, 'py-3')}>
        <span>Appearance</span>
        <span className='flex gap-4' role='radiogroup' aria-label='Appearance'>
          {themes.map((theme) => (
            <button
              type='button'
              role='radio'
              aria-checked={theme.selected}
              className='flex flex-col items-center gap-1.5 border-0 bg-transparent p-0 text-[11px] text-(--label-primary)'
              key={theme.label}
              onClick={theme.select}
            >
              <span
                className={cn(
                  'rounded-[9px] p-0.5',
                  theme.selected
                    ? '[box-shadow:0_0_0_3px_var(--system-blue)]'
                    : '[box-shadow:0_0_0_3px_transparent]',
                )}
              >
                <span className={cn(APPEARANCE_PREVIEW, theme.preview)} />
              </span>
              <span className={cn(theme.selected && 'font-semibold')}>{theme.label}</span>
            </button>
          ))}
        </span>
      </div>
      <div className={SETTINGS_ROW}>
        <span>Accent color</span>
        <span className='flex flex-col items-end gap-1'>
          <span className='flex gap-2' role='radiogroup' aria-label='Accent color'>
            {accents.map(([id, accent]) => (
              <button
                type='button'
                role='radio'
                aria-checked={accentColor === id}
                aria-label={accent.label}
                className='grid size-4 place-items-center rounded-full border-0 p-0 [box-shadow:inset_0_0_0_0.5px_oklch(0_0_0/0.18)]'
                style={{ background: accent.color }}
                key={id}
                onClick={() => setAccentColor(id)}
              >
                {accentColor === id ? <span className='size-1.5 rounded-full bg-white' /> : null}
              </button>
            ))}
          </span>
          <small>{ACCENT_COLORS[accentColor].label}</small>
        </span>
      </div>
      <label className={SETTINGS_ROW}>
        <span>
          Allow wallpaper tinting in windows
          <small>Windows adapt to the desktop behind them.</small>
        </span>
        <input className={MENU_SWITCH} type='checkbox' role='switch' defaultChecked />
      </label>
    </section>
  );
}
