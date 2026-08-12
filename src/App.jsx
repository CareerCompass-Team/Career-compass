import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ApplicationProvider } from './context/ApplicationContext'
import AppShell from './components/layout/AppShell'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import Applications from './pages/Applications'
import ApplicationDetails from './pages/ApplicationDetails'
import Interviews from './pages/Interviews'
import InterviewDetails from './pages/InterviewDetails'
import InterviewPractice from './pages/InterviewPractice'
import Resumes from './pages/Resumes'
import Profile from './pages/Profile'

export default function App() {
  return (
    <ThemeProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<AppShell />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="jobs/:jobId" element={<JobDetails />} />
              <Route path="applications" element={<Applications />} />
              <Route path="applications/:id" element={<ApplicationDetails />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="interviews/:id" element={<InterviewDetails />} />
              <Route path="interviews/:id/practice" element={<InterviewPractice />} />
              <Route path="resumes" element={<Resumes />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </ThemeProvider>
  )
}
