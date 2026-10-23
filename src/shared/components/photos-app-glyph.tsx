const PETALS = [
  { angle: 0, fill: '#ffb21d' },
  { angle: 45, fill: '#f6e13a' },
  { angle: 90, fill: '#9bd94a' },
  { angle: 135, fill: '#35c6a8' },
  { angle: 180, fill: '#3d9df5' },
  { angle: 225, fill: '#8b6cf0' },
  { angle: 270, fill: '#e65ab4' },
  { angle: 315, fill: '#ff5a48' },
];

/** Photos: the eight translucent petals of Apple's pinwheel flower. */
export function PhotosAppGlyph() {
  return (
    <svg className='size-[84%]' viewBox='0 0 48 48' aria-hidden='true'>
      <g style={{ mixBlendMode: 'multiply' }}>
        {PETALS.map((petal) => (
          <rect
            key={petal.angle}
            x='19.2'
            y='4.5'
            width='9.6'
            height='19.5'
            rx='4.8'
            fill={petal.fill}
            fillOpacity='0.88'
            transform={`rotate(${petal.angle} 24 24)`}
          />
        ))}
      </g>
    </svg>
  );
}
