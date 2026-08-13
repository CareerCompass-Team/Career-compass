import { Link } from 'react-router-dom'
import { MapPin, Briefcase, Wallet, Clock, Heart, ShieldCheck, Globe } from 'lucide-react'
import CompanyAvatar from '../ui/CompanyAvatar'

export default function JobCard({ job, saved, applied, onToggleSave, style }) {
  const isVerified = job.isVerified ?? true
  const isRemote = job.location?.toLowerCase().includes('remote')

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-150 group hover-lift stagger-item relative overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)', ...style }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-1)')}
    >
      <div className="flex items-start justify-between gap-2">
        <CompanyAvatar name={job.company} size="lg" />
        <div className="flex flex-col items-end gap-1">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-lg"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}
          >
            {job.matchScore}% match
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1" style={{ background: isRemote ? 'rgba(59,130,246,0.1)' : 'rgba(124,58,237,0.1)', color: isRemote ? '#3b82f6' : '#7c3aed' }}>
            <Globe size={10} /> {isRemote ? 'Global Remote' : 'Kenya Local'}
          </span>
        </div>
      </div>

      <div>
        <div className="font-medium text-sm mb-0.5 flex items-center gap-1.5" style={{ color: 'var(--text-1)' }}>
          {job.title}
          {isVerified && (
            <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-semibold" title="Anti-Scam Verified Posting">
              <ShieldCheck size={12} /> Verified
            </span>
          )}
        </div>
        <div className="text-xs" style={{ color: 'var(--text-4)' }}>{job.company}</div>
      </div>

      <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: 'var(--text-4)' }}>
        <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
        <span className="flex items-center gap-1"><Briefcase size={12} />{job.type}</span>
      </div>

      {job.salary && (
        <div className="text-xs flex items-center gap-1 font-medium" style={{ color: 'var(--text-2)' }}>
          <Wallet size={12} className="text-emerald-500" />{job.salary}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 4).map(skill => (
          <span
            key={skill}
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{ background: 'var(--accent-bg-subtle)', color: 'var(--text-3)' }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--border-3)' }}>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-5)' }}>
          <span>Posted {job.postedDate}</span>
          <span style={{ color: applied ? 'var(--text-5)' : '#ef4444', fontWeight: 500 }} className="flex items-center gap-1">
            <Clock size={11} />Deadline {job.deadline}
          </span>
        </div>
        <button
          onClick={e => { e.preventDefault(); onToggleSave(job.id) }}
          className="text-xs px-2.5 py-1 rounded-lg transition-colors press-scale flex items-center gap-1"
          style={{
            color: saved ? 'var(--accent-text)' : 'var(--text-4)',
            background: saved ? 'var(--accent-bg)' : 'transparent',
          }}
        >
          <Heart size={12} fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      {applied && (
        <div
          className="text-xs px-2 py-1 rounded-lg text-center font-medium"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}
        >
          ✓ Application Submitted
        </div>
      )}
    </Link>
  )
}

