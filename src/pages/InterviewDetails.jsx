import { Link, useParams, useNavigate } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext'
import { ArrowLeft, Film, LayoutList, MessageCircle, CalendarDays, Clock, Video, ArrowRight } from 'lucide-react'

export default function InterviewDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { interviews, applications } = useApplications()
  const interview = interviews.find(item => item.id === id)
  const application = applications.find(app => app.id === interview?.applicationId)

  if (!interview) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Interview not found. <Link to="/interviews" style={{ color: 'var(--accent)' }}>Back to interviews</Link>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-3 mb-6 text-sm" style={{ color: 'var(--text-5)' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: 'var(--accent)' }}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <span>/</span>
        <Link to="/applications" style={{ color: 'var(--accent)' }}>Applications</Link>
      </div>

      <div className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--accent-text)' }}>
              Interview details
            </p>
            <h1 className="font-display text-2xl font-semibold mt-1" style={{ color: 'var(--text-1)' }}>
              {interview.round} with {interview.company}
            </h1>
            <div className="text-sm" style={{ color: 'var(--text-4)' }}>
              {interview.role}
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--surface-faint)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
            onClick={() => navigate(`/interviews/${interview.id}/practice`)}
          >
            <Film size={16} />
            Practice
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <section className="rounded-3xl p-6" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-2)' }}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                Summary
              </h2>
              <div className="grid gap-3 text-sm" style={{ color: 'var(--text-3)' }}>
                <div className="flex items-center gap-2"><LayoutList size={16} /> <strong>Company:</strong> {interview.company}</div>
                <div className="flex items-center gap-2"><CalendarDays size={16} /> <strong>Date:</strong> {interview.date}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> <strong>Time:</strong> {interview.time}</div>
                <div className="flex items-center gap-2"><MessageCircle size={16} /> <strong>Type:</strong> {interview.type}</div>
                <div className="flex items-center gap-2"><Film size={16} /> <strong>Round:</strong> {interview.round}</div>
                <div className="text-sm" style={{ color: 'var(--text-5)' }}><strong>Status:</strong> {interview.status}</div>
              </div>
            </section>

            <section className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                Questions to practice
              </h2>
              {interview.questions.length > 0 ? (
                <ol className="list-decimal pl-5 space-y-3 text-sm" style={{ color: 'var(--text-3)' }}>
                  {interview.questions.map(question => <li key={question}>{question}</li>)}
                </ol>
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-4)' }}>
                  There are no practice questions yet. Add your own as you prepare.
                </p>
              )}
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                Notes & prep
              </h3>
              {interview.notes ? (
                <p className="text-sm" style={{ color: 'var(--text-3)' }}>
                  {interview.notes}
                </p>
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-4)' }}>
                  No interview notes yet. Fill this in after the call.
                </p>
              )}
            </section>

            {interview.meetingLink && (
              <section className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                  Join link
                </h3>
                <a
                  href={interview.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  <Video size={16} />
                  Join meeting
                </a>
              </section>
            )}

            {application && (
              <section className="rounded-3xl p-6" style={{ background: 'var(--surface-very-faint)', border: '1px solid var(--border-2)' }}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                  Related application
                </h3>
                <div className="text-sm" style={{ color: 'var(--text-3)' }}>
                  <div>{application.role}</div>
                  <div className="text-sm" style={{ color: 'var(--text-5)' }}>{application.status}</div>
                </div>
                <Link
                  to={`/applications/${application.id}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
                  style={{ background: 'var(--surface-faint)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
                >
                  <ArrowRight size={16} />
                  View application
                </Link>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
