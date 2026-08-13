import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Video, Users, CheckCheck, Mic } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import ProgressBar from '../components/ui/ProgressBar'
import StarRating from '../components/ui/StarRating'
import StatusBadge from '../components/domain/StatusBadge'
import { INTERVIEW_RESULTS } from '../lib/status'

export default function InterviewDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { interviews, togglePrepNote, updateInterviewNotes, setSelfAssessment, completeInterview } = useAppData()
  const iv = interviews.find(x => x.id === id)
  const [notesDraft, setNotesDraft] = useState(iv?.notes ?? '')

  if (!iv) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Interview not found. <Link to="/interviews" style={{ color: 'var(--accent)' }}>Back to Interviews</Link>
      </div>
    )
  }

  const checkedCount = iv.prepNotes.filter(p => p.checked).length
  const prepProgress = iv.prepNotes.length ? (checkedCount / iv.prepNotes.length) * 100 : 0

  const handleComplete = result => {
    updateInterviewNotes(iv.id, notesDraft)
    completeInterview(iv.id, result)
    navigate(`/applications/${iv.applicationId}`)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
      <Link to="/interviews" className="inline-flex items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--accent)' }}>
        <ArrowLeft size={14} />Back to Interviews
      </Link>

      <div className="rounded-xl p-6 mb-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <CompanyAvatar name={iv.company} size="lg" />
            <div>
              <h1 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{iv.round}</h1>
              <div className="text-sm font-medium mb-2" style={{ color: 'var(--accent-text)' }}>{iv.company} — {iv.role}</div>
              <div className="text-xs" style={{ color: 'var(--text-4)' }}>{iv.date} {iv.time && `· ${iv.time}`}</div>
            </div>
          </div>
          <StatusBadge status={iv.status} kind="interview" />
        </div>
        {iv.meetingLink && (
          <a
            href={iv.meetingLink}
            className="mt-4 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium press-scale"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            <Video size={14} />Join meeting
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 flex flex-col gap-5">
          {iv.status === 'Upcoming' && iv.prepNotes.length > 0 && (
            <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-5)' }}>Prep Checklist</h2>
                <span className="text-xs font-mono" style={{ color: 'var(--text-5)' }}>{checkedCount}/{iv.prepNotes.length}</span>
              </div>
              <div className="mb-4"><ProgressBar value={prepProgress} color="#10b981" /></div>
              <div className="flex flex-col gap-2">
                {iv.prepNotes.map(p => (
                  <label
                    key={p.id}
                    className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors"
                    style={{ background: 'var(--surface-hover)' }}
                  >
                    <input
                      type="checkbox"
                      checked={p.checked}
                      onChange={() => togglePrepNote(iv.id, p.id)}
                      className="accent-[var(--accent)]"
                    />
                    <span
                      key={p.checked}
                      className={p.checked ? 'animate-checkPop' : ''}
                      style={{ color: p.checked ? 'var(--text-5)' : 'var(--text-2)', textDecoration: p.checked ? 'line-through' : 'none' }}
                    >
                      {p.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {iv.questions.length > 0 && (
            <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-5)' }}>Questions Asked</h2>
              <ul className="flex flex-col gap-2">
                {iv.questions.map((q, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-3)' }}>
                    <span style={{ color: 'var(--accent)' }}>{i + 1}.</span>{q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-5)' }}>Notes</h2>
            <textarea
              value={notesDraft}
              onChange={e => setNotesDraft(e.target.value)}
              onBlur={() => updateInterviewNotes(iv.id, notesDraft)}
              rows={4}
              placeholder="How did it go? What would you do differently?"
              className="w-full text-sm rounded-lg p-3 outline-none resize-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
            />
          </div>

          {iv.status === 'Upcoming' && (
            <Link
              to={`/interviews/${iv.id}/practice`}
              className="rounded-xl p-5 flex items-center gap-3 transition-all hover-lift"
              style={{ background: 'var(--accent-bg-subtle)', border: '1px solid var(--border-1)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                <Mic size={18} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>Practice for this interview</div>
                <div className="text-xs" style={{ color: 'var(--text-4)' }}>Flashcard-style practice questions</div>
              </div>
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {iv.interviewers.length > 0 && (
            <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: 'var(--text-5)' }}>
                <Users size={13} />Interviewers
              </h2>
              <div className="flex flex-col gap-2">
                {iv.interviewers.map(name => (
                  <div key={name} className="text-sm" style={{ color: 'var(--text-3)' }}>{name}</div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-5)' }}>Self-Assessment</h2>
            <div className="flex flex-col gap-3">
              {['technical', 'communication', 'confidence'].map(key => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize" style={{ color: 'var(--text-3)' }}>{key}</span>
                  <StarRating value={iv.selfAssessment[key]} onChange={v => setSelfAssessment(iv.id, key, v)} />
                </div>
              ))}
            </div>
          </div>

          {iv.status === 'Upcoming' && (
            <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: 'var(--text-5)' }}>
                <CheckCheck size={13} />Mark Complete
              </h2>
              <div className="flex flex-col gap-2">
                {INTERVIEW_RESULTS.map(r => (
                  <button
                    key={r}
                    onClick={() => handleComplete(r)}
                    className="text-xs px-3 py-2 rounded-lg text-left transition-colors press-scale"
                    style={{ background: 'var(--surface-hover)', color: 'var(--text-3)' }}
                  >
                    {r === 'Offer' ? 'Result: Offer received' : r === 'Not Selected' ? 'Result: Not selected' : 'Still waiting to hear back'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
