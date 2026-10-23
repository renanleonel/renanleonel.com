import { AppWindow, Contrast, Laptop, Sun } from 'lucide-react';

import { SystemGauge } from '@/features/desktop/components/system-gauge';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';
import { GLASS_WIDGET } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type SystemStatusWidgetProps = {
  windows: WindowState[];
  dark: boolean;
  lowPower: boolean;
  brightness: number;
  openSettings: () => void;
};

/**
 * Live system state drawn as Apple's medium Batteries widget: a row of rings
 * with a glyph inside and the reading below. The whole widget opens Settings.
 */
export function SystemStatusWidget({
  windows,
  dark,
  lowPower,
  brightness,
  openSettings,
}: SystemStatusWidgetProps) {
  const visibleWindows = windows.filter((window) => !window.minimized).length;
  return (
    <section className={cn(GLASS_WIDGET, 'col-span-full')} aria-label='Live system status'>
      <button
        type='button'
        className='size-full grid grid-cols-4 items-center border-0 bg-transparent px-3 text-(--label-primary) cursor-default'
        title='Open Settings'
        onClick={openSettings}
      >
        <SystemGauge
          icon={<Laptop size={22} strokeWidth={1.75} />}
          label='Battery'
          value={lowPower ? 'Low Power' : '84%'}
          fraction={0.84}
          color={lowPower ? 'var(--low-power-yellow)' : 'oklch(0.72 0.19 145)'}
        />
        <SystemGauge
          icon={<Sun size={22} strokeWidth={1.75} />}
          label='Display brightness'
          value={`${brightness}%`}
          fraction={brightness / 100}
          color='var(--system-blue)'
        />
        <SystemGauge
          icon={<Contrast size={22} strokeWidth={1.75} />}
          label='Appearance'
          value={dark ? 'Dark' : 'Light'}
          fraction={1}
          color='var(--system-blue)'
        />
        <SystemGauge
          icon={<AppWindow size={22} strokeWidth={1.75} />}
          label='Windows'
          value={`${visibleWindows} Open`}
          fraction={windows.length === 0 ? 0 : visibleWindows / windows.length}
          color='var(--system-blue)'
        />
      </button>
    </section>
  );
}
