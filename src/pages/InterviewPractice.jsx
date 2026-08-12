import { Link, useParams } from 'react-router-dom'
import { useApplications } from '../context/ApplicationContext'
import { Film, ListChecks, MessageCircle } from 'lucide-react'

export default function InterviewPractice() {
  const { id } = useParams()
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
    <div className="p-8 max-w-5xl mx-auto animate-fadeIn">
      <div className="rounded-3xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--accent-text)' }}>
              Practice interview
            </p>
            <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--text-1)' }}>
              {interview.round} practice for {application?.company || interview.company}
            </h1>
          </div>
          <Link
            to={`/interviews/${interview.id}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: 'var(--surface-faint)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
          >
            <Film size={16} />
            Back to interview
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl p-6" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-2)' }}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                What to practice
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-4)' }}>
                Use this space to rehearse the conversation before the actual interview. Practice explaining your project experience, answer common questions clearly, and keep your examples specific.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--accent)' }}>
                    <ListChecks size={16} />
                    <span className="font-semibold text-sm">Focus areas</span>
                  </div>
                  <ul className="list-disc pl-4 text-sm" style={{ color: 'var(--text-3)' }}>
                    <li>Describe your role and impact clearly.</li>
                    <li>Use STAR stories for behavioral questions.</li>
                    <li>Explain technical decisions with confidence.</li>
                    <li>Keep answers concise and relevant.</li>
                  </ul>
                </div>
                <div className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--accent)' }}>
                    <MessageCircle size={16} />
                    <span className="font-semibold text-sm">Prepare responses</span>
                  </div>
                  <ul className="list-disc pl-4 text-sm" style={{ color: 'var(--text-3)' }}>
                    <li>Why this company?</li>
                    <li>What are your strengths in React and JavaScript?</li>
                    <li>How do you handle feedback and collaboration?</li>
                    <li>What would you build first in this role?</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                Practice questions
              </h2>
              {interview.questions.length > 0 ? (
                <ol className="list-decimal pl-5 space-y-3 text-sm" style={{ color: 'var(--text-3)' }}>
                  {interview.questions.map(question => (
                    <li key={question}>{question}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-4)' }}>
                  No targeted questions added yet. Use your notes from the role and company to create your own practice prompts.
                </p>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                Interview details
              </h3>
              <div className="text-sm text-slate-500 space-y-2">
                <div><strong>Company:</strong> {interview.company}</div>
                <div><strong>Role:</strong> {interview.role}</div>
                <div><strong>Date:</strong> {interview.date}</div>
                <div><strong>Time:</strong> {interview.time}</div>
                <div><strong>Type:</strong> {interview.type}</div>
                <div><strong>Round:</strong> {interview.round}</div>
                <div><strong>Status:</strong> {interview.status}</div>
              </div>
            </section>

            <section className="rounded-3xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-5)' }}>
                Your prep notes
              </h3>
              {interview.prepNotes.length > 0 ? (
                <ul className="space-y-3 text-sm" style={{ color: 'var(--text-3)' }}>
                  {interview.prepNotes.map(note => (
                    <li key={note.id} className="rounded-2xl p-3" style={{ background: 'var(--surface-very-faint)' }}>
                      {note.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-4)' }}>
                  Add a few prep bullets to keep your answers sharp.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
