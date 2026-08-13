import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { X, UserCheck, Briefcase, ShieldCheck, ArrowRight, Lock, Mail, User, Building } from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

export default function AuthModal() {
  const navigate = useNavigate()
  const { authModalOpen, authMode, closeAuthModal, login, signup } = useAppData()

  const [mode, setMode] = useState(authMode || 'login')
  const [role, setRole] = useState('candidate')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('Entry level')

  useEffect(() => {
    if (authMode) {
      setMode(authMode)
    }
  }, [authMode, authModalOpen])

  if (!authModalOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    if (mode === 'login') {
      login({ email: email.trim(), role })
    } else {
      if (!name.trim()) return
      signup({
        name: name.trim(),
        email: email.trim(),
        role,
        companyName: companyName.trim(),
        experienceLevel,
      })
    }

    if (role === 'recruiter') {
      navigate('/recruiter')
    } else {
      navigate('/dashboard')
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      style={{
        background: 'rgba(8, 14, 31, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={closeAuthModal}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl border animate-scaleIn relative flex flex-col shrink-0 my-auto"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-1)',
          maxHeight: 'min(90vh, 680px)',
          color: 'var(--text-1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 relative text-center shrink-0"
          style={{ borderBottom: '1px solid var(--border-3)' }}
        >
          <button
            onClick={closeAuthModal}
            className="absolute right-4 top-4 p-1.5 rounded-full hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-4)' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <h2 className="font-display text-xl font-bold tracking-tight mb-1" style={{ color: 'var(--text-1)' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-4)' }}>
            {mode === 'login'
              ? 'Access your saved jobs, applications, and career studio.'
              : 'Join CareerCompass to find verified jobs or hire verified talent.'}
          </p>

          {/* Role selector tab */}
          <div className="flex gap-2 mt-4 p-1 rounded-xl" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-2)' }}>
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className="flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all"
              style={{
                background: role === 'candidate' ? 'var(--accent)' : 'transparent',
                color: role === 'candidate' ? 'white' : 'var(--text-4)',
              }}
            >
              <UserCheck size={14} /> Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className="flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all"
              style={{
                background: role === 'recruiter' ? '#7c3aed' : 'transparent',
                color: role === 'recruiter' ? 'white' : 'var(--text-4)',
              }}
            >
              <Briefcase size={14} /> Recruiter / Employer
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ overscrollBehavior: 'contain' }}
        >
          {role === 'recruiter' && (
            <div className="p-3 rounded-xl flex items-start gap-2.5 text-xs" style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.2)', color: 'var(--text-2)' }}>
              <ShieldCheck size={16} className="text-purple-500 shrink-0 mt-0.5" />
              <div>
                <strong>Anti-Scam Protection:</strong> Recruiters undergo company domain & registration verification before posting jobs.
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={role === 'recruiter' ? 'e.g. Sarah Jenkins' : 'e.g. Gladys Wanjiku'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>
          )}

          {mode === 'signup' && role === 'recruiter' && (
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Company / Hiring Organization</label>
              <div className="relative">
                <Building size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. Safaricom, Andela, TechCorp"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>
          )}

          {mode === 'signup' && role === 'candidate' && (
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Experience Level</label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              >
                <option value="Student">Student / Intern</option>
                <option value="Entry level">Entry Level (0-2 yrs)</option>
                <option value="Mid level">Mid Level (2-5 yrs)</option>
                <option value="Senior level">Senior Level (5+ yrs)</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>
              {role === 'recruiter' ? 'Work Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={role === 'recruiter' ? 'name@company.com' : 'gladys@example.com'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 press-scale transition-opacity"
            style={{
              background: role === 'recruiter'
                ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                : 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
            }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight size={16} />
          </button>

          <div className="pt-2 text-center text-xs" style={{ color: 'var(--text-4)' }}>
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-medium underline hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-medium underline hover:opacity-80"
                  style={{ color: 'var(--accent)' }}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}
