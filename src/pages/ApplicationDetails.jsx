import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FileText, CheckCircle2, XCircle, ArrowRightCircle, CalendarDays, Clock, LayoutList } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import Timeline from '../components/ui/Timeline'
import DetailList from '../components/ui/DetailList'
import StatusBadge from '../components/domain/StatusBadge'

export default function ApplicationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    applications,
    interviews,
    jobs,
    applyToSaved,
    scheduleInterview,
    addApplicationNote,
    updateApplicationStatus,
  } = useApplications()

  const [noteText, setNoteText] = useState('')
  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')
  const [interviewType, setInterviewType] = useState('Video')
  const [interviewRound, setInterviewRound] = useState('Technical')

  const app = applications.find(a => a.id === id)
  const interview = interviews.find(i => i.applicationId === id)
  const job = jobs.find(j => j.id === app?.jobId)

  if (!app) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Application not found. <Link to="/applications" style={{ color: 'var(--accent)' }}>Back to Applications</Link>
      </div>
    )
  }

  const handleAddNote = () => {
    if (!noteText.trim()) return
    addApplicationNote(app.id, noteText.trim())
    setNoteText('')
  }

  const handleScheduleInterview = event => {
    event.preventDefault()
    if (!interviewDate || !interviewTime || !interviewType) return
    scheduleInterview({
      appId: app.id,
      date: interviewDate,
      time: interviewTime,
      type: interviewType,
      round: interviewRound,
    })
    setInterviewDate('')
    setInterviewTime('')
    setInterviewType('Video')
    setInterviewRound('Technical')
  }

  const actions = []
  if (app.status === 'Saved') {
    actions.push({
      key: 'apply',
      label: 'Apply now',
      variant: 'primary',
      onClick: () => applyToSaved(app.id),
      icon: <ArrowRightCircle size={14} />,
    })
  }

  if (app.status === 'Applied') {
    actions.push({
      key: 'schedule',
      label: 'Add interview details below',
      variant: 'secondary',
      onClick: () => {
        document.getElementById('schedule-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      },
    })
  }

  if (app.status === 'Interview') {
    if (interview?.meetingLink) {
      actions.push({
        key: 'join',
        label: 'Join meeting',
        variant: 'primary',
        href: interview.meetingLink,
        icon: <ArrowRightCircle size={14} />,
      })
    }
    if (interview) {
      actions.push({
        key: 'practice',
        label: 'Practice interview',
        variant: 'secondary',
        onClick: () => navigate(`/interviews/${interview.id}/practice`),
      })
    }
    actions.push({
      key: 'complete',
      label: 'Mark interview complete',
      variant: 'secondary',
      onClick: () => updateApplicationStatus(app.id, 'Offer', 'Offer pending'),
    })
  }

  if (app.status === 'Offer') {
    actions.push({
      key: 'accept',
      label: 'Accept offer',
      variant: 'primary',
      onClick: () => updateApplicationStatus(app.id, 'Accepted', 'Role accepted'),
      icon: <CheckCircle2 size={14} />,
    })
    actions.push({
      key: 'decline',
      label: 'Decline offer',
      variant: 'secondary',
      onClick: () => updateApplicationStatus(app.id, 'Not Selected', 'Offer declined'),
      icon: <XCircle size={14} />,
    })
  }

  const isInternalLink = job?.jobLink?.startsWith('/')

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--text-5)' }}>
        <Link to="/applications" style={{ color: 'var(--accent)' }}>Applications</Link>
        <span>/</span>
        <span>{app.company}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2.3fr_1fr] gap-6">
        <div className="space-y-5">
          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <div className="flex items-start gap-4">
              <CompanyAvatar name={app.company} size="lg" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <StatusBadge status={app.status} showDot />
                  <span className="text-sm" style={{ color: 'var(--text-5)' }}>{app.nextStep}</span>
                </div>
                <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{app.role}</h1>
                <div className="text-sm font-medium" style={{ color: 'var(--accent-text)' }}>{app.company}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DetailList
                items={[
                  { label: 'Applied', value: app.appliedDate || 'Not applied' },
                  { label: 'Interview', value: interview ? `${interview.date} • ${interview.time}` : 'Not scheduled' },
                ]}
              />
              <DetailList
                items={[
                  { label: 'Deadline', value: app.deadline },
                  { label: 'Application source', value: app.source },
                ]}
              />
            </div>

            {job?.jobLink && (
              <div className="mt-5 text-sm text-right">
                <Link
                  to={isInternalLink ? job.jobLink : '#'}
                  target={isInternalLink ? undefined : '_blank'}
                  rel={isInternalLink ? undefined : 'noreferrer'}
                  style={{ color: 'var(--accent)' }}
                >
                  View job posting {isInternalLink ? '' : 'on external site'}
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
              Interview schedule
            </h2>
            {app.status === 'Applied' ? (
              <form id="schedule-form" onSubmit={handleScheduleInterview} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-slate-500">
                    Date
                    <input
                      value={interviewDate}
                      onChange={e => setInterviewDate(e.target.value)}
                      type="date"
                      className="mt-2 w-full rounded-2xl border px-3 py-2"
                    />
                  </label>
                  <label className="block text-sm text-slate-500">
                    Time
                    <input
                      value={interviewTime}
                      onChange={e => setInterviewTime(e.target.value)}
                      type="time"
                      className="mt-2 w-full rounded-2xl border px-3 py-2"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-slate-500">
                    Interview type
                    <select
                      value={interviewType}
                      onChange={e => setInterviewType(e.target.value)}
                      className="mt-2 w-full rounded-2xl border px-3 py-2"
                    >
                      <option>Video</option>
                      <option>Phone</option>
                      <option>Take-home</option>
                      <option>Onsite</option>
                    </select>
                  </label>
                  <label className="block text-sm text-slate-500">
                    Round
                    <input
                      value={interviewRound}
                      onChange={e => setInterviewRound(e.target.value)}
                      type="text"
                      className="mt-2 w-full rounded-2xl border px-3 py-2"
                      placeholder="Technical, Final, Recruiter"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  <CalendarDays size={16} />
                  Save interview schedule
                </button>
              </form>
            ) : interview ? (
              <div className="space-y-3 text-sm" style={{ color: 'var(--text-3)' }}>
                <div className="flex items-center gap-2"><Clock size={14} /> {interview.date} at {interview.time}</div>
                <div className="flex items-center gap-2"><LayoutList size={14} /> {interview.type} — {interview.round}</div>
                {interview.meetingLink && (
                  <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    Join meeting
                  </a>
                )}
              </div>
            ) : (
              <div className="text-sm" style={{ color: 'var(--text-4)' }}>
                No interview scheduled yet. Use the applied action to add an interview date and type.
              </div>
            )}
          </div>

          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
              Job documents
            </h2>
            {[
              { label: 'CV', value: app.resumeName },
              { label: 'Cover letter', value: app.coverLetter },
            ].map(({ label, value }) => (
              <div key={label} className="mb-4">
                <div className="text-xs mb-1" style={{ color: 'var(--text-5)' }}>{label}</div>
                <div className="text-sm" style={{ color: value ? 'var(--accent-text)' : 'var(--text-5)' }}>
                  {value || 'Not provided'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
              Notes
            </h2>
            <div className="space-y-3">
              {app.notes.length > 0 ? (
                app.notes.map((note, idx) => (
                  <div key={`${note}-${idx}`} className="rounded-2xl p-3" style={{ background: 'var(--surface-very-faint)', color: 'var(--text-3)' }}>
                    {note}
                  </div>
                ))
              ) : (
                <div className="text-sm" style={{ color: 'var(--text-4)' }}>No notes on this application yet.</div>
              )}
            </div>
            <div className="mt-4">
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                rows={4}
                placeholder="Add a note about the application, interview prep, or next steps."
                className="w-full rounded-3xl border px-4 py-3 text-sm leading-relaxed"
                style={{ background: 'var(--surface-very-faint)', color: 'var(--text-2)' }}
              />
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{ background: 'var(--accent)', color: 'white' }}
                onClick={handleAddNote}
              >
                Add note
              </button>
            </div>
          </div>

          <div className="rounded-3xl p-6 flex flex-col gap-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--text-5)' }}>
              Actions
            </h2>
            {actions.length === 0 ? (
              <div className="text-sm" style={{ color: 'var(--text-4)' }}>
                No direct action needed right now. Use the timeline or notes to track this application.
              </div>
            ) : (
              actions.map(action => (
                action.href ? (
                  <a
                    key={action.key}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center rounded-full px-3 py-3 text-sm font-semibold"
                    style={{
                      background: action.variant === 'primary' ? 'var(--accent)' : 'var(--surface-faint)',
                      color: action.variant === 'primary' ? 'white' : 'var(--text-2)',
                      border: action.variant === 'secondary' ? '1px solid var(--border-2)' : 'none',
                    }}
                  >
                    {action.icon}
                    {action.label}
                  </a>
                ) : (
                  <button
                    key={action.key}
                    type="button"
                    className="inline-flex items-center gap-2 w-full justify-center rounded-full px-3 py-3 text-sm font-semibold"
                    style={{
                      background: action.variant === 'primary' ? 'var(--accent)' : 'var(--surface-faint)',
                      color: action.variant === 'primary' ? 'white' : 'var(--text-2)',
                      border: action.variant === 'secondary' ? '1px solid var(--border-2)' : 'none',
                    }}
                    onClick={action.onClick}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                )
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
