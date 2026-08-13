// A timeline of dated events — { date, event } pairs. Doesn't know it's
// showing an application's history specifically; could show interview
// prep steps, resume edit history, anything with a date and a description.
//
// The connector is a gentle winding path rather than a straight line —
// a small, deliberate nod to "Career*Compass*": progress through a job
// search reads as a path being walked, not a flat changelog. Markers
// alternate left/right slightly to sit along the curve. This is a visual
// approximation (not pixel-measured against real row heights), which is
// the right tradeoff here — exact curve-to-marker alignment would need
// layout measurement via refs/ResizeObserver for a purely decorative touch.

export default function Timeline({ items, emptyMessage = 'No activity yet.' }) {
  if (items.length === 0) {
    return <p className="text-sm" style={{ color: 'var(--text-5)' }}>{emptyMessage}</p>
  }

  const pathD = items
    .map((_, i) => {
      const y = i * 100 + 50
      const x = i % 2 === 0 ? 6 : 18
      const prevX = i % 2 === 0 ? 18 : 6
      return i === 0 ? `M ${x} 0` : `Q ${prevX} ${y - 50} ${x} ${y}`
    })
    .join(' ')

  return (
    <div className="relative">
      <svg
        className="absolute left-0 top-2 w-6"
        style={{ height: 'calc(100% - 1rem)' }}
        viewBox={`0 0 24 ${items.length * 100}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={pathD} fill="none" stroke="var(--border-1)" strokeWidth="2" />
      </svg>

      <div className="flex flex-col gap-5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 pl-8 relative">
            <div
              className="absolute top-1 w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0"
              style={{
                left: idx % 2 === 0 ? '-2px' : '10px',
                background: 'var(--bg-card)',
                border: '2px solid var(--accent-bg)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            </div>
            <div>
              <div className="font-mono text-xs mb-0.5" style={{ color: 'var(--accent)' }}>{item.date}</div>
              <div className="text-sm" style={{ color: 'var(--text-2)' }}>{item.event}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
