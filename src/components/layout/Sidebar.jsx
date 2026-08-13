import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useAppData } from '../../context/AppDataContext'
import CompassLogo from '../ui/CompassLogo'
import { LogOut, LogIn, ShieldCheck } from 'lucide-react'

const candidateNavItems = [
  {
    section: 'MAIN',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
      { path: '/jobs', label: 'Discover Jobs', icon: SearchIcon },
    ],
  },
  {
    section: 'APPLICATIONS',
    items: [
      { path: '/applications', label: 'Applications', icon: ClipboardIcon },
      { path: '/interviews', label: 'Interviews & Reminders', icon: MicIcon },
    ],
  },
  {
    section: 'DOCUMENTS',
    items: [
      { path: '/resumes', label: 'CV Center & ATS Studio', icon: FileIcon },
    ],
  },
  {
    section: 'ACCOUNT',
    items: [
      { path: '/profile', label: 'Profile', icon: UserIcon },
    ],
  },
]

const recruiterNavItems = [
  {
    section: 'RECRUITER HQ',
    items: [
      { path: '/recruiter', label: 'Hiring Dashboard', icon: HomeIcon },
    ],
  },
  {
    section: 'TALENT & JOBS',
    items: [
      { path: '/jobs', label: 'All Job Listings', icon: SearchIcon },
    ],
  },
  {
    section: 'HIRING',
    items: [
      { path: '/applications', label: 'Candidate Pipeline', icon: ClipboardIcon },
      { path: '/interviews', label: 'Interview Reminders', icon: MicIcon },
    ],
  },
  {
    section: 'ACCOUNT',
    items: [
      { path: '/profile', label: 'Employer Profile', icon: UserIcon },
    ],
  },
]

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
    </svg>
  )
}
function ClipboardIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M5.5 3A2.5 2.5 0 0 1 8 .5h4a2.5 2.5 0 0 1 0 5H8A2.5 2.5 0 0 1 5.5 3Z" />
      <path d="M6 4.275A3.75 3.75 0 0 0 4.75 7.5v9.75A2.25 2.25 0 0 0 7 19.5h6a2.25 2.25 0 0 0 2.25-2.25V7.5A3.75 3.75 0 0 0 14 4.275V5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-.725Z" />
    </svg>
  )
}
function MicIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
      <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
    </svg>
  )
}
function FileIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
      <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
    </svg>
  )
}

export default function Sidebar() {
  const location = useLocation()
  const { theme, toggle } = useTheme()
  const { user, openAuthModal, openLogoutModal } = useAppData()


  const navItems = user?.role === 'recruiter' ? recruiterNavItems : candidateNavItems

  return (
    <aside
      className="w-56 shrink-0 flex flex-col"
      style={{
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--sidebar-border)',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* ── Logo ── */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
        <div className="flex items-center gap-2.5">
          <CompassLogo />
          <div>
            <div className="font-display font-semibold text-sm tracking-tight" style={{ color: 'var(--text-1)' }}>
              CareerCompass
            </div>
            <div className="font-mono text-[10px] tracking-wide" style={{ color: 'var(--text-5)' }}>
              {user?.role === 'recruiter' ? 'RECRUITER PORTAL' : 'FIND · GROW'}
            </div>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ section, items }) => (
          <div key={section} className="mb-5">
            <div
              className="font-mono text-[10px] font-medium tracking-widest px-2 mb-1.5"
              style={{ color: 'var(--text-5)', opacity: 0.7 }}
            >
              {section}
            </div>
            {items.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path || (path !== '/dashboard' && path !== '/recruiter' && location.pathname.startsWith(path))
              return (
                <NavLink
                  key={path}
                  to={path}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm mb-0.5 transition-all duration-150"
                  style={{
                    color: active ? 'var(--accent-text)' : 'var(--text-4)',
                    background: active ? 'var(--accent-bg)' : 'transparent',
                    fontWeight: active ? 500 : 400,
                  }}
                  onMouseEnter={e => {
                    if (!active) e.currentTarget.style.background = 'var(--surface-hover)'
                  }}
                  onMouseLeave={e => {
                    if (!active) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span style={{ color: active ? 'var(--accent)' : 'var(--text-5)' }}>
                    <Icon />
                  </span>
                  {label}
                  {active && (
                    <span className="ml-auto w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
                  )}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* ── Theme toggle ── */}
      <div className="px-3 pb-3">
        <button
          onClick={toggle}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
          style={{
            background: 'var(--accent-bg-subtle)',
            border: '1px solid var(--border-2)',
            color: 'var(--accent-text)',
          }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
          <span className="flex items-center gap-1.5">
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            <span
              className="w-8 h-4 rounded-full relative transition-colors duration-200 inline-flex items-center"
              style={{ background: theme === 'dark' ? 'var(--accent)' : 'var(--border-1)' }}
            >
              <span
                className="w-3 h-3 rounded-full bg-white absolute transition-all duration-200"
                style={{ left: theme === 'dark' ? '17px' : '2px' }}
              />
            </span>
          </span>
        </button>
      </div>

      {/* ── User ── */}
      <div className="px-3 py-3" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
        {user?.isLoggedIn ? (
          <div
            className="flex items-center justify-between px-2 py-2 rounded-xl"
            style={{ background: 'var(--surface-faint)' }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                style={{
                  background: user.role === 'recruiter' ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  color: 'white',
                }}
              >
                {user.avatar || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium truncate flex items-center gap-1" style={{ color: 'var(--text-2)' }}>
                  {user?.name ? user.name.split(' ')[0] : 'User'}
                  {user?.isVerifiedEmployer && <ShieldCheck size={12} className="text-emerald-500 shrink-0" />}
                </div>
                <div className="text-[10px] truncate" style={{ color: 'var(--text-5)' }}>
                  {user.role === 'recruiter' ? (user.companyName || 'Recruiter') : user.experienceLevel}
                </div>
              </div>
            </div>
            <button
              onClick={openLogoutModal}
              className="p-1.5 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors"
              title="Log out"
              style={{ color: 'var(--text-5)' }}
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 press-scale"
            style={{ background: 'var(--accent)' }}
          >
            <LogIn size={14} /> Sign In / Register
          </button>
        )}
      </div>
    </aside>
  )
}


