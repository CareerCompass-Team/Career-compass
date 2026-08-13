// Star rating — read-only by default, or interactive when onChange is passed
// (used for interview self-assessment: technical / communication / confidence).
export default function StarRating({ value, max = 5, onChange }) {
  const interactive = typeof onChange === 'function'
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange(i + 1)}
            className={interactive ? 'press-scale cursor-pointer' : 'cursor-default'}
            style={{
              color: filled ? '#f59e0b' : 'var(--border-1)',
              fontSize: 16,
              lineHeight: 1,
              background: 'none',
              border: 'none',
              padding: 0,
              transition: 'color 0.15s ease, transform 0.15s ease',
            }}
            aria-label={`${i + 1} star${i === 0 ? '' : 's'}`}
          >
            ★
          </button>
        )
      })}
    </div>
  )
}
