import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Bookmark, BookmarkMinus, ExternalLink } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import DetailList from '../components/ui/DetailList'

export default function JobDetails() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { jobs, applications, applyToJob, toggleJobSaved } = useApplications()
  const job = jobs.find(item => item.id === jobId)
  const application = applications.find(item => item.jobId === jobId)
  const [savedNote, setSavedNote] = useState('')

  if (!job) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Job not found. <Link to="/jobs" style={{ color: 'var(--accent)' }}>Back to jobs</Link>
      </div>
    )
  }

  const isInternal = job.jobLink?.startsWith('/')
  const hasApplication = Boolean(application)
  const applicationState = application?.status ?? 'Not applied yet'
  const isSaved = Boolean(job.saved)

  const handleApply = () => {
    applyToJob(job.id)
    if (!isInternal && job.jobLink) {
      window.open(job.jobLink, '_blank', 'noreferrer')
      return
    }
    if (isInternal && job.jobLink !== window.location.pathname) {
      navigate(job.jobLink)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
            {job.title}
          </h1>
          <div className="text-sm" style={{ color: 'var(--text-4)' }}>
            {job.company} • {job.location}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--accent)', color: 'white' }}
            onClick={handleApply}
          >
            {hasApplication ? 'Update application' : 'Apply now'}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: isSaved ? 'var(--surface-faint)' : 'var(--accent-bg)',
              color: isSaved ? 'var(--text-2)' : 'var(--accent-text)',
              border: '1px solid var(--border-2)',
            }}
            onClick={() => toggleJobSaved(job.id)}
          >
            {isSaved ? <BookmarkMinus size={16} /> : <Bookmark size={16} />}
            {isSaved ? 'Saved' : 'Save role'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
              Job description
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-4)' }}>
              {job.description}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-5)' }}>
                  Responsibilities
                </h3>
                <ul className="list-disc pl-4 text-sm" style={{ color: 'var(--text-3)' }}>
                  {job.responsibilities.map(task => <li key={task}>{task}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-5)' }}>
                  Requirements
                </h3>
                <ul className="list-disc pl-4 text-sm" style={{ color: 'var(--text-3)' }}>
                  {job.requirements.map(req => <li key={req}>{req}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
              Application status
            </h2>
            <div className="text-sm" style={{ color: 'var(--text-3)' }}>
              {application ? (
                <>
                  <div className="mb-2">Current state: <strong>{application.status}</strong></div>
                  <div className="mb-2">Next step: {application.nextStep || 'Pending'}</div>
                  <div className="mb-2">Applied on: {application.appliedDate || '—'}</div>
                  <Link to={`/applications/${application.id}`} className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    View application details
                  </Link>
                </>
              ) : (
                <div>Not applied yet. Use the button above to apply and track this role from your dashboard.</div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
              Role details
            </h2>
            <DetailList
              items={[
                { label: 'Company', value: job.company },
                { label: 'Location', value: job.location },
                { label: 'Type', value: job.type },
                { label: 'Salary', value: job.salary },
                { label: 'Deadline', value: job.deadline },
              ]}
            />
          </div>

          <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
              Quick link
            </h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: 'var(--surface-faint)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
              onClick={() => {
                if (!job.jobLink) return
                if (isInternal) {
                  navigate(job.jobLink)
                } else {
                  window.open(job.jobLink, '_blank', 'noreferrer')
                }
              }}
            >
              <ExternalLink size={14} />
              {isInternal ? 'Open full details' : 'Open company application page'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
