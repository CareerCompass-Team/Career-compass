import { Link } from 'react-router-dom'
import { Briefcase, CalendarClock, Hourglass, Trophy, ArrowRight } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { useTheme } from '../context/ThemeContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import StatusBadge from '../components/domain/StatusBadge'
import JobCard from '../components/domain/JobCard'

export default function Dashboard() {
  const { profile, applications, interviews, jobs, toggleSaveJob } = useAppData()
  const { theme, toggle } = useTheme()

  const pending = applications.filter(a => ['Applied', 'Screening', 'Interview', 'Final Stage'].includes(a.status)).length
  const offers = applications.filter(a => a.status === 'Offer' || a.status === 'Accepted').length
  const upcomingInterviews = interviews.filter(iv => iv.status === 'Upcoming')
  const appliedJobIds = new Set(applications.map(a => a.jobId))
  const topMatches = [...jobs].filter(j => !appliedJobIds.has(j.id)).sort((a, b) => b.matchScore - a.matchScore).slice(0, 2)
  const recentApplications = [...applications].slice(0, 4)

  const stats = [
    { label: 'Applications', value: applications.length, icon: Briefcase, color: '#3b82f6' },
    { label: 'Interviews', value: interviews.length, icon: CalendarClock, color: '#f59e0b' },
    { label: 'Pending', value: pending, icon: Hourglass, color: 'var(--accent)' },
    { label: 'Offers', value: offers, icon: Trophy, color: '#10b981' },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
            Welcome back, {profile.name.split(String.fromCharCode(32))[0]}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>Here’s where your search stands today.</p>
        </div>
        <button
          onClick={toggle}
          className="text-xs px-3 py-2 rounded-lg press-scale"
          style={{ border: '1px solid var(--border-1)', color: 'var(--text-4)' }}
        >
          {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }, i) => (
          <div
            key={label}
            className="rounded-xl p-5 stagger-item hover-lift"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)', animationDelay: `${i * 0.06}s` }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}1a`, color }}>
              <Icon size={16} strokeWidth={2} />
            </div>
            <div className="font-display text-2xl font-semibold mb-0.5 animate-countUp" style={{ color: 'var(--text-1)' }}>{value}</div>
            <div className="text-xs" style={{ color: 'var(--text-4)' }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {/* Recent applications */}
        <div className="md:col-span-2 rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Recent Applications</h2>
            <Link to="/applications" className="text-xs flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              View all<ArrowRight size={12} />
            </Link>
          </div>
          {recentApplications.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-5)' }}>No applications yet.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {recentApplications.map((app, i) => (
                <Link
                  key={app.id}
                  to={`/applications/${app.id}`}
                  className="flex items-center gap-3 py-2.5 rounded-lg px-2 -mx-2 transition-colors stagger-item"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <CompanyAvatar name={app.company} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: 'var(--text-2)' }}>{app.company}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--text-5)' }}>{app.role}</div>
                  </div>
                  <StatusBadge status={app.status} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming interviews */}
        <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Upcoming Interviews</h2>
            <Link to="/interviews" className="text-xs" style={{ color: 'var(--accent)' }}>All</Link>
          </div>
          {upcomingInterviews.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-5)' }}>Nothing scheduled.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {upcomingInterviews.slice(0, 3).map((iv, i) => (
                <Link
                  key={iv.id}
                  to={`/interviews/${iv.id}`}
                  className="block rounded-lg p-3 transition-colors stagger-item"
                  style={{ background: 'var(--surface-hover)', animationDelay: `${i * 0.05}s` }}
                >
                  <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-2)' }}>{iv.company}</div>
                  <div className="text-xs" style={{ color: 'var(--text-5)' }}>{iv.round} — {iv.date}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top matches */}
      {topMatches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Top Job Matches</h2>
            <Link to="/jobs" className="text-xs flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              See more<ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {topMatches.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                saved={job.saved}
                applied={appliedJobIds.has(job.id)}
                onToggleSave={toggleSaveJob}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
