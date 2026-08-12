import { Link } from 'react-router-dom'
import CompassLogo from '../ui/CompassLogo'

export default function PublicNav() {
  return (
    <header
      className="sticky top-0 z-10 backdrop-blur"
      style={{ background: 'color-mix(in srgb, var(--bg-page) 85%, transparent)', borderBottom: '1px solid var(--border-3)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <CompassLogo size={30} />
          <span className="font-display font-semibold text-base tracking-tight" style={{ color: 'var(--text-1)' }}>
            CareerCompass
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: 'var(--text-4)' }}>
          <a href="#how-it-works" className="hover:opacity-80 transition-opacity">
            How it works
          </a>
          <a href="#features" className="hover:opacity-80 transition-opacity">
            Features
          </a>
          <a href="#for-students" className="hover:opacity-80 transition-opacity">
            For students
          </a>
        </nav>

        <Link
          to="/login"
          className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
          style={{ background: 'var(--accent)', color: 'white' }}
        >
          Open the app
        </Link>
      </div>
    </header>
  )
}
