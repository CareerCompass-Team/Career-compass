import { LogOut, X, AlertCircle } from 'lucide-react'

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fadeIn"
      style={{
        background: 'rgba(8, 14, 31, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 shadow-2xl transition-all border relative text-center animate-scaleIn"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-white/10 transition-colors"
          style={{ color: 'var(--text-4)' }}
          aria-label="Close logout modal"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center bg-red-500/10 text-red-500">
          <AlertCircle size={24} />
        </div>

        <h3 className="font-display text-lg font-bold mb-1" style={{ color: 'var(--text-1)' }}>
          Confirm Logout
        </h3>
        <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-4)' }}>
          Are you sure you want to log out of your CareerCompass account? You will need to log back in to access your saved data.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all"
            style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'transparent' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 press-scale"
            style={{ background: '#ef4444' }}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
