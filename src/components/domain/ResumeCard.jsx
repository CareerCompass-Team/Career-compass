import { FileText, Star, Trash2, Eye } from 'lucide-react'

export default function ResumeCard({ resume, onSetDefault, onDelete, onView, style }) {
  return (
    <div
      onClick={() => onView && onView(resume)}
      className="rounded-xl p-5 flex flex-col gap-3 transition-all hover-lift stagger-item cursor-pointer group relative"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)', ...style }}
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
          <FileText size={18} />
        </div>
        {resume.isDefault && (
          <span className="text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
            <Star size={10} fill="currentColor" />Default
          </span>
        )}
      </div>

      <div>
        <div className="text-sm font-semibold mb-0.5 group-hover:text-indigo-400 transition-colors flex items-center justify-between" style={{ color: 'var(--text-1)' }}>
          <span>{resume.name}</span>
          <Eye size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
        </div>
        <div className="text-xs" style={{ color: 'var(--text-4)' }}>{resume.targetRole}</div>
      </div>

      <div className="text-xs flex items-center gap-3" style={{ color: 'var(--text-5)' }}>
        <span>Updated {resume.updatedDate}</span>
        <span>·</span>
        <span>{resume.applications} applications</span>
      </div>

      <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid var(--border-3)' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onView && onView(resume) }}
          className="text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1 text-indigo-400 border press-scale"
          style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)' }}
        >
          <Eye size={12} /> Read & Edit
        </button>

        {!resume.isDefault && (
          <button
            onClick={(e) => { e.stopPropagation(); onSetDefault(resume.id) }}
            className="text-xs px-2.5 py-1.5 rounded-lg transition-colors press-scale"
            style={{ background: 'var(--surface-hover)', color: 'var(--text-3)' }}
          >
            Set default
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(resume.id) }}
          className="text-xs px-2.5 py-1.5 rounded-lg transition-colors press-scale ml-auto flex items-center gap-1 hover:text-rose-400"
          style={{ color: 'var(--text-5)' }}
        >
          <Trash2 size={12} />Delete
        </button>
      </div>
    </div>
  )
}
