import { X } from 'lucide-react'

export default function Modal({ title, onClose, children, width = 460 }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-full max-h-[85vh] flex flex-col my-auto animate-scaleIn overflow-hidden relative shadow-2xl border shrink-0"
        style={{ maxWidth: width, background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: 'var(--border-3)', background: 'var(--bg-card)' }}>
          <h2 className="font-display text-base font-bold" style={{ color: 'var(--text-1)' }}>{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 press-scale transition-colors"
            style={{ color: 'var(--text-4)' }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  )
}
