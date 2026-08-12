// The table/list view of applications. Same reasoning as ApplicationKanban —
// pulled out of the page file so Applications.jsx stays thin.

import { Link, useNavigate } from 'react-router-dom'
import { Video } from 'lucide-react'
import CompanyAvatar from '../ui/CompanyAvatar'
import StatusBadge from './StatusBadge'

const COLUMNS = '1.2fr 1.5fr 120px 120px 1fr 140px'

export default function ApplicationList({ applications, interviewMap = {}, applyToSaved, jobs = [] }) {
  const navigate = useNavigate()
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
      <div
        className="grid px-5 py-3 text-xs font-medium uppercase tracking-wider"
        style={{ gridTemplateColumns: COLUMNS, color: 'var(--text-5)', borderBottom: '1px solid var(--border-2)' }}
      >
        <span>Company</span>
        <span>Role</span>
        <span>Status</span>
        <span>Applied</span>
        <span>Next Step</span>
        <span>Action</span>
      </div>

      {applications.map((app, idx) => {
        const interview = interviewMap[app.id]
        const canJoin = interview?.meetingLink && app.status === 'Interview'
        const canApply = app.status === 'Saved'
        const job = jobs.find(j => j.id === app.jobId)

        return (
          <Link
            key={app.id}
            to={`/applications/${app.id}`}
            className="grid px-5 py-4 transition-colors items-center"
            style={{
              gridTemplateColumns: COLUMNS,
              borderBottom: idx < applications.length - 1 ? '1px solid var(--border-3)' : 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div className="flex items-center gap-2.5">
              <CompanyAvatar name={app.company} size="sm" />
              <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>{app.company}</span>
            </div>
            <span className="text-sm" style={{ color: 'var(--text-3)' }}>{app.role}</span>
            <span><StatusBadge status={app.status} /></span>
            <span className="text-xs" style={{ color: 'var(--text-4)' }}>{app.appliedDate || '—'}</span>
            <span className="text-xs" style={{ color: 'var(--text-5)' }}>{app.nextStep || '—'}</span>
            <div className="text-right">
              {canJoin ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(interview.meetingLink, '_blank', 'noreferrer')
                  }}
                >
                  <Video size={14} />
                  Join
                </button>
              ) : canApply ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)', border: '1px solid var(--border-2)' }}
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
              ) : (
                <span className="text-xs" style={{ color: 'var(--text-5)' }}>
                  {app.status === 'Interview' ? 'Check details' : 'View'}
                </span>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
