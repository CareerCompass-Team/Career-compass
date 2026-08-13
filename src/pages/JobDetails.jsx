import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MapPin, Briefcase, Wallet, Clock, Heart, CheckCircle2, ArrowLeft } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import ProgressBar from '../components/ui/ProgressBar'
import Modal from '../components/ui/Modal'

export default function JobDetails() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { jobs, applications, resumes, toggleSaveJob, applyToJob } = useAppData()
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedResumeId, setSelectedResumeId] = useState(resumes.find(r => r.isDefault)?.id ?? resumes[0]?.id ?? null)

  const job = jobs.find(j => j.id === jobId)
  const existingApplication = applications.find(a => a.jobId === jobId)

  if (!job) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Job not found. <Link to="/jobs" style={{ color: 'var(--accent)' }}>Back to Jobs</Link>
      </div>
    )
  }

  const handleConfirmApply = () => {
    const resume = resumes.find(r => r.id === selectedResumeId)
    const newAppId = applyToJob(job.id, { resumeId: resume?.id ?? null, resumeName: resume?.name ?? null })
    setShowApplyModal(false)
    navigate(`/applications/${newAppId}`)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--accent)' }}>
        <ArrowLeft size={14} />Back to Jobs
      </Link>

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
                <span className="flex items-center gap-1" style={{ color: '#ef4444' }}><Clock size={13} />Deadline {job.deadline}</span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="font-mono text-sm font-medium mb-1" style={{ color: '#10b981' }}>{job.matchScore}% match</div>
            <div className="w-28"><ProgressBar value={job.matchScore} color="#10b981" /></div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5 pt-5" style={{ borderTop: '1px solid var(--border-3)' }}>
          {existingApplication ? (
            <Link
              to={`/applications/${existingApplication.id}`}
              className="text-sm px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 press-scale"
              style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}
            >
              <CheckCircle2 size={16} />Applied — view application
            </Link>
          ) : (
            <button
              onClick={() => setShowApplyModal(true)}
              className="text-sm px-5 py-2.5 rounded-xl font-medium press-scale"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              Apply Now
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
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 flex flex-col gap-5">
          <Section title="About the role"><p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{job.description}</p></Section>
          <Section title="Responsibilities">
            <ul className="flex flex-col gap-2">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-3)' }}>
                  <span style={{ color: 'var(--accent)' }}>•</span>{r}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="flex flex-col gap-5">
          <Section title="Requirements">
            <TagList items={job.requirements} />
          </Section>
          <Section title="Preferred">
            <TagList items={job.preferred} muted />
          </Section>
        </div>
      </div>

      {showApplyModal && (
        <Modal title={`Apply to ${job.company}`} onClose={() => setShowApplyModal(false)}>
          <p className="text-sm mb-4" style={{ color: 'var(--text-4)' }}>Choose which CV to submit with this application.</p>
          <div className="flex flex-col gap-2 mb-6">
            {resumes.length === 0 && (
              <p className="text-xs" style={{ color: 'var(--text-5)' }}>No CVs uploaded yet — you can still apply and attach one later.</p>
            )}
            {resumes.map(r => (
              <label
                key={r.id}
                className="flex items-center gap-3 text-sm px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
                style={{
                  background: selectedResumeId === r.id ? 'var(--accent-bg)' : 'var(--surface-hover)',
                  border: selectedResumeId === r.id ? '1px solid var(--border-1)' : '1px solid transparent',
                  color: 'var(--text-2)',
                }}
              >
                <input
                  type="radio"
                  name="resume"
                  checked={selectedResumeId === r.id}
                  onChange={() => setSelectedResumeId(r.id)}
                />
                {r.name} {r.isDefault && <span className="text-xs" style={{ color: 'var(--text-5)' }}>(default)</span>}
              </label>
            ))}
          </div>
          <button
            onClick={handleConfirmApply}
            className="w-full text-sm px-5 py-3 rounded-xl font-medium press-scale"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            Submit Application
          </button>
        </Modal>
      )}
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
