// The kanban board view of applications, grouped by status into columns.
// Previously this was a function defined inline inside Applications.tsx.
// Pulling it out means the Applications page file just says
// "<ApplicationKanban applications={apps} />" instead of holding all this
// markup itself.

import { Link, useNavigate } from 'react-router-dom'
import { Video } from 'lucide-react'
import CompanyAvatar from '../ui/CompanyAvatar'
import EmptyState from '../ui/EmptyState'
import { APPLICATION_STATUSES, applicationStatusColor } from '../../lib/status'

const KANBAN_COLUMNS = APPLICATION_STATUSES.slice(0, 4) // Saved, Applied, Interview, Offer

export default function ApplicationKanban({ applications, interviewMap = {}, applyToSaved, jobs = [] }) {
  const navigate = useNavigate()

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map(status => {
        const column = applications.filter(a => a.status === status)
        return (
          <div key={status} className="shrink-0 w-56">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: applicationStatusColor[status] }} />
              <span className="font-mono text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-4)' }}>
                {status}
              </span>
              <span
                className="font-mono text-xs px-1.5 py-0.5 rounded ml-auto"
                style={{ background: 'var(--accent-bg-faint)', color: 'var(--text-5)' }}
              >
                {column.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {column.map(app => {
                const interview = interviewMap[app.id]
                const canJoin = interview?.meetingLink && app.status === 'Interview'
                const job = jobs.find(j => j.id === app.jobId)
                const openJob = () => {
                  if (!job?.jobLink) return
                  if (job.jobLink.startsWith('/')) {
                    navigate(job.jobLink)
                  } else {
                    window.open(job.jobLink, '_blank', 'noreferrer')
                  }
                }

                return (
                  <Link
                    key={app.id}
                    to={`/applications/${app.id}`}
                    className="rounded-xl p-4 block transition-all duration-150"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
                  >
                    <CompanyAvatar name={app.company} size="md" />
                    <div className="text-xs font-medium mt-2 mb-0.5" style={{ color: 'var(--text-2)' }}>{app.company}</div>
                    <div className="text-xs mb-2" style={{ color: 'var(--text-4)' }}>
                      {app.role.split(' ').slice(0, 3).join(' ')}
                    </div>
                    {app.nextStep && (
                      <div className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                        {app.nextStep}
                      </div>
                    )}
                    {canJoin && (
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold"
                        style={{ background: 'var(--accent)', color: 'white' }}
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(interview.meetingLink, '_blank', 'noreferrer')
                        }}
                      >
                        <Video size={12} />
                        Join interview
                      </button>
                    )}
                    {app.status === 'Saved' && (
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold"
                        style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)' }}
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (job?.jobLink && !job.jobLink.startsWith('/')) {
                            window.open(job.jobLink, '_blank', 'noreferrer')
                          } else if (job?.jobLink) {
                            navigate(job.jobLink)
                          } else {
                            applyToSaved?.(app.id)
                          }
                        }}
                      >
                        {job?.jobLink ? 'View role' : 'Apply'}
                      </button>
                    )}
                    {app.timeline.length > 0 && (
                      <div className="text-[11px] mt-3 pt-2" style={{ color: 'var(--text-5)', borderTop: '1px solid var(--border-3)' }}>
                        Last update: {app.timeline[app.timeline.length - 1].date}
                      </div>
                    )}
                  </Link>
                )
              })}
              {column.length === 0 && <EmptyState message="No applications" />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
