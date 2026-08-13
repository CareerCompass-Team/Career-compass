import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppDataProvider } from './context/AppDataContext'
import AppShell from './components/layout/AppShell'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import RecruiterDashboard from './pages/RecruiterDashboard'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import Applications from './pages/Applications'
import ApplicationDetails from './pages/ApplicationDetails'
import Interviews from './pages/Interviews'
import InterviewDetails from './pages/InterviewDetails'
import InterviewPractice from './pages/InterviewPractice'
import Resumes from './pages/Resumes'
import Profile from './pages/Profile'

import ErrorBoundary from './components/ui/ErrorBoundary'
import AuthModal from './components/ui/AuthModal'
import LogoutModal from './components/ui/LogoutModal'
import { useAppData } from './context/AppDataContext'
import { useNavigate } from 'react-router-dom'

function GlobalLogoutModalWrapper() {
  const navigate = useNavigate()
  const { logoutModalOpen, closeLogoutModal, logout } = useAppData()

  const handleConfirmLogout = () => {
    closeLogoutModal()
    logout()
    navigate('/')
  }

  return (
    <LogoutModal
      isOpen={logoutModalOpen}
      onClose={closeLogoutModal}
      onConfirm={handleConfirmLogout}
    />
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppDataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public marketing page — no sidebar, its own nav */}
              <Route path="/" element={<Landing />} />

              {/* Authenticated app screens — wrapped in the sidebar shell */}
              <Route path="/dashboard" element={<AppShell><Dashboard /></AppShell>} />
              <Route path="/recruiter" element={<AppShell><RecruiterDashboard /></AppShell>} />
              <Route path="/jobs" element={<AppShell><Jobs /></AppShell>} />
              <Route path="/jobs/:jobId" element={<AppShell><JobDetails /></AppShell>} />
              <Route path="/applications" element={<AppShell><Applications /></AppShell>} />
              <Route path="/applications/:id" element={<AppShell><ApplicationDetails /></AppShell>} />
              <Route path="/interviews" element={<AppShell><Interviews /></AppShell>} />
              <Route path="/interviews/:id" element={<AppShell><InterviewDetails /></AppShell>} />
              <Route path="/interviews/:id/practice" element={<AppShell><InterviewPractice /></AppShell>} />
              <Route path="/resumes" element={<AppShell><Resumes /></AppShell>} />
              <Route path="/profile" element={<AppShell><Profile /></AppShell>} />
            </Routes>
            <AuthModal />
            <GlobalLogoutModalWrapper />
          </BrowserRouter>
        </AppDataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

