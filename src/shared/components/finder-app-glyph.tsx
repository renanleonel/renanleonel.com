import { useId } from 'react';

/**
 * Finder: the two-tone face. It fills the whole tile, so the profile line —
 * brow, nose, lips — is the split between the deep-blue and sky-blue halves.
 */
export function FinderAppGlyph() {
  const id = useId();
  return (
    <svg className='absolute inset-0 size-full' viewBox='0 0 64 64' aria-hidden='true'>
      <defs>
        <linearGradient id={`${id}-dark`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#2fa3ff' />
          <stop offset='1' stopColor='#0a5fe0' />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#f4fbff' />
          <stop offset='1' stopColor='#b9e2ff' />
        </linearGradient>
      </defs>
      <rect width='64' height='64' fill={`url(#${id}-light)`} />
      <path
        d='M0 0h35.5c-1.6 8.6-3.7 17-5.6 30.6h5.4c-.7 11.3-.2 22.1 1.6 33.4H0z'
        fill={`url(#${id}-dark)`}
      />
      <g fill='none' stroke='#0d2440' strokeLinecap='round'>
        <path d='M19.5 20.5v7.5M45.5 20.5v7.5' strokeWidth='3.6' />
        <path d='M15.5 41.5c9.4 7.4 23.6 7.4 33 0' strokeWidth='2.8' />
      </g>
    </svg>
  );
}
