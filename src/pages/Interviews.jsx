import { Link } from 'react-router-dom'
import { ArrowRight, Video, CalendarDays } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'

export default function Interviews() {
  const { interviews } = useApplications()

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--text-1)' }}>
          Interviews
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-4)' }}>
          Track upcoming and completed interview sessions.
        </p>
      </div>

      <div className="grid gap-5">
        {interviews.map(interview => (
          <div
            key={interview.id}
            className="rounded-3xl p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--accent-text)' }}>{interview.company}</div>
                <h2 className="font-display text-xl font-semibold mt-1" style={{ color: 'var(--text-1)' }}>
                  {interview.role}
                </h2>
                <div className="text-sm" style={{ color: 'var(--text-4)' }}>
                  {interview.date} • {interview.time} • {interview.round} ({interview.type})
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {interview.meetingLink && (
                  <a
                    href={interview.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    <Video size={16} />
                    Join
                  </a>
                )}
                <Link
                  to={`/interviews/${interview.id}`}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{ background: 'var(--surface-faint)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
                >
                  <ArrowRight size={16} />
                  Details
                </Link>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 text-sm" style={{ color: 'var(--text-5)' }}>
              <CalendarDays size={14} />
              <span>Status: {interview.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
