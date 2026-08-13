import { createContext, useContext, useEffect, useState } from 'react'
import * as mock from '../data/mockData'
import { fetchLiveJobs } from '../Services/JobApi'

const AppDataContext = createContext(null)
const STORAGE_KEY = 'careercompass-data-v2'
const USER_KEY = 'careercompass-user-session'

function getInitialUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // fall through
  }
  return {
    isLoggedIn: true,
    isNewUser: false,
    role: 'candidate', // 'candidate' | 'recruiter'
    name: mock.profile.name,
    email: mock.profile.email,
    companyName: 'TechCorp Africa',
    isVerifiedEmployer: true,
    avatar: mock.profile.avatar,
    experienceLevel: mock.profile.experienceLevel,
  }
}

function loadInitialData() {
  const defaults = {
    jobs: mock.jobs.map(j => ({
      ...j,
      isVerified: true,
      sourceTag: j.location?.includes('Remote') ? 'Global Remote' : 'Kenya Local',
      source: 'internal',   // in-app posting — SmartApply uses in-app form
      applyUrl: null,
    })),
    applications: mock.applications || [],
    interviews: mock.interviews || [],
    resumes: mock.resumes || [],
    profile: mock.profile || {},
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        jobs: Array.isArray(parsed.jobs) ? parsed.jobs : defaults.jobs,
        applications: Array.isArray(parsed.applications) ? parsed.applications : defaults.applications,
        interviews: Array.isArray(parsed.interviews) ? parsed.interviews : defaults.interviews,
        resumes: Array.isArray(parsed.resumes) ? parsed.resumes : defaults.resumes,
        profile: parsed.profile || defaults.profile,
      }
    }
  } catch {
    // fall through
  }
  return defaults
}

function today() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function uid(prefix) {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`
}

export function AppDataProvider({ children }) {
  const [data, setData] = useState(loadInitialData)
  const [user, setUser] = useState(getInitialUser)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  // Persist data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // non-fatal
    }
  }, [data])

  // Load live external jobs from API on mount
  useEffect(() => {
    fetchLiveJobs().then(liveJobs => {
      if (!liveJobs || liveJobs.length === 0) return
      setData(d => {
        const existingIds = new Set(d.jobs.map(j => j.id))
        const fresh = liveJobs.filter(j => !existingIds.has(j.id))
        if (fresh.length === 0) return d
        return { ...d, jobs: [...d.jobs, ...fresh] }
      })
    })
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch {
      // non-fatal
    }
  }, [user])

  // ---- Auth & User Management ----
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setAuthModalOpen(false)
  }

  const openLogoutModal = () => {
    setLogoutModalOpen(true)
  }

  const closeLogoutModal = () => {
    setLogoutModalOpen(false)
  }

  const login = ({ email, role = 'candidate' }) => {
    const nameFromEmail = email.split('@')[0]
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
    const initials = formattedName.substring(0, 2).toUpperCase()

    setUser({
      isLoggedIn: true,
      isNewUser: false,
      role,
      name: role === 'candidate' ? (email === mock.profile.email ? mock.profile.name : formattedName) : `${formattedName} (Recruiter)`,
      email,
      companyName: role === 'recruiter' ? `${formattedName} Talent` : '',
      isVerifiedEmployer: role === 'recruiter',
      avatar: initials,
      experienceLevel: role === 'recruiter' ? 'Hiring Manager' : 'Job Seeker',
    })
    setAuthModalOpen(false)
  }

  const signup = ({ name, email, role = 'candidate', companyName = '', experienceLevel = 'Entry level' }) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()

    setUser({
      isLoggedIn: true,
      isNewUser: true,
      role,
      name,
      email,
      companyName: role === 'recruiter' ? (companyName || `${name}'s Organization`) : '',
      isVerifiedEmployer: false, // Must undergo anti-scam check
      avatar: initials || 'CC',
      experienceLevel: role === 'recruiter' ? 'Hiring Manager' : experienceLevel,
    })
    setAuthModalOpen(false)
  }

  const logout = () => {
    setUser({
      isLoggedIn: false,
      isNewUser: false,
      role: 'candidate',
      name: '',
      email: '',
      companyName: '',
      isVerifiedEmployer: false,
      avatar: '',
      experienceLevel: '',
    })
  }

  const dismissNewUserNotice = () => {
    setUser(u => ({ ...u, isNewUser: false }))
  }

  const verifyEmployer = ({ companyRegistration, workEmail, website }) => {
    setUser(u => ({
      ...u,
      isVerifiedEmployer: true,
      companyName: u.companyName || 'Verified Organization',
      verificationDetails: { companyRegistration, workEmail, website, verifiedAt: today() },
    }))
  }

  // ---- Recruiter Post Job ----
  const postVerifiedJob = (jobDetails) => {
    const newJob = {
      id: uid('j'),
      company: user.companyName || user.name || 'Verified Employer',
      title: jobDetails.title,
      location: jobDetails.location || 'Nairobi',
      type: jobDetails.type || 'Full-time',
      description: jobDetails.description,
      responsibilities: jobDetails.responsibilities || ['Fulfill key role deliverables', 'Collaborate with cross-functional teams'],
      requirements: jobDetails.requirements || ['Relevant experience', 'Communication skills'],
      preferred: jobDetails.preferred || [],
      skills: jobDetails.skills || ['Communication', 'Problem Solving'],
      salary: jobDetails.salary || 'Competitive',
      deadline: jobDetails.deadline || 'Sep 30, 2026',
      postedDate: today(),
      matchScore: 95,
      saved: false,
      isVerified: user.isVerifiedEmployer,
      sourceTag: jobDetails.location?.toLowerCase().includes('remote') ? 'Global Remote' : 'Kenya Local',
      source: 'internal',   // posted within CareerCompass — SmartApply uses in-app form
      applyUrl: null,
    }
    setData(d => ({ ...d, jobs: [newJob, ...d.jobs] }))
    return newJob.id
  }

  // ---- Jobs ----
  const toggleSaveJob = jobId => {
    setData(d => ({
      ...d,
      jobs: d.jobs.map(j => (j.id === jobId ? { ...j, saved: !j.saved } : j)),
    }))
  }

  const applyToJob = (jobId, { resumeId = null, resumeName = null, coverLetter = null } = {}) => {
    const job = data.jobs.find(j => j.id === jobId)
    if (!job) return null
    const existing = data.applications.find(a => a.jobId === jobId)
    if (existing) return existing.id

    const newApp = {
      id: uid('a'),
      jobId,
      company: job.company,
      role: job.title,
      status: 'Applied',
      appliedDate: today(),
      deadline: job.deadline,
      location: job.location,
      source: 'CareerCompass',
      resumeId,
      resumeName,
      coverLetter,
      notes: '',
      nextStep: 'Awaiting recruiter response',
      timeline: [{ date: today(), event: 'Application submitted to verified employer' }],
    }

    setData(d => ({ ...d, applications: [newApp, ...d.applications] }))
    return newApp.id
  }

  // ---- Applications ----
  const updateApplicationStatus = (appId, status, timelineEvent) => {
    setData(d => ({
      ...d,
      applications: d.applications.map(a =>
        a.id === appId
          ? {
              ...a,
              status,
              timeline: timelineEvent ? [...a.timeline, { date: today(), event: timelineEvent }] : a.timeline,
            }
          : a
      ),
    }))
  }

  const acceptOffer = appId => updateApplicationStatus(appId, 'Accepted', 'Offer accepted 🎉')
  const declineOffer = appId => updateApplicationStatus(appId, 'Not Selected', 'Offer declined')

  const addApplicationNote = (appId, note) => {
    setData(d => ({
      ...d,
      applications: d.applications.map(a => (a.id === appId ? { ...a, notes: note } : a)),
    }))
  }

  const setApplicationNextStep = (appId, nextStep) => {
    setData(d => ({
      ...d,
      applications: d.applications.map(a => (a.id === appId ? { ...a, nextStep } : a)),
    }))
  }

  // ---- Personal Meeting / Interview Reminder ----
  const addInterview = (appId, interviewData) => {
    const app = data.applications.find(a => a.id === appId)
    const company = app ? app.company : (interviewData.company || 'Upcoming Employer')
    const role = app ? app.role : (interviewData.role || 'Interview')

    const newInterview = {
      id: uid('i'),
      applicationId: appId || null,
      company,
      role,
      date: interviewData.date || today(),
      time: interviewData.time || '10:00 AM',
      round: interviewData.round || 'Technical Round',
      type: interviewData.type || 'Video Meeting',
      status: 'Upcoming',
      meetingLink: interviewData.meetingLink || 'https://meet.google.com/career-compass-interview',
      interviewers: interviewData.interviewers || ['Hiring Manager'],
      prepNotes: [
        { id: uid('p'), text: 'Review key role requirements and project achievements', checked: false },
        { id: uid('p'), text: 'Prepare 3 STAR stories (Situation, Task, Action, Result)', checked: false },
        { id: uid('p'), text: 'Test microphone and camera setup 15 mins before meeting', checked: true },
      ],
      questions: [],
      notes: interviewData.notes || 'Personal reminder for upcoming interview meeting.',
      selfAssessment: { technical: 0, communication: 0, confidence: 0 },
      result: 'Waiting',
    }
    setData(d => ({ ...d, interviews: [newInterview, ...d.interviews] }))
    if (appId) {
      updateApplicationStatus(appId, 'Interview', `Meeting reminder set for ${interviewData.date || today()} (${interviewData.time || '10:00 AM'})`)
    }
    return newInterview.id
  }

  const togglePrepNote = (interviewId, prepNoteId) => {
    setData(d => ({
      ...d,
      interviews: d.interviews.map(iv =>
        iv.id === interviewId
          ? { ...iv, prepNotes: iv.prepNotes.map(p => (p.id === prepNoteId ? { ...p, checked: !p.checked } : p)) }
          : iv
      ),
    }))
  }

  const updateInterviewNotes = (interviewId, notes) => {
    setData(d => ({
      ...d,
      interviews: d.interviews.map(iv => (iv.id === interviewId ? { ...iv, notes } : iv)),
    }))
  }

  const setSelfAssessment = (interviewId, key, value) => {
    setData(d => ({
      ...d,
      interviews: d.interviews.map(iv =>
        iv.id === interviewId ? { ...iv, selfAssessment: { ...iv.selfAssessment, [key]: value } } : iv
      ),
    }))
  }

  const completeInterview = (interviewId, result) => {
    setData(d => {
      const iv = d.interviews.find(x => x.id === interviewId)
      return {
        ...d,
        interviews: d.interviews.map(x => (x.id === interviewId ? { ...x, status: 'Completed', result } : x)),
        applications: iv && iv.applicationId
          ? d.applications.map(a =>
              a.id === iv.applicationId
                ? {
                    ...a,
                    status: result === 'Offer' ? 'Offer' : result === 'Not Selected' ? 'Not Selected' : a.status,
                    timeline: [...a.timeline, { date: today(), event: `Interview completed — result: ${result}` }],
                  }
                : a
            )
          : d.applications,
      }
    })
  }

  // ---- Resumes ----
  const addResume = resumeData => {
    const newResume = {
      id: uid('r'),
      isDefault: data.resumes.length === 0,
      updatedDate: today(),
      createdDate: today(),
      applications: 0,
      size: '310 KB',
      format: 'PDF',
      ...resumeData,
    }
    setData(d => ({ ...d, resumes: [newResume, ...d.resumes] }))
  }

  const setDefaultResume = resumeId => {
    setData(d => ({
      ...d,
      resumes: d.resumes.map(r => ({ ...r, isDefault: r.id === resumeId })),
    }))
  }

  const deleteResume = resumeId => {
    setData(d => ({ ...d, resumes: d.resumes.filter(r => r.id !== resumeId) }))
  }

  // ---- Profile ----
  const updateProfile = updates => {
    setData(d => ({ ...d, profile: { ...d.profile, ...updates } }))
  }

  const value = {
    ...data,
    user,
    authModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    logoutModalOpen,
    openLogoutModal,
    closeLogoutModal,
    login,
    signup,
    logout,
    dismissNewUserNotice,
    verifyEmployer,
    postVerifiedJob,
    toggleSaveJob,
    applyToJob,
    updateApplicationStatus,
    acceptOffer,
    declineOffer,
    addApplicationNote,
    setApplicationNextStep,
    addInterview,
    togglePrepNote,
    updateInterviewNotes,
    setSelfAssessment,
    completeInterview,
    addResume,
    setDefaultResume,
    deleteResume,
    updateProfile,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider')
  return ctx
}

