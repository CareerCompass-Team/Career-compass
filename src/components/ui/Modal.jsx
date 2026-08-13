import { X } from 'lucide-react'

export default function Modal({ title, onClose, children, width = 420 }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-full animate-scaleIn"
        style={{ maxWidth: width, background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-3)' }}>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-1)' }}>{title}</h2>
          <button onClick={onClose} className="press-scale" style={{ color: 'var(--text-5)' }} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
