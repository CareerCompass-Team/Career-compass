import { createContext, useContext, useEffect, useState } from 'react'
import * as mock from '../data/mockData'
import { RECRUITER_APPLICATIONS_MOCK } from '../data/recruiterMockData'
import { fetchLiveJobs } from '../Services/JobApi'

const AppDataContext = createContext(null)
const USER_KEY = 'careercompass-user-session'

// Per-user data bucket keyed by email so different accounts never share state
function dataKey(email) {
  return `careercompass-data-v3-${(email || 'guest').toLowerCase()}`
}

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
    tourDismissed: true,
    role: 'candidate',
    name: mock.profile.name,
    email: mock.profile.email,
    companyName: 'TechCorp Africa',
    isVerifiedEmployer: true,
    avatar: mock.profile.avatar,
    experienceLevel: mock.profile.experienceLevel,
  }
}

function mockDefaults() {
  return {
    jobs: mock.jobs.map(j => ({
      ...j,
      isVerified: true,
      sourceTag: j.location?.includes('Remote') ? 'Global Remote' : 'Kenya Local',
      source: 'internal',
      applyUrl: null,
    })),
    applications: mock.applications || [],
    interviews: mock.interviews || [],
    resumes: mock.resumes || [],
    profile: mock.profile || {},
  }
}

function emptyUserData() {
  return {
    jobs: mock.jobs.map(j => ({
      ...j,
      isVerified: true,
      sourceTag: j.location?.includes('Remote') ? 'Global Remote' : 'Kenya Local',
      source: 'internal',
      applyUrl: null,
      saved: false,
    })),
    applications: [],
    interviews: [],
    resumes: [],
    profile: {},
  }
}

const RECRUITER_INTERVIEWS_MOCK = [
  {
    id: 'iv-rec-1',
    applicationId: 'rc3',
    company: 'Safaricom',
    role: 'Software Engineering Intern',
    candidateName: 'David Kamau',
    candidateEmail: 'david.kamau@usiu.ac.ke',
    date: 'Aug 16, 2026',
    time: '10:00 AM',
    round: 'Technical Interview',
    type: 'Google Meet',
    status: 'Upcoming',
    meetingLink: 'https://meet.google.com/career-compass-david',
    interviewers: ['Engineering Lead', 'Hiring Manager'],
    prepNotes: [
      { id: 'p1', text: "Review David's GitHub portfolio and coding submission", checked: true },
      { id: 'p2', text: 'Prepare React architecture and state management questions', checked: false },
    ],
    questions: [],
    notes: 'Top candidate from ATS screen (94% match).',
  },
  {
    id: 'iv-rec-2',
    applicationId: 'rc8',
    company: 'Safaricom',
    role: 'UX/UI Design Intern',
    candidateName: 'Nasrin Mohamed',
    candidateEmail: 'nasrin.m@strathmore.edu',
    date: 'Aug 17, 2026',
    time: '11:00 AM',
    round: 'Portfolio & Design Challenge Review',
    type: 'Google Meet',
    status: 'Upcoming',
    meetingLink: 'https://meet.google.com/career-compass-nasrin',
    interviewers: ['Product Design Lead'],
    prepNotes: [
      { id: 'p1', text: 'Review Figma interactive prototype submission', checked: true },
    ],
    questions: [],
    notes: 'Outstanding portfolio. High potential for internship.',
  },
  {
    id: 'iv-rec-3',
    applicationId: 'rc5',
    company: 'Safaricom',
    role: 'Frontend Developer Intern',
    candidateName: 'Jemimah Achieng',
    candidateEmail: 'jemimah.a@tuk.ac.ke',
    date: 'Aug 14, 2026',
    time: '2:00 PM',
    round: 'Technical Interview',
    type: 'Google Meet',
    status: 'Completed',
    meetingLink: 'https://meet.google.com/career-compass-jemimah',
    interviewers: ['Engineering Lead'],
    prepNotes: [
      { id: 'p1', text: 'Completed with score 96/100', checked: true },
    ],
    questions: [],
    notes: 'Scored 96/100. Recommended for offer.',
  },
]

function loadDataForUser(email, role = 'candidate') {
  const isRecruiter = role === 'recruiter'
  const isMockUser = email === mock.profile?.email

  if (!email) {
    return isRecruiter
      ? { ...emptyUserData(), applications: RECRUITER_APPLICATIONS_MOCK, interviews: RECRUITER_INTERVIEWS_MOCK }
      : mockDefaults()
  }

  try {
    const raw = localStorage.getItem(dataKey(email))
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        jobs: Array.isArray(parsed.jobs) ? parsed.jobs : isMockUser ? mockDefaults().jobs : emptyUserData().jobs,
        applications: Array.isArray(parsed.applications) && parsed.applications.length > 0
          ? parsed.applications
          : isRecruiter ? RECRUITER_APPLICATIONS_MOCK : (isMockUser ? mock.applications : []),
        interviews: Array.isArray(parsed.interviews) && parsed.interviews.length > 0
          ? parsed.interviews
          : isRecruiter ? RECRUITER_INTERVIEWS_MOCK : (isMockUser ? mock.interviews : []),
        resumes: Array.isArray(parsed.resumes) ? parsed.resumes : isMockUser ? mock.resumes : [],
        profile: parsed.profile || (isMockUser ? mock.profile : {}),
      }
    }
  } catch {
    // fall through
  }

  return isRecruiter
    ? { ...emptyUserData(), applications: RECRUITER_APPLICATIONS_MOCK, interviews: RECRUITER_INTERVIEWS_MOCK }
    : (isMockUser ? mockDefaults() : emptyUserData())
}

function today() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function uid(prefix) {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`
}

export function AppDataProvider({ children }) {
  const initialUser = getInitialUser()
  const [data, setData] = useState(() => loadDataForUser(initialUser.email, initialUser.role))
  const [user, setUser] = useState(initialUser)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  // Persist data to the CURRENT USER's isolated bucket on every change
  useEffect(() => {
    if (!user?.email) return
    try {
      localStorage.setItem(dataKey(user.email), JSON.stringify(data))
    } catch {
      // non-fatal
    }
  }, [data, user?.email])

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

  // Persist user session
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
    const isMockUser = email === mock.profile?.email
    const restoredUser = {
      isLoggedIn: true,
      isNewUser: false,
      tourDismissed: true,
      role,
      name: isMockUser ? mock.profile.name : (role === 'recruiter' ? `${formattedName} (Recruiter)` : formattedName),
      email,
      companyName: role === 'recruiter' ? `${formattedName} Talent` : '',
      isVerifiedEmployer: role === 'recruiter',
      avatar: initials,
      experienceLevel: role === 'recruiter' ? 'Hiring Manager' : 'Job Seeker',
    }
    setUser(restoredUser)
    // Load that user's own data bucket
    setData(loadDataForUser(email, role))
    setAuthModalOpen(false)
  }

  const signup = ({ name, email, role = 'candidate', companyName = '', experienceLevel = 'Entry level' }) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()

    const newUser = {
      isLoggedIn: true,
      isNewUser: true,
      tourDismissed: false,
      role,
      name,
      email,
      companyName: role === 'recruiter' ? (companyName || `${name}'s Organization`) : '',
      isVerifiedEmployer: false,
      avatar: initials || 'CC',
      experienceLevel: role === 'recruiter' ? 'Hiring Manager' : experienceLevel,
    }
    setUser(newUser)
    // Brand-new account → initialize with recruiter defaults or empty candidate slate
    setData(role === 'recruiter' ? { ...emptyUserData(), applications: RECRUITER_APPLICATIONS_MOCK, interviews: RECRUITER_INTERVIEWS_MOCK } : emptyUserData())
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

  const dismissTour = () => {
    setUser(u => ({ ...u, isNewUser: false, tourDismissed: true }))
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
    setData(d => {
      const targetJob = d.jobs.find(j => j.id === jobId)
      if (!targetJob) return d

      const willBeSaved = !targetJob.saved

      // Update jobs array
      const updatedJobs = d.jobs.map(j => (j.id === jobId ? { ...j, saved: willBeSaved } : j))

      // Sync with applications array under status: 'Saved'
      let updatedApps = [...d.applications]
      const existingApp = updatedApps.find(a => a.jobId === jobId)

      if (willBeSaved) {
        if (!existingApp) {
          const newSavedApp = {
            id: uid('a'),
            jobId: targetJob.id,
            company: targetJob.company,
            role: targetJob.title,
            status: 'Saved',
            appliedDate: null,
            deadline: targetJob.deadline,
            location: targetJob.location,
            source: targetJob.source || 'CareerCompass',
            resumeId: null,
            resumeName: null,
            coverLetter: null,
            notes: 'Saved to wishlist for review',
            nextStep: 'Prepare application & CV',
            timeline: [{ date: today(), event: 'Job saved to wishlist' }],
          }
          updatedApps = [newSavedApp, ...updatedApps]
        }
      } else {
        // If unsaved and it's currently in 'Saved' status, remove from applications
        if (existingApp && existingApp.status === 'Saved') {
          updatedApps = updatedApps.filter(a => a.id !== existingApp.id)
        }
      }

      return {
        ...d,
        jobs: updatedJobs,
        applications: updatedApps,
      }
    })
  }

  const applyToJob = (jobId, { resumeId = null, resumeName = null, coverLetter = null } = {}) => {
    const job = data.jobs.find(j => j.id === jobId)
    if (!job) return null

    const existing = data.applications.find(a => a.jobId === jobId)

    // If existing app is already submitted (not 'Saved'), return existing ID
    if (existing && existing.status !== 'Saved') {
      return existing.id
    }

    if (existing && existing.status === 'Saved') {
      // Transition existing 'Saved' app to 'Applied'
      const updatedApp = {
        ...existing,
        status: 'Applied',
        appliedDate: today(),
        resumeId,
        resumeName,
        coverLetter,
        nextStep: 'Awaiting recruiter response',
        timeline: [...existing.timeline, { date: today(), event: 'Application submitted to verified employer' }],
      }

      setData(d => ({
        ...d,
        applications: d.applications.map(a => (a.id === existing.id ? updatedApp : a)),
        jobs: d.jobs.map(j => (j.id === jobId ? { ...j, saved: true } : j)),
      }))
      return existing.id
    }

    // Create fresh application if none existed
    const newApp = {
      id: uid('a'),
      jobId,
      company: job.company,
      role: job.title,
      status: 'Applied',
      appliedDate: today(),
      deadline: job.deadline,
      location: job.location,
      source: job.source || 'CareerCompass',
      resumeId,
      resumeName,
      coverLetter,
      notes: '',
      nextStep: 'Awaiting recruiter response',
      timeline: [{ date: today(), event: 'Application submitted to verified employer' }],
    }

    setData(d => ({
      ...d,
      applications: [newApp, ...d.applications],
      jobs: d.jobs.map(j => (j.id === jobId ? { ...j, saved: true } : j)),
    }))
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

  // ---- Recruiter Schedule Interview for Candidate ----
  const scheduleCandidateInterview = (candidateId, { round, date, time, meetingLink }) => {
    const app = data.applications.find(a => a.id === candidateId)
    const company = app ? app.company : (user?.companyName || 'Safaricom')
    const role = app ? app.role : 'Engineering Role'
    const candidateName = app ? (app.candidateName || app.role) : 'Candidate'

    const newInterview = {
      id: uid('i'),
      applicationId: candidateId,
      company,
      role,
      candidateName,
      date: date || today(),
      time: time || '10:00 AM',
      round: round || 'Technical Interview',
      type: 'Google Meet',
      status: 'Upcoming',
      meetingLink: meetingLink || 'https://meet.google.com/career-compass-interview',
      interviewers: ['Recruiter / Hiring Manager'],
      prepNotes: [
        { id: uid('p'), text: `Review ${candidateName}'s CV and project portfolio`, checked: false },
        { id: uid('p'), text: 'Prepare technical questions & coding exercise', checked: false },
        { id: uid('p'), text: 'Send calendar invite to candidate', checked: true },
      ],
      questions: [],
      notes: `Scheduled ${round || 'Interview'} for ${candidateName} on ${date} at ${time}. Candidate notified via email.`,
      selfAssessment: { technical: 0, communication: 0, confidence: 0 },
      result: 'Waiting',
    }

    setData(d => ({
      ...d,
      interviews: [newInterview, ...d.interviews],
      applications: d.applications.map(a =>
        a.id === candidateId
          ? {
              ...a,
              status: 'Interview',
              interviewDate: date,
              interviewTime: time,
              meetLink: meetingLink,
              timeline: [...a.timeline, { date: today(), event: `${round || 'Interview'} scheduled for ${date} at ${time}` }],
            }
          : a
      ),
    }))
    return newInterview.id
  }

  // ---- Recruiter Send Offer to Candidate ----
  const sendCandidateOffer = (candidateId, offerData) => {
    setData(d => ({
      ...d,
      applications: d.applications.map(a =>
        a.id === candidateId
          ? {
              ...a,
              status: 'Offer',
              offerSalary: offerData.salary || 'KES 100,000/mo',
              offerStartDate: offerData.startDate || 'Sep 1, 2026',
              offerBenefits: offerData.benefits || 'Medical cover, Remote Fridays, KES 50,000 learning budget',
              offerLetter: offerData.letter || '',
              timeline: [...a.timeline, { date: today(), event: `Official Job Offer letter extended (${offerData.salary || 'Competitive'})` }],
            }
          : a
      ),
    }))
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
      content: '',
      ...resumeData,
    }
    setData(d => ({ ...d, resumes: [newResume, ...d.resumes] }))
    return newResume.id
  }

  const updateResumeContent = (resumeId, content) => {
    setData(d => ({
      ...d,
      resumes: d.resumes.map(r =>
        r.id === resumeId ? { ...r, content, updatedDate: today() } : r
      ),
    }))
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
    dismissTour,
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
    scheduleCandidateInterview,
    sendCandidateOffer,
    togglePrepNote,
    updateInterviewNotes,
    setSelfAssessment,
    completeInterview,
    addResume,
    setDefaultResume,
    deleteResume,
    updateResumeContent,
    updateProfile,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider')
  return ctx
}

