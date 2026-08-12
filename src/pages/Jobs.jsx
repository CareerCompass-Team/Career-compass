import { useNavigate, Link } from 'react-router-dom'
import { Bookmark, BookmarkMinus, ExternalLink, MapPin } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'

export default function Jobs() {
  const navigate = useNavigate()
  const { jobs, applications, applyToJob, toggleJobSaved } = useApplications()

  const getApplicationStatus = jobId => {
    const app = applications.find(item => item.jobId === jobId)
    return app?.status
  }

  const handleApply = (job) => {
    applyToJob(job.id)
    if (job.jobLink && !job.jobLink.startsWith('/')) {
      window.open(job.jobLink, '_blank', 'noreferrer')
      return
    }
    if (job.jobLink) {
      navigate(job.jobLink)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex flex-col gap-3 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
            Discover jobs
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            Browse available roles and apply directly from the job page.
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {jobs.map(job => {
          const hasApplication = Boolean(applications.find(app => app.jobId === job.id))
          const isSaved = Boolean(job.saved)
          const isInternal = job.jobLink?.startsWith('/')
          const actionLabel = hasApplication ? 'Manage application' : 'Apply'

          return (
            <div
              key={job.id}
              className="rounded-3xl p-6 shadow-sm"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{job.type}</span>
                    <span className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--text-5)' }}>{job.location}</span>
                  </div>
                  <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--text-1)' }}>{job.title}</h2>
                  <div className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{job.company}</div>
                </div>

                <div className="flex items-center gap-2">
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
                    {isSaved ? 'Saved' : 'Save job'}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-4)' }}>
                {job.description}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-5)' }}>Responsibilities</div>
                  <ul className="list-disc pl-4 text-sm" style={{ color: 'var(--text-3)' }}>
                    {job.responsibilities.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--text-5)' }}>Requirements</div>
                  <ul className="list-disc pl-4 text-sm" style={{ color: 'var(--text-3)' }}>
                    {job.requirements.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm" style={{ color: 'var(--text-5)' }}>
                  <div>{job.salary}</div>
                  <div>Posted {job.postedDate}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--accent)', color: 'white' }}
                    onClick={() => handleApply(job)}
                  >
                    {actionLabel}
                  </button>
                  <Link
                    to={isInternal ? job.jobLink : '#'}
                    target={isInternal ? undefined : '_blank'}
                    rel={isInternal ? undefined : 'noreferrer'}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--surface-faint)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
                    onClick={e => {
                      if (!isInternal) {
                        e.preventDefault()
                        window.open(job.jobLink, '_blank', 'noreferrer')
                      }
                    }}
                  >
                    <ExternalLink size={14} />
                    {isInternal ? 'View role' : 'Open listing'}
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
