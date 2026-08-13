// A generic stack of "label" + "value" rows. Doesn't know what the values
// mean — used here for application details, but works for job details,
// interview info, profile fields, anything shaped like a label/value list.

export default function DetailList({ items }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ label, value }) => (
        <div key={label}>
          <div className="text-xs mb-0.5" style={{ color: 'var(--text-5)' }}>{label}</div>
          <div className="text-sm" style={{ color: 'var(--text-2)' }}>{value}</div>
        </div>
      ))}
    </div>
  )
}
