import { Link } from 'react-router-dom'
import { ChevronRight, Clock, MapPin, ExternalLink, CalendarClock } from 'lucide-react'
import CompanyAvatar from '../ui/CompanyAvatar'
import StatusBadge from './StatusBadge'

const COLUMNS = '1.2fr 1.2fr 130px 120px 1.5fr 80px'

export default function ApplicationList({ applications, onCardClick }) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
      {/* Table Header */}
      <div
        className="grid px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider border-b"
        style={{ gridTemplateColumns: COLUMNS, color: 'var(--text-4)', borderColor: 'var(--border-2)', background: 'var(--surface-hover)' }}
      >
        <span>Company / Org</span>
        <span>Role Title</span>
        <span>Current Status</span>
        <span>Applied / Saved</span>
        <span>Next Step / Milestone</span>
        <span className="text-right">Action</span>
      </div>

      {/* Table Rows */}
      {applications.map((app, idx) => {
        const isSaved = app.status === 'Saved'
        const content = (
          <>
            <div className="flex items-center gap-3 min-w-0">
              <CompanyAvatar name={app.company} size="sm" />
              <div className="min-w-0">
                <div className="text-xs font-bold truncate" style={{ color: 'var(--text-1)' }}>{app.company}</div>
                <div className="text-[10px] flex items-center gap-1" style={{ color: 'var(--text-5)' }}>
                  <MapPin size={10} />{app.location || 'Remote'}
                </div>
              </div>
            </div>

            <div className="text-xs font-medium truncate" style={{ color: 'var(--accent-text)' }}>
              {app.role}
            </div>

            <div>
              <StatusBadge status={app.status} showDot />
            </div>

            <div className="text-xs font-mono" style={{ color: 'var(--text-4)' }}>
              {app.appliedDate ? app.appliedDate : isSaved ? 'Saved Wishlist' : 'Active'}
            </div>

            <div className="text-xs truncate flex items-center gap-1" style={{ color: 'var(--text-3)' }}>
              {app.nextStep ? (
                <>
                  <Clock size={12} className="text-amber-400 shrink-0" />
                  <span className="truncate">{app.nextStep}</span>
                </>
              ) : (
                <span style={{ color: 'var(--text-5)' }}>No pending action</span>
              )}
            </div>

            <div className="text-right">
              <span
                className="text-xs font-medium inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                style={{ color: 'var(--accent)' }}
              >
                View <ChevronRight size={13} />
              </span>
            </div>
          </>
        )

        if (onCardClick) {
          return (
            <div
              key={app.id}
              onClick={() => onCardClick(app)}
              className="grid px-5 py-3.5 transition-colors items-center cursor-pointer group"
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
            to={isSaved ? `/jobs/${app.jobId}` : app.status === 'Offer' ? `/applications/${app.id}/offer` : `/applications/${app.id}`}
            className="grid px-5 py-3.5 transition-colors items-center group"
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
