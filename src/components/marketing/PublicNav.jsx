import { Link } from 'react-router-dom'
import CompassLogo from '../ui/CompassLogo'
import { useAppData } from '../../context/AppDataContext'
import { LogIn, UserPlus } from 'lucide-react'

export default function PublicNav() {
  const { user, openAuthModal } = useAppData()

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
          <a href="#how-it-works" className="hover:opacity-80 transition-opacity">How it works</a>
          <a href="#features" className="hover:opacity-80 transition-opacity">Features</a>
          <a href="#for-students" className="hover:opacity-80 transition-opacity">For job seekers & recruiters</a>
        </nav>

        <div className="flex items-center gap-3">
          {user?.isLoggedIn ? (
            <Link
              to={user.role === 'recruiter' ? '/recruiter' : '/dashboard'}
              className="text-sm px-4 py-2 rounded-xl font-medium transition-opacity hover:opacity-90 flex items-center gap-2 press-scale"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                {user.avatar || 'U'}
              </div>
              {user.role === 'recruiter' ? 'Recruiter Dashboard' : 'Open Dashboard'}
            </Link>
          ) : (
            <>
              <button
                onClick={() => openAuthModal('login')}
                className="text-xs px-3.5 py-2 rounded-xl font-medium transition-colors border flex items-center gap-1.5 press-scale"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
              >
                <LogIn size={14} /> Log In
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className="text-xs px-4 py-2 rounded-xl font-semibold transition-opacity hover:opacity-90 flex items-center gap-1.5 press-scale text-white"
                style={{ background: 'linear-gradient(135deg, var(--accent), #7c3aed)' }}
              >
                <UserPlus size={14} /> Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

