import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  MapPin, Briefcase, Wallet, Clock, Heart, CheckCircle2,
  ArrowLeft, ArrowRight, ExternalLink, Globe, ShieldCheck,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import ProgressBar from '../components/ui/ProgressBar'
import ApplyModal from '../components/ui/ApplyModal'

export default function JobDetails() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { jobs, applications, toggleSaveJob } = useAppData()

  const [showApplyModal, setShowApplyModal] = useState(false)

  const job = jobs.find(j => j.id === jobId)
  const existingApplication = applications.find(a => a.jobId === jobId)

  if (!job) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Job not found. <Link to="/jobs" style={{ color: 'var(--accent)' }}>Back to Jobs</Link>
      </div>
    )
  }

  // ── Determine apply mode ──────────────────────────────────────────
  // 'internal' → posted within CareerCompass → use in-app form
  // 'external' → fetched from live API → open applyUrl in new tab
  const isExternal = job.source === 'external' && job.applyUrl

  const handleApplyClick = () => {
    if (isExternal) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer')
    } else {
      setShowApplyModal(true)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--accent)' }}>
        <ArrowLeft size={14} />Back to Jobs
      </Link>

      {/* ── Job Header Card ── */}
      <div className="rounded-xl p-6 mb-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <CompanyAvatar name={job.company} size="lg" />
            <div>
              <h1 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{job.title}</h1>
              <div className="text-sm font-medium mb-3" style={{ color: 'var(--accent-text)' }}>{job.company}</div>
              <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: 'var(--text-4)' }}>
                <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={13} />{job.type}</span>
                <span className="flex items-center gap-1"><Wallet size={13} />{job.salary}</span>
                {job.deadline !== 'Open' && (
                  <span className="flex items-center gap-1" style={{ color: '#ef4444' }}>
                    <Clock size={13} />Deadline {job.deadline}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Match score + source badges */}
          <div className="text-right shrink-0 flex flex-col gap-2 items-end">
            {job.matchScore && (
              <>
                <div className="font-mono text-sm font-medium" style={{ color: '#10b981' }}>{job.matchScore}% match</div>
                <div className="w-28"><ProgressBar value={job.matchScore} color="#10b981" /></div>
              </>
            )}
            {/* Show source badge */}
            {isExternal ? (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1"
                style={{ background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)', color: '#60a5fa' }}
              >
                <Globe size={10} /> External Listing
              </span>
            ) : (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1"
                style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)', color: '#34d399' }}
              >
                <ShieldCheck size={10} /> CareerCompass Verified
              </span>
            )}
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-3 mt-5 pt-5" style={{ borderTop: '1px solid var(--border-3)' }}>
          {existingApplication && existingApplication.status !== 'Saved' && !isExternal ? (
            <Link
              to={`/applications/${existingApplication.id}`}
              className="text-sm px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 press-scale"
              style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}
            >
              <CheckCircle2 size={16} />Applied — view application
            </Link>
          ) : (
            <button
              onClick={handleApplyClick}
              className="text-sm px-5 py-2.5 rounded-xl font-medium press-scale flex items-center gap-2"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              {isExternal ? (
                <><ExternalLink size={15} />Apply on {job.company}'s site</>
              ) : (
                <>Apply Now (Submit Application)</>
              )}
            </button>
          )}

          <button
            onClick={() => toggleSaveJob(job.id)}
            className="text-sm px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 press-scale"
            style={{
              color: job.saved ? 'var(--accent-text)' : 'var(--text-3)',
              background: job.saved ? 'var(--accent-bg)' : 'transparent',
              border: '1px solid var(--border-1)',
            }}
          >
            <Heart size={14} fill={job.saved ? 'currentColor' : 'none'} />
            {job.saved ? 'Saved' : 'Save for later'}
          </button>

          {/* External link hint */}
          {isExternal && (
            <span className="text-xs ml-auto" style={{ color: 'var(--text-5)' }}>
              Opens company careers page in a new tab
            </span>
          )}
        </div>
      </div>

      {/* ── External listing info banner ── */}
      {isExternal && (
        <div
          className="rounded-xl p-4 mb-5 flex items-center gap-3 text-xs border"
          style={{ background: 'rgba(59,130,246,0.06)', borderColor: 'rgba(59,130,246,0.2)', color: 'var(--text-3)' }}
        >
          <Globe size={16} className="text-blue-400 shrink-0" />
          <div>
            <strong style={{ color: 'var(--text-2)' }}>External Listing</strong> — this role was sourced from a public job board.
            Clicking Apply will take you directly to the company's own careers page in a new tab.{' '}
            <span style={{ color: '#f59e0b' }}>We recommend reading the full job description there before submitting.</span>
          </div>
        </div>
      )}

      {/* ── Job Content ── */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 flex flex-col gap-5">
          <Section title="About the role">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{job.description}</p>
          </Section>
          {job.responsibilities?.length > 0 && (
            <Section title="Responsibilities">
              <ul className="flex flex-col gap-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-3)' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span>{r}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {job.requirements?.length > 0 && (
            <Section title="Requirements"><TagList items={job.requirements} /></Section>
          )}
          {job.preferred?.length > 0 && (
            <Section title="Preferred"><TagList items={job.preferred} muted /></Section>
          )}
          {/* External: direct link button */}
          {isExternal && (
            <Section title="Apply Externally">
              <p className="text-xs mb-3" style={{ color: 'var(--text-4)' }}>
                This listing is hosted by the employer directly.
              </p>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm px-4 py-2.5 rounded-xl font-medium press-scale flex items-center justify-center gap-2 text-white"
                style={{ background: 'var(--accent)', display: 'flex' }}
              >
                <ExternalLink size={14} />
                Open Application Page <ArrowRight size={13} />
              </a>
            </Section>
          )}
        </div>
      </div>

      {/* ── In-App Apply Modal (internal listings only) ── */}
      <ApplyModal
        isOpen={showApplyModal && !isExternal}
        onClose={() => setShowApplyModal(false)}
        job={job}
        existingApp={existingApplication}
        onSuccess={(newAppId) => navigate(`/applications/${newAppId}`)}
      />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
      <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-5)' }}>{title}</h2>
      {children}
    </div>
  )
}

function TagList({ items, muted }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(item => (
        <span
          key={item}
          className="font-mono text-xs px-2 py-1 rounded"
          style={{
            background: muted ? 'var(--surface-very-faint)' : 'var(--accent-bg-subtle)',
            color: muted ? 'var(--text-5)' : 'var(--text-3)',
          }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
