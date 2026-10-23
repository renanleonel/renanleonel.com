import type { ReactNode } from 'react';
import { CONTROL_TOGGLE } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type ControlCenterToggleProps = {
  icon: ReactNode;
  title: string;
  status: string;
  on: boolean;
  onToggle: () => void;
  className?: string;
};

/** A round Control Center toggle with its title and current status. */
export function ControlCenterToggle({
  icon,
  title,
  status,
  on,
  onToggle,
  className,
}: ControlCenterToggleProps) {
  return (
    <button
      type='button'
      className={cn(
        'group min-w-0 flex items-center gap-2.25 border-0 bg-transparent p-0 text-left text-(--label-primary)',
        className,
      )}
      aria-pressed={on}
      onClick={onToggle}
    >
      <span className={CONTROL_TOGGLE}>{icon}</span>
      <span className='min-w-0 flex flex-col'>
        <strong className='truncate text-[13px] leading-4 font-semibold'>{title}</strong>
        <small className='truncate text-[11px] leading-3.5 text-(--label-secondary)'>{status}</small>
      </span>
    </button>
  );
}
