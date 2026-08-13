import CompassLogo from '../ui/CompassLogo'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-3)' }}>
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <CompassLogo size={20} />
          <span className="text-sm" style={{ color: 'var(--text-4)' }}>CareerCompass</span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-5)' }}>
          A Moringa School software engineering project.
        </p>
      </div>
    </footer>
  )
}
