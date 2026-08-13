// A small burst of confetti + a pulsing ring, shown only when an offer
// is accepted — the one moment in a job search worth celebrating.
// Deliberately not reused anywhere else, so it stays meaningful instead
// of becoming decorative noise.

const COLORS = ['#7c3aed', '#a78bfa', '#10b981', '#f59e0b', '#3b82f6']

export default function Celebration() {
  const pieces = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.3}s`,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {pieces.map(p => (
        <span
          key={p.id}
          className="absolute top-0 animate-confetti"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            borderRadius: 1,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
