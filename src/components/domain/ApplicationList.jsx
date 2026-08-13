// The table/list view of applications. Same reasoning as ApplicationKanban —
// pulled out of the page file so Applications.jsx stays thin.

import { Link } from 'react-router-dom'
import CompanyAvatar from '../ui/CompanyAvatar'
import StatusBadge from './StatusBadge'

const COLUMNS = '1fr 1fr 120px 120px 1fr'

export default function ApplicationList({ applications, onCardClick }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
      <div
        className="grid px-5 py-3 text-xs font-medium uppercase tracking-wider"
        style={{ gridTemplateColumns: COLUMNS, color: 'var(--text-5)', borderBottom: '1px solid var(--border-2)' }}
      >
        <span>Company / Org</span><span>Candidate / Role</span><span>Status</span><span>Applied</span><span>Next Step</span>
      </div>

      {applications.map((app, idx) => {
        const content = (
          <>
            <div className="flex items-center gap-2.5">
              <CompanyAvatar name={app.company} size="sm" />
              <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>{app.company}</span>
            </div>
            <span className="text-sm" style={{ color: 'var(--text-3)' }}>{app.role}</span>
            <span><StatusBadge status={app.status} /></span>
            <span className="text-xs" style={{ color: 'var(--text-4)' }}>{app.appliedDate || '—'}</span>
            <span className="text-xs" style={{ color: 'var(--text-5)' }}>{app.nextStep || '—'}</span>
          </>
        )

        if (onCardClick) {
          return (
            <div
              key={app.id}
              onClick={() => onCardClick(app)}
              className="grid px-5 py-4 transition-colors items-center cursor-pointer"
              style={{
                gridTemplateColumns: COLUMNS,
                borderBottom: idx < applications.length - 1 ? '1px solid var(--border-3)' : 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {content}
            </div>
          )
        }

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
            {content}
          </Link>
        )
      })}
    </div>
  )
}
