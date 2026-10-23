import type { ReactNode } from 'react';

type SystemGaugeProps = {
  icon: ReactNode;
  label: string;
  value: string;
  /** 0–1 share of the ring that is filled. */
  fraction: number;
  /** Any CSS colour for the filled arc. */
  color: string;
};

/** One ring of the Batteries-style status widget: icon inside, value below. */
export function SystemGauge({ icon, label, value, fraction, color }: SystemGaugeProps) {
  return (
    <span className='flex flex-col items-center gap-2'>
      <span className='relative grid size-16 place-items-center'>
        <svg className='absolute inset-0 -rotate-90' viewBox='0 0 64 64' aria-hidden='true'>
          <circle
            className='stroke-[oklch(0.2_0.01_250/0.1)] [.desktop--dark_&]:stroke-[oklch(1_0_0/0.14)]'
            cx='32'
            cy='32'
            r='28'
            fill='none'
            strokeWidth='5.5'
          />
          <circle
            className='[transition:stroke-dasharray_300ms_var(--ease-mac)]'
            cx='32'
            cy='32'
            r='28'
            fill='none'
            stroke={color}
            strokeWidth='5.5'
            strokeLinecap='round'
            pathLength={100}
            strokeDasharray={`${Math.max(0, Math.min(1, fraction)) * 100} 100`}
          />
        </svg>
        <span aria-hidden='true' className='grid place-items-center text-(--label-primary)'>
          {icon}
        </span>
      </span>
      <span className='text-[13px] leading-4 font-medium tabular-nums'>
        <span className='sr-only'>{label}: </span>
        {value}
      </span>
    </span>
  );
}
