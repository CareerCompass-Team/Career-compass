// Generic 0-100 progress bar. Animates its width whenever `value` changes,
// so it visibly fills rather than jumping — used for match scores,
// profile completion, prep-note completion.
export default function ProgressBar({ value, height = 6, color = 'var(--accent)', trackColor = 'var(--bg-muted)' }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="rounded-full overflow-hidden" style={{ height, background: trackColor }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${clamped}%`, background: color, transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
    </div>
  )
}
