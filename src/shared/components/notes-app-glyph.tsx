/**
 * Notes: a sheet of paper with the yellow header band and faint ruled lines.
 * It fills the whole tile; the tile background supplies the paper white.
 */
export function NotesAppGlyph() {
  return (
    <svg className='absolute inset-0 size-full' viewBox='0 0 48 48' aria-hidden='true'>
      <rect width='48' height='14.5' fill='#ffcc2f' />
      <rect y='14.5' width='48' height='0.8' fill='#c99700' fillOpacity='0.35' />
      <path
        d='M7 23.5h34M7 30.5h34M7 37.5h34'
        fill='none'
        stroke='#a7a7ad'
        strokeWidth='0.9'
        strokeDasharray='1.4 1.6'
      />
    </svg>
  );
}
