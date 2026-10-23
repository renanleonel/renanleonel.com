import { useId } from 'react';

const TICKS = Array.from({ length: 36 }, (_, index) => index * 10);

/** Safari: a blue compass dial with a red-and-white needle pointing north-east. */
export function SafariAppGlyph() {
  const id = useId();
  return (
    <svg className='size-[84%]' viewBox='0 0 48 48' aria-hidden='true'>
      <defs>
        <linearGradient id={`${id}-dial`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#1ec8ff' />
          <stop offset='1' stopColor='#1a5fe6' />
        </linearGradient>
      </defs>
      <circle cx='24' cy='24' r='21' fill={`url(#${id}-dial)`} />
      <g stroke='white' strokeOpacity='0.85' strokeLinecap='round'>
        {TICKS.map((angle) => (
          <line
            key={angle}
            x1='24'
            y1={angle % 30 === 0 ? 5.6 : 6.4}
            x2='24'
            y2='8.6'
            strokeWidth={angle % 30 === 0 ? 1.1 : 0.6}
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
      </g>
      <g transform='rotate(45 24 24)'>
        <path d='M24 9.5 27.4 24h-6.8z' fill='#ff3b30' />
        <path d='M24 38.5 20.6 24h6.8z' fill='white' />
      </g>
    </svg>
  );
}
