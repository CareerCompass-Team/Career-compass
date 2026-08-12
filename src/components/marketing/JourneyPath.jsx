const STOPS = [
  { label: 'Discover', y: 40 },
  { label: 'Apply', y: 190 },
  { label: 'Interview', y: 340 },
  { label: 'Offer', y: 490 },
]

export default function JourneyPath() {
  const pathD = STOPS.map((s, i) => {
    const x = i % 2 === 0 ? 70 : 170
    const prevX = i % 2 === 0 ? 170 : 70
    return i === 0 ? `M ${x} ${s.y}` : `Q ${prevX} ${(s.y + STOPS[i - 1].y) / 2} ${x} ${s.y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 240 540" className="w-full h-auto max-w-[240px]" aria-hidden="true">
      <path d={pathD} fill="none" stroke="var(--border-1)" strokeWidth="2" />
      {STOPS.map((s, i) => {
        const x = i % 2 === 0 ? 70 : 170
        const isLast = i === STOPS.length - 1
        return (
          <g key={s.label}>
            <circle
              cx={x}
              cy={s.y}
              r={isLast ? 9 : 7}
              fill={isLast ? 'var(--accent)' : 'var(--bg-card)'}
              stroke={isLast ? 'var(--accent-text)' : 'var(--accent-bg)'}
              strokeWidth="2.5"
            />
            {isLast && <circle cx={x} cy={s.y} r="16" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />}
            <text
              x={i % 2 === 0 ? x + 20 : x - 20}
              y={s.y}
              textAnchor={i % 2 === 0 ? 'start' : 'end'}
              dominantBaseline="central"
              className="font-mono"
              style={{ fontSize: 13, fill: isLast ? 'var(--accent-text)' : 'var(--text-4)', fontWeight: isLast ? 600 : 400 }}
            >
              {s.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
