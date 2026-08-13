import { Link } from 'react-router-dom'
import CompassLogo from '../ui/CompassLogo'
import { useAppData } from '../../context/AppDataContext'
import { LogIn, UserPlus, Sparkles } from 'lucide-react'

export default function PublicNav() {
  const { user, openAuthModal } = useAppData()

  return (
    <header
      className="sticky top-0 z-[100] backdrop-blur-xl transition-all"
      style={{
        background: 'rgba(8,14,31,0.85)',
        borderBottom: '1px solid var(--border-3)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <CompassLogo size={32} />
          <div>
            <span className="font-display font-bold text-base tracking-tight block" style={{ color: 'var(--text-1)' }}>
              CareerCompass
            </span>
            <span className="text-[9px] font-mono tracking-widest text-purple-400 block -mt-1 uppercase">
              Kenya Job Matcher
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold" style={{ color: 'var(--text-4)' }}>
          <a href="#how-it-works" className="hover:text-purple-300 transition-colors">How it works</a>
          <a href="#features" className="hover:text-purple-300 transition-colors">Platform Features</a>
          <a href="#for-students" className="hover:text-purple-300 transition-colors">For Job Seekers</a>
        </nav>

        {/* Auth CTA Actions */}
        <div className="flex items-center gap-3">
          {user?.isLoggedIn ? (
            <Link
              to={user.role === 'recruiter' ? '/recruiter' : '/dashboard'}
              className="text-xs px-4 py-2.5 rounded-xl font-bold transition-all hover:opacity-95 flex items-center gap-2 press-scale text-white"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
              }}
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
                className="text-xs px-4 py-2 rounded-xl font-semibold transition-all border flex items-center gap-1.5 press-scale"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
              >
                <LogIn size={13} /> Sign In
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className="text-xs px-4 py-2 rounded-xl font-bold transition-all hover:opacity-95 flex items-center gap-1.5 press-scale text-white"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
                }}
              >
                <UserPlus size={13} /> Register Free
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
