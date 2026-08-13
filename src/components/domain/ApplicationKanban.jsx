// The kanban board view of applications, grouped by status into columns —
// the full lifecycle, so the board visually IS the job-search journey:
// Saved through Accepted (or Not Selected), left to right.

import { Link } from 'react-router-dom'
import CompanyAvatar from '../ui/CompanyAvatar'
import EmptyState from '../ui/EmptyState'
import { APPLICATION_STATUSES, applicationStatusColor } from '../../lib/status'

export default function ApplicationKanban({ applications, onCardClick }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {APPLICATION_STATUSES.map((status, colIdx) => {
        const column = applications.filter(a => a.status === status)
        return (
          <div key={status} className="shrink-0 w-56 stagger-item" style={{ animationDelay: `${colIdx * 0.05}s` }}>
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
                const content = (
                  <>
                    <CompanyAvatar name={app.company} size="md" />
                    <div className="text-xs font-medium mt-2 mb-0.5" style={{ color: 'var(--text-2)' }}>{app.company}</div>
                    <div className="text-xs mb-2" style={{ color: 'var(--text-4)' }}>
                      {app.role.split(' ').slice(0, 3).join(' ')}
                    </div>
                    {app.nextStep && (
                      <div className="text-xs" style={{ color: 'var(--text-5)' }}>{app.nextStep}</div>
                    )}
                    {app.timeline.length > 0 && (
                      <div className="text-xs mt-2 pt-2" style={{ color: 'var(--text-5)', borderTop: '1px solid var(--border-3)' }}>
                        Last: {app.timeline[app.timeline.length - 1].date}
                      </div>
                    )}
                  </>
                )

                if (onCardClick) {
                  return (
                    <div
                      key={app.id}
                      onClick={() => onCardClick(app)}
                      className="rounded-xl p-4 block transition-all duration-150 hover-lift cursor-pointer"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
                    >
                      {content}
                    </div>
                  )
                }

                return (
                  <Link
                    key={app.id}
                    to={`/applications/${app.id}`}
                    className="rounded-xl p-4 block transition-all duration-150 hover-lift"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
                  >
                    {content}
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
