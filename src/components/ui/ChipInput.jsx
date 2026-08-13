// A labeled list of removable chips with an "add" input — used 4 times on
// the Profile page (target roles, skills, job types, locations), so it's
// worth being one component rather than four copies of the same pattern.

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

export default function ChipInput({ label, values, onAdd, onRemove }) {
  const [draft, setDraft] = useState('')

  const submit = () => {
    const trimmed = draft.trim()
    if (trimmed && !values.includes(trimmed)) onAdd(trimmed)
    setDraft('')
  }

  return (
    <div>
      <div className="text-xs mb-2" style={{ color: 'var(--text-5)' }}>{label}</div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {values.map(v => (
          <span
            key={v}
            className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-scaleIn"
            style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
          >
            {v}
            <button onClick={() => onRemove(v)} aria-label={`Remove ${v}`} style={{ display: 'flex' }}>
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), submit())}
          placeholder="Add..."
          className="flex-1 text-xs rounded-lg px-3 py-1.5 outline-none"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
        />
        <button onClick={submit} className="text-xs px-2.5 rounded-lg press-scale" style={{ background: 'var(--surface-hover)', color: 'var(--text-3)' }}>
          <Plus size={13} />
        </button>
      </div>
    </div>
  )
}
