// A reusable timeline component for any list of dated events.
// The connector is a gentle winding path, which gives a sense of progress
// and direction without changing the component's API.
export default function Timeline({ items, emptyMessage = 'No activity yet.' }) {
  if (items.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--text-5)' }}>
        {emptyMessage}
      </p>
    )
  }

  const step = 88
  const points = items.map((_, index) => ({
    x: index % 2 === 0 ? 10 : 22,
    y: index * step + 24,
  }))

  const pathD = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    }

    const previous = points[index - 1]
    const midY = previous.y + (point.y - previous.y) / 2

    return `${path} C ${previous.x} ${midY} ${point.x} ${midY} ${point.x} ${point.y}`
  }, '')

  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-0 top-0 h-full w-8"
        viewBox={`0 0 32 ${items.length * step + 16}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={pathD}
          fill="none"
          stroke="var(--border-1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col gap-5">
        {items.map((item, idx) => {
          const leftPosition = idx % 2 === 0 ? '2px' : '14px'
          return (
            <div key={idx} className="relative flex items-start gap-4 pl-10">
              <div
                className="absolute top-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  left: leftPosition,
                  background: 'var(--bg-card)',
                  border: '2px solid var(--accent-bg)',
                }}
              >
                <span className="block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              </div>

              <div>
                <div className="font-mono text-xs mb-1" style={{ color: 'var(--accent)' }}>
                  {item.date}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-2)' }}>
                  {item.event}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
