import type { CSSProperties, ReactNode } from 'react';
import { GLASS_MODULE } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type ControlCenterSliderProps = {
  icon: ReactNode;
  label: string;
  ariaLabel: string;
  min: number;
  value: number;
  onChange: (value: number) => void;
};

/**
 * A Control Center slider module: a capsule whose white fill is the value, with
 * the icon riding at its leading end and a knob closing the fill. The range
 * thumb is as wide as the knob, so the pointer maps exactly onto it.
 */
export function ControlCenterSlider({
  icon,
  label,
  ariaLabel,
  min,
  value,
  onChange,
}: ControlCenterSliderProps) {
  const fraction = (value - min) / (100 - min);
  return (
    <label className={cn(GLASS_MODULE, 'col-span-2 block px-3 pt-2.25 pb-3')}>
      <strong className='mb-2 block text-[13px] leading-4 font-semibold'>{label}</strong>
      <span
        className={cn(
          'relative block h-5.5 rounded-full [background:oklch(0.2_0.01_250/0.12)]',
          '[.desktop--dark_&]:[background:oklch(1_0_0/0.14)]',
        )}
        style={{ '--fraction': fraction } as CSSProperties}
      >
        <span
          aria-hidden='true'
          className='absolute inset-y-0 left-0 w-[calc(22px+(100%-22px)*var(--fraction))] rounded-full bg-white'
        />
        <span
          aria-hidden='true'
          className='absolute top-0 left-[calc((100%-22px)*var(--fraction))] size-5.5 rounded-full bg-white [box-shadow:0_0_0_0.5px_oklch(0_0_0/0.12),0_1px_3px_oklch(0_0_0/0.22)]'
        />
        <span
          aria-hidden='true'
          className='absolute top-1 left-1 grid size-3.5 place-items-center text-[oklch(0.46_0.01_250)]'
        >
          {icon}
        </span>
        <input
          className={cn(
            'absolute inset-0 m-0 size-full appearance-none rounded-full bg-transparent cursor-default',
            '[&::-webkit-slider-thumb]:h-5.5 [&::-webkit-slider-thumb]:w-5.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent',
            '[&::-moz-range-thumb]:h-5.5 [&::-moz-range-thumb]:w-5.5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent',
          )}
          aria-label={ariaLabel}
          type='range'
          min={min}
          max={100}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </span>
    </label>
  );
}
