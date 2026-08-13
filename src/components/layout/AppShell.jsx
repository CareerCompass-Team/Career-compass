import Sidebar from './Sidebar'
import AICopilot from '../ui/AICopilot'
import { useAppData } from '../../context/AppDataContext'
import { Sparkles, X } from 'lucide-react'

export default function AppShell({ children }) {
  const { user, dismissNewUserNotice } = useAppData()

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: 'var(--bg-page)' }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative flex flex-col" style={{ background: 'var(--bg-page)' }}>
        {/* New User Onboarding Banner */}
        {user?.isNewUser && (
          <div className="px-6 py-2.5 flex items-center justify-between text-xs text-white shrink-0 animate-fadeIn" style={{ background: 'linear-gradient(90deg, #7c3aed, #3b82f6)' }}>
            <div className="flex items-center gap-2">
              <Sparkles size={15} />
              <span>
                <strong>Welcome to CareerCompass, {user.name}!</strong> {user.role === 'recruiter' ? 'Complete company verification to start hiring.' : 'Explore verified jobs, test the ATS resume studio, or practice interviews.'}
              </span>
            </div>
            <button onClick={dismissNewUserNotice} className="p-1 hover:bg-white/20 rounded">
              <X size={14} />
            </button>
          </div>
        )}

        <div className="flex-1">
          {children}
        </div>
      </main>

      {/* Global AI Assistant */}
      <AICopilot />
    </div>
  )
}

