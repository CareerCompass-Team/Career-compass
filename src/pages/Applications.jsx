import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Video } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import { APPLICATION_STATUSES } from '../lib/status'
import ApplicationKanban from '../components/domain/ApplicationKanban'
import ApplicationList from '../components/domain/ApplicationList'

export default function Applications() {
  const [view, setView] = useState('kanban') // 'kanban' | 'list'
  const [statusFilter, setStatusFilter] = useState('All')

  const {
    applications,
    interviews,
    deadlineAlerts,
    upcomingInterview,
    applyToSaved,
    jobs,
  } = useApplications()

  const interviewsByApp = interviews.reduce((map, interview) => {
    map[interview.applicationId] = interview
    return map
  }, {})

  const upcomingApplication = upcomingInterview && applications.find(app => app.id === upcomingInterview.applicationId)

  const filtered = statusFilter === 'All'
    ? applications
    : applications.filter(a => a.status === statusFilter)

  const navigate = useNavigate()

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
            Applications
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            {applications.length} total applications
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-1)' }}>
            {['kanban', 'list'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 text-xs font-medium capitalize transition-colors"
                style={{
                  background: view === v ? 'var(--accent-bg)' : 'transparent',
                  color: view === v ? 'var(--accent-text)' : 'var(--text-4)',
                }}
              >
                {v === 'kanban' ? '⊞ Kanban' : '≡ List'}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="text-sm px-4 py-2 rounded-lg font-medium"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))', color: 'white' }}
            onClick={() => navigate('/jobs')}
          >
            + Add Application
          </button>
        </div>
      </div>

      {deadlineAlerts.length > 0 && (
        <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.16)' }}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                Application deadline coming up
              </p>
              <p className="text-sm" style={{ color: 'var(--text-4)' }}>
                You have {deadlineAlerts.length} saved/applied application(s) with deadlines in the next week.
              </p>
            </div>
            <div className="text-sm font-medium" style={{ color: 'var(--text-5)' }}>
              {deadlineAlerts.map(app => `${app.company} (${app.deadline})`).join(' • ')}
            </div>
          </div>
        </div>
      )}

      {upcomingInterview && upcomingApplication && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.16)',
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div
                className="rounded-2xl p-3"
                style={{ background: 'rgba(59, 130, 246, 0.16)' }}
              >
                <Bell size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                  Upcoming interview
                </p>
                <p className="text-sm" style={{ color: 'var(--text-4)' }}>
                  {upcomingApplication.company} — {upcomingInterview.date} at {upcomingInterview.time}
                </p>
              </div>
            </div>
            <a
              href={upcomingInterview.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              <Video size={16} />
              Join Google Meet
            </a>
          </div>
        </div>
      )}

      {view === 'kanban' ? (
        <ApplicationKanban applications={filtered} interviewMap={interviewsByApp} applyToSaved={applyToSaved} jobs={jobs} />
      ) : (
        <>
          <div className="flex items-center gap-2 mb-5">
            {['All', ...APPLICATION_STATUSES].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  background: statusFilter === s ? 'var(--accent-bg)' : 'var(--surface-hover)',
                  color: statusFilter === s ? 'var(--accent-text)' : 'var(--text-4)',
                  border: statusFilter === s ? '1px solid var(--border-1)' : '1px solid transparent',
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <ApplicationList applications={filtered} interviewMap={interviewsByApp} applyToSaved={applyToSaved} jobs={jobs} />
        </>
      )}
    </div>
  )
}
