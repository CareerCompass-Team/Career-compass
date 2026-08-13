export default function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs" style={{ color: 'var(--text-5)' }}>{label}:</span>
      <div className="flex gap-1">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="text-xs px-2.5 py-1 rounded-lg transition-colors press-scale"
            style={{
              background: value === opt ? 'var(--accent-bg)' : 'var(--surface-hover)',
              color: value === opt ? 'var(--accent-text)' : 'var(--text-4)',
              border: value === opt ? '1px solid var(--border-1)' : '1px solid transparent',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
