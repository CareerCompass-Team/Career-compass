// Generic "first letter of a name in a colored square" badge.
// Doesn't know about jobs or applications — just takes a name and a size.
// Any page can reuse this (job cards, application rows, interview cards).

const SIZE_CLASSES = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-8 h-8 text-xs',
  lg: 'w-9 h-9 text-sm',
}

export default function CompanyAvatar({ name, size = 'md' }) {
  return (
    <div
      className={`rounded-lg flex items-center justify-center font-bold shrink-0 ${SIZE_CLASSES[size]}`}
      style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
    >
      {name[0]}
    </div>
  )
}
