// Generic "nothing here yet" placeholder box. Used for an empty Kanban
// column here, but any page can reuse it (empty saved jobs list, etc.)

export default function EmptyState({ message = 'Nothing here yet' }) {
  return (
    <div
      className="rounded-xl p-4 text-xs text-center"
      style={{
        background: 'var(--surface-very-faint)',
        border: '1px dashed var(--border-2)',
        color: 'var(--text-6)',
      }}
    >
      {message}
    </div>
  )
}
