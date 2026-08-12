import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  applications as initialApplications,
  interviews as initialInterviews,
  jobs as initialJobs,
  resumes as initialResumes,
} from '../data/mockData'

const ApplicationContext = createContext(null)
const STORAGE_KEY = 'careercompass-app-state'

function formatTimelineDate(date = new Date()) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatLocalDate(date = new Date()) {
  return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })
}

function parseSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function daysUntil(dateString) {
  const target = new Date(dateString)
  if (Number.isNaN(target.getTime())) return Infinity
  const diff = target.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const saved = parseSavedState()
    return saved?.applications ?? initialApplications
  })

  const [interviews, setInterviews] = useState(() => {
    const saved = parseSavedState()
    return saved?.interviews ?? initialInterviews
  })

  const [jobs, setJobs] = useState(() => {
    const saved = parseSavedState()
    return saved?.jobs ?? initialJobs
  })

  const [resumes] = useState(initialResumes)

  useEffect(() => {
    const state = { applications, interviews, jobs }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [applications, interviews, jobs])

  const updateApplication = (id, changes) => {
    setApplications(prev => prev.map(app => (app.id === id ? { ...app, ...changes } : app)))
  }

  const updateApplicationStatus = (appId, status, nextStep) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app
      return {
        ...app,
        status,
        nextStep: nextStep ?? app.nextStep,
        timeline: [
          ...(app.timeline || []),
          { date: formatTimelineDate(new Date()), event: `${status} status set` },
        ],
      }
    }))
  }

  const createApplicationFromJob = (jobId, status = 'Saved') => {
    setApplications(prev => {
      if (prev.some(app => app.jobId === jobId)) return prev
      const job = jobs.find(jobItem => jobItem.id === jobId)
      if (!job) return prev

      const now = new Date()
      return [
        ...prev,
        {
          id: `a${Date.now()}`,
          jobId,
          company: job.company,
          role: job.title,
          status,
          appliedDate: status === 'Applied' ? formatLocalDate(now) : null,
          deadline: job.deadline || '',
          location: job.location,
          source: 'CareerCompass',
          resumeId: 'r1',
          resumeName: 'General_CV.pdf',
          coverLetter: null,
          notes: [status === 'Applied'
            ? 'Application submitted through CareerCompass.'
            : `Saved ${job.title} at ${job.company}`],
          nextStep: status === 'Applied' ? 'Awaiting response' : 'Prepare and apply',
          timeline: status === 'Applied'
            ? [{ date: formatTimelineDate(now), event: 'Application submitted' }]
            : [],
        },
      ]
    })
  }

  const saveJob = jobId => {
    setJobs(prev => prev.map(job => (job.id === jobId ? { ...job, saved: true } : job)))
    createApplicationFromJob(jobId, 'Saved')
  }

  const applyToJob = jobId => {
    setJobs(prev => prev.map(job => (job.id === jobId ? { ...job, saved: true } : job)))
    setApplications(prev => {
      const existing = prev.find(app => app.jobId === jobId)
      const now = new Date()

      if (existing) {
        return prev.map(app => app.jobId === jobId ? {
          ...app,
          status: 'Applied',
          appliedDate: formatLocalDate(now),
          nextStep: 'Awaiting response',
          timeline: [
            ...(app.timeline || []),
            { date: formatTimelineDate(now), event: 'Application submitted' },
          ],
        } : app)
      }

      const job = jobs.find(jobItem => jobItem.id === jobId)
      if (!job) return prev

      return [
        ...prev,
        {
          id: `a${Date.now()}`,
          jobId,
          company: job.company,
          role: job.title,
          status: 'Applied',
          appliedDate: formatLocalDate(now),
          deadline: job.deadline || '',
          location: job.location,
          source: 'CareerCompass',
          resumeId: 'r1',
          resumeName: 'General_CV.pdf',
          coverLetter: null,
          notes: ['Application submitted through CareerCompass.'],
          nextStep: 'Awaiting response',
          timeline: [{ date: formatTimelineDate(now), event: 'Application submitted' }],
        },
      ]
    })
  }

  const applyToSaved = appId => {
    const app = applications.find(item => item.id === appId)
    if (app?.jobId) {
      setJobs(prev => prev.map(job => job.id === app.jobId ? { ...job, saved: true } : job))
    }

    updateApplicationStatus(appId, 'Applied', 'Awaiting response')
  }

  const scheduleInterview = ({ appId, date, time, type, round = 'First round' }) => {
    const application = applications.find(app => app.id === appId)
    if (!application) return

    const meetingLink = type === 'Video'
      ? `https://meet.google.com/${Math.random().toString(36).slice(2, 5)}-${Math.random().toString(36).slice(2, 5)}-${Math.random().toString(36).slice(2, 5)}`
      : null

    const interviewId = `i${Date.now()}`
    setInterviews(prev => [
      ...prev,
      {
        id: interviewId,
        applicationId: appId,
        company: application.company,
        role: application.role,
        date,
        time,
        round,
        type,
        status: 'Upcoming',
        meetingLink,
        interviewers: ['TBD'],
        prepNotes: [],
        questions: [],
        notes: [],
        selfAssessment: { technical: 0, communication: 0, confidence: 0 },
        result: 'Waiting',
      },
    ])

    updateApplication(appId, {
      status: 'Interview',
      nextStep: `${round} ${type} interview scheduled for ${date} at ${time}`,
      timeline: [
        ...(application.timeline || []),
        { date: formatTimelineDate(new Date(date)), event: `${type} interview scheduled — ${round}` },
      ],
    })
  }

  const addApplicationNote = (appId, note) => {
    setApplications(prev => prev.map(app => app.id === appId ? {
      ...app,
      notes: [...(app.notes || []), note],
    } : app))
  }

  const toggleJobSaved = jobId => {
    setJobs(prev => prev.map(job => ({ ...job, saved: job.id === jobId ? !job.saved : job.saved })))
  }

  const deadlineAlerts = useMemo(() => {
    return applications.filter(app => {
      const validStatus = ['Saved', 'Applied'].includes(app.status)
      const days = daysUntil(app.deadline)
      return validStatus && days >= 0 && days <= 7
    })
  }, [applications])

  const upcomingInterview = useMemo(() => {
    return interviews.find(interview => interview.status === 'Upcoming' && interview.meetingLink)
  }, [interviews])

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        interviews,
        jobs,
        resumes,
        deadlineAlerts,
        upcomingInterview,
        saveJob,
        applyToJob,
        applyToSaved,
        scheduleInterview,
        addApplicationNote,
        updateApplicationStatus,
        toggleJobSaved,
        updateApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplications() {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('useApplications must be used within ApplicationProvider')
  }
  return context
}
