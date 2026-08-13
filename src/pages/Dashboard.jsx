import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase, CalendarClock, Hourglass, Trophy, ArrowRight,
  PartyPopper, ChevronRight, CheckCircle2, Video, Sparkles,
  ExternalLink, Clock, ShieldCheck, Flame, PlayCircle, Eye,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { useTheme } from '../context/ThemeContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import StatusBadge from '../components/domain/StatusBadge'
import JobCard from '../components/domain/JobCard'
import Celebration from '../components/ui/Celebration'

// Stage progression sequence for visual steppers
const STAGE_STEPS = ['Applied', 'Screening', 'Interview', 'Final Stage', 'Offer', 'Accepted']

export default function Dashboard() {
  const navigate = useNavigate()
  const {
    profile, applications, interviews, jobs,
    toggleSaveJob, acceptOffer, updateApplicationStatus,
  } = useAppData()
  const { theme, toggle } = useTheme()

  const [celebrating, setCelebrating] = useState(false)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'active' | 'offers'

  // Metric counts
  const pending = applications.filter(a => ['Applied', 'Screening', 'Interview', 'Final Stage'].includes(a.status)).length
  const offers = applications.filter(a => a.status === 'Offer' || a.status === 'Accepted').length
  const upcomingInterviews = interviews.filter(iv => iv.status === 'Upcoming')
  const appliedJobIds = new Set(applications.map(a => a.jobId))
  const topMatches = [...jobs].filter(j => !appliedJobIds.has(j.id)).sort((a, b) => b.matchScore - a.matchScore).slice(0, 2)

  // Active offers for prominent banner
  const activeOffers = applications.filter(a => a.status === 'Offer')

  // Filtered application list for stage tracker
  const displayedApplications = applications.filter(a => {
    if (activeTab === 'active') return ['Applied', 'Screening', 'Interview', 'Final Stage'].includes(a.status)
    if (activeTab === 'offers') return ['Offer', 'Accepted'].includes(a.status)
    return true
  })

  // Combine and sort all recent application timeline events for the Activity Stream
  const activityStream = applications
    .flatMap(app => (app.timeline || []).map(evt => ({ ...evt, app })))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 5)

  const handleAcceptOffer = (appId) => {
    acceptOffer(appId)
    setCelebrating(true)
    setTimeout(() => setCelebrating(false), 1600)
  }

  const stats = [
    { label: 'Applications Submitted', value: applications.length, icon: Briefcase, color: '#3b82f6' },
    { label: 'Interviews Scheduled', value: interviews.length, icon: CalendarClock, color: '#f59e0b' },
    { label: 'Active Pipeline', value: pending, icon: Hourglass, color: 'var(--accent)' },
    { label: 'Job Offers & Wins', value: offers, icon: Trophy, color: '#10b981' },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn relative">
      {celebrating && <Celebration />}

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
            Welcome back, {profile?.name ? profile.name.split(' ')[0] : 'Job Seeker'} 👋
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            Here is your live application pipeline and interview schedule overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs px-3.5 py-2 rounded-xl press-scale font-medium transition-colors"
            style={{ border: '1px solid var(--border-1)', color: 'var(--text-3)', background: 'var(--bg-card)' }}
          >
            {theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode'}
          </button>
          <Link
            to="/jobs"
            className="text-xs px-4 py-2.5 rounded-xl font-semibold text-white press-scale flex items-center gap-1.5"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
          >
            <Sparkles size={14} /> Find New Opportunities
          </Link>
        </div>
      </div>

      {/* ── Active Job Offer Banner ── */}
      {activeOffers.length > 0 && (
        <div
          className="rounded-2xl p-5 mb-8 border relative overflow-hidden animate-celebrate shadow-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25))',
            borderColor: 'rgba(16, 185, 129, 0.4)',
          }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow">
                <PartyPopper size={24} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                  Congratulations! Active Job Offer
                </div>
                <h3 className="font-display font-semibold text-base" style={{ color: 'var(--text-1)' }}>
                  {activeOffers[0].company} — {activeOffers[0].role}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                  Next step: {activeOffers[0].nextStep || 'Review terms and accept your offer'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAcceptOffer(activeOffers[0].id)}
                className="text-xs px-5 py-2.5 rounded-xl font-bold text-white press-scale flex items-center gap-1.5 shadow"
                style={{ background: '#10b981' }}
              >
                <CheckCircle2 size={15} /> Accept Offer Now
              </button>
              <Link
                to={`/applications/${activeOffers[0].id}`}
                className="text-xs px-4 py-2.5 rounded-xl font-medium press-scale border"
                style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: 'var(--text-1)', background: 'var(--bg-card)' }}
              >
                View Offer Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }, i) => (
          <div
            key={label}
            className="rounded-xl p-5 stagger-item hover-lift transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)', animationDelay: `${i * 0.06}s` }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}1a`, color }}>
              <Icon size={16} strokeWidth={2} />
            </div>
            <div className="font-display text-2xl font-semibold mb-0.5 animate-countUp" style={{ color: 'var(--text-1)' }}>
              {value}
            </div>
            <div className="text-xs font-medium" style={{ color: 'var(--text-4)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Main Application Journey & Stage Visibility Board ── */}
      <div className="rounded-xl p-6 mb-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-1)' }}>
              Application Stage Tracker & Next Steps
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>
              Track exactly where every application stands in the recruitment pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex rounded-lg overflow-hidden p-0.5" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-1)' }}>
              {[
                { id: 'all', label: `All (${applications.length})` },
                { id: 'active', label: `In Progress (${pending})` },
                { id: 'offers', label: `Offers (${offers})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
                  style={{
                    background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--text-1)' : 'var(--text-4)',
                    boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Link to="/applications" className="text-xs font-semibold flex items-center gap-1 ml-2" style={{ color: 'var(--accent)' }}>
              View Kanban Board <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {displayedApplications.length === 0 ? (
          <div className="rounded-xl p-8 text-center border border-dashed" style={{ borderColor: 'var(--border-2)' }}>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>No applications match this view filter.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayedApplications.map((app) => {
              const currentStageIdx = STAGE_STEPS.indexOf(app.status)
              const isRejected = app.status === 'Not Selected'
              const isAccepted = app.status === 'Accepted'
              const nextStatus = !isRejected && !isAccepted && currentStageIdx >= 0 && currentStageIdx < STAGE_STEPS.length - 1
                ? STAGE_STEPS[currentStageIdx + 1]
                : null

              return (
                <div
                  key={app.id}
                  className="rounded-xl p-4 transition-all border hover:border-violet-500/40"
                  style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}
                >
                  {/* App Header info */}
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-center gap-3">
                      <CompanyAvatar name={app.company} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/applications/${app.id}`}
                            className="font-medium text-sm hover:underline"
                            style={{ color: 'var(--text-1)' }}
                          >
                            {app.company}
                          </Link>
                          <StatusBadge status={app.status} showDot />
                        </div>
                        <div className="text-xs mt-0.5 flex items-center gap-2" style={{ color: 'var(--text-4)' }}>
                          <span>{app.role}</span>
                          <span>•</span>
                          <span>Applied {app.appliedDate || 'Recently'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex items-center gap-2">
                      {app.status === 'Offer' ? (
                        <button
                          onClick={() => handleAcceptOffer(app.id)}
                          className="text-xs px-3.5 py-1.5 rounded-lg font-bold text-white press-scale flex items-center gap-1"
                          style={{ background: '#10b981' }}
                        >
                          <PartyPopper size={13} /> Accept Offer
                        </button>
                      ) : nextStatus ? (
                        <button
                          onClick={() => updateApplicationStatus(app.id, nextStatus, `Advanced to ${nextStatus}`)}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium press-scale flex items-center gap-1"
                          style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)', border: '1px solid var(--border-2)' }}
                        >
                          Advance to {nextStatus} <ChevronRight size={12} />
                        </button>
                      ) : null}

                      <Link
                        to={`/applications/${app.id}`}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium press-scale flex items-center gap-1"
                        style={{ background: 'var(--surface-hover)', color: 'var(--text-3)', border: '1px solid var(--border-1)' }}
                      >
                        <Eye size={13} /> Details
                      </Link>
                    </div>
                  </div>

                  {/* Visual Stage Stepper */}
                  {!isRejected && (
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-3)' }}>
                      <div className="flex items-center justify-between relative">
                        {/* Connecting line */}
                        <div
                          className="absolute top-2.5 left-4 right-4 h-0.5 -z-0"
                          style={{ background: 'var(--border-2)' }}
                        />

                        {STAGE_STEPS.map((step, idx) => {
                          const isPassed = currentStageIdx >= idx
                          const isCurrent = app.status === step

                          return (
                            <div key={step} className="flex flex-col items-center relative z-10">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all"
                                style={{
                                  background: isCurrent
                                    ? 'var(--accent)'
                                    : isPassed
                                    ? '#10b981'
                                    : 'var(--bg-card)',
                                  color: isPassed || isCurrent ? 'white' : 'var(--text-5)',
                                  border: isPassed || isCurrent ? 'none' : '2px solid var(--border-2)',
                                  boxShadow: isCurrent ? '0 0 0 3px var(--accent-bg)' : 'none',
                                }}
                              >
                                {isPassed && !isCurrent ? '✓' : idx + 1}
                              </div>
                              <span
                                className="text-[10px] mt-1 font-medium transition-colors text-center"
                                style={{
                                  color: isCurrent
                                    ? 'var(--accent-text)'
                                    : isPassed
                                    ? 'var(--text-2)'
                                    : 'var(--text-5)',
                                  fontWeight: isCurrent ? 700 : 500,
                                }}
                              >
                                {step}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Next Step / Latest Timeline callout */}
                  {app.nextStep && (
                    <div className="mt-3 text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg" style={{ background: 'var(--surface-hover)', color: 'var(--text-3)' }}>
                      <Clock size={13} className="text-amber-400 shrink-0" />
                      <span><strong>Next Action:</strong> {app.nextStep}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Bottom Grid: Upcoming Interviews & Activity Stream ── */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Upcoming Interviews Widget */}
        <div className="rounded-xl p-6 flex flex-col justify-between" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <CalendarClock size={16} className="text-amber-400" /> Upcoming Interviews
              </h2>
              <Link to="/interviews" className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>View All</Link>
            </div>

            {upcomingInterviews.length === 0 ? (
              <div className="text-center py-8">
                <CalendarClock size={32} className="mx-auto mb-2 text-slate-500 opacity-40" />
                <p className="text-xs" style={{ color: 'var(--text-5)' }}>No interviews scheduled right now.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {upcomingInterviews.slice(0, 3).map((iv) => (
                  <div
                    key={iv.id}
                    className="rounded-xl p-3.5 border transition-all hover:border-amber-500/40"
                    style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{iv.company}</div>
                        <div className="text-xs font-medium" style={{ color: 'var(--accent-text)' }}>{iv.round}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                        {iv.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t" style={{ borderColor: 'var(--border-3)' }}>
                      <span className="flex items-center gap-1" style={{ color: 'var(--text-4)' }}>
                        <Video size={12} /> {iv.time || '10:00 AM'}
                      </span>
                      <Link
                        to={`/interviews/${iv.id}`}
                        className="text-xs font-medium flex items-center gap-1 hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        Prep & Join <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/interviews"
            className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-center block press-scale border"
            style={{ borderColor: 'var(--border-1)', color: 'var(--text-3)', background: 'var(--surface-hover)' }}
          >
            Practice AI Mock Interview →
          </Link>
        </div>

        {/* Live Timeline Activity Stream */}
        <div className="md:col-span-2 rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
              <Flame size={16} className="text-violet-400" /> Recent Application Milestones
            </h2>
            <span className="text-xs font-mono" style={{ color: 'var(--text-5)' }}>Live Stream</span>
          </div>

          {activityStream.length === 0 ? (
            <p className="text-xs py-6 text-center" style={{ color: 'var(--text-5)' }}>No timeline events logged yet.</p>
          ) : (
            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700/30">
              {activityStream.map((evt, idx) => (
                <div key={idx} className="flex items-start gap-3 relative pl-6">
                  <div
                    className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full border-2 bg-violet-500 shrink-0"
                    style={{ borderColor: 'var(--bg-card)' }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <Link to={`/applications/${evt.app.id}`} className="text-xs font-semibold hover:underline" style={{ color: 'var(--text-2)' }}>
                        {evt.app.company} — {evt.app.role}
                      </Link>
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-5)' }}>{evt.date}</span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>{evt.event}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Top Verified Job Matches ── */}
      {topMatches.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                Recommended Verified Roles for You
              </h2>
              <p className="text-xs" style={{ color: 'var(--text-5)' }}>Based on your skills & preferred locations</p>
            </div>
            <Link to="/jobs" className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              See All Jobs <ArrowRight size={13} />
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
