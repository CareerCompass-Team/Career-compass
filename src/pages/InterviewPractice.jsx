import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, RotateCw, ArrowRight, CheckCircle2, Mic, MicOff, Sparkles, Calendar, Award } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/ui/Modal'

const COMPANY_DECKS = {
  general: [
    { q: 'Tell me about yourself.', tip: 'Structure: 60s background → Key strengths → Why this specific role.' },
    { q: 'Describe a time you faced a difficult technical bug.', tip: 'STAR: Situation (context) → Task (objective) → Action (how you debugged) → Result (fixed & learned).' },
    { q: 'Why do you want to join our team?', tip: 'Reference real company achievements or culture, not generic praise.' },
  ],
  safaricom: [
    { q: 'How would you design a resilient payment retry mechanism for M-Pesa?', tip: 'Focus on idempotency keys, exponential backoff, circuit breakers, and transaction logging.' },
    { q: 'Tell us about a time you handled high user concurrency.', tip: 'Highlight caching strategies (Redis), DB indexes, and asynchronous worker queues.' },
    { q: 'How do you handle high pressure when production systems fail?', tip: 'Emphasize calm communication, incident triage, and post-mortem root cause analysis.' },
  ],
  andela: [
    { q: 'Walk us through how React reconciliation and Virtual DOM work.', tip: 'Explain diffing algorithm, key props, state batching, and re-render optimizations.' },
    { q: 'How do you structure code for remote team collaboration?', tip: 'Mention clear PR descriptions, unit tests, code reviews, and modular component boundaries.' },
  ],
}

export default function InterviewPractice() {
  const { id } = useParams()
  const { interviews, addInterview } = useAppData()
  const iv = interviews.find(x => x.id === id)

  const [deckCategory, setDeckCategory] = useState(iv?.company?.toLowerCase().includes('safaricom') ? 'safaricom' : 'general')
  const deck = COMPANY_DECKS[deckCategory] || COMPANY_DECKS.general

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedText, setRecordedText] = useState('')
  const [starAnalysis, setStarAnalysis] = useState(null)
  const [done, setDone] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)

  // Reminder form state
  const [remComp, setRemComp] = useState(iv?.company || 'Safaricom')
  const [remRole, setRemRole] = useState(iv?.role || 'Frontend Engineer')
  const [remDate, setRemDate] = useState('Aug 22, 2026')
  const [remTime, setRemTime] = useState('02:00 PM')

  const card = deck[index]

  const toggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true)
      setRecordedText('')
      setStarAnalysis(null)
    } else {
      setIsRecording(false)
      // Simulate Speech-to-Text and STAR Analysis
      const sampleAnswer = "In my previous project, we faced a database bottleneck during peak hours. I took the initiative to analyze query execution plans, added indexes, and implemented Redis caching. As a result, API response latency dropped by 65% and server load stabilized."
      setRecordedText(sampleAnswer)
      setStarAnalysis({
        situation: '✔ Clearly identified peak hour DB bottleneck',
        task: '✔ Target: Reduce latency & stabilize server',
        action: '✔ Analyzed execution plans, added indexes & Redis',
        result: '✔ 65% reduction in latency (Quantitative success)',
        score: '94/100 (Excellent STAR Structure)',
      })
    }
  }

  const next = () => {
    if (index === deck.length - 1) {
      setDone(true)
      return
    }
    setFlipped(false)
    setRecordedText('')
    setStarAnalysis(null)
    setIndex(i => i + 1)
  }

  const handleCreateReminder = (e) => {
    e.preventDefault()
    addInterview(iv?.applicationId || null, {
      company: remComp,
      role: remRole,
      date: remDate,
      time: remTime,
      round: 'Technical Interview',
      type: 'Video Meeting',
    })
    setShowReminderModal(false)
  }

  return (
    <div className="p-8 max-w-3xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <Link to={iv ? `/interviews/${iv.id}` : '/interviews'} className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={14} /> Back to Interviews
        </Link>

        <button
          onClick={() => setShowReminderModal(true)}
          className="text-xs px-3.5 py-1.5 rounded-xl border font-medium flex items-center gap-1.5 press-scale"
          style={{ borderColor: 'var(--border-1)', color: 'var(--text-1)' }}
        >
          <Calendar size={13} className="text-purple-500" /> Set Personal Meeting Reminder
        </button>
      </div>

      <h1 className="font-display text-xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>
        AI STAR Mock Interview Room{iv ? ` — ${iv.company}` : ''}
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-4)' }}>
        Practice answering out loud. Our AI checks your answer against the STAR method (Situation, Task, Action, Result).
      </p>

      {/* Deck Selector */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
        <button
          onClick={() => { setDeckCategory('general'); setIndex(0); setDone(false) }}
          className="flex-1 py-2 text-xs font-medium rounded-lg transition-all"
          style={{ background: deckCategory === 'general' ? 'var(--accent)' : 'transparent', color: deckCategory === 'general' ? 'white' : 'var(--text-4)' }}
        >
          General Behavioral
        </button>
        <button
          onClick={() => { setDeckCategory('safaricom'); setIndex(0); setDone(false) }}
          className="flex-1 py-2 text-xs font-medium rounded-lg transition-all"
          style={{ background: deckCategory === 'safaricom' ? 'var(--accent)' : 'transparent', color: deckCategory === 'safaricom' ? 'white' : 'var(--text-4)' }}
        >
          Safaricom & Tech Team
        </button>
        <button
          onClick={() => { setDeckCategory('andela'); setIndex(0); setDone(false) }}
          className="flex-1 py-2 text-xs font-medium rounded-lg transition-all"
          style={{ background: deckCategory === 'andela' ? 'var(--accent)' : 'transparent', color: deckCategory === 'andela' ? 'white' : 'var(--text-4)' }}
        >
          Andela & Remote Engineering
        </button>
      </div>

      {!done ? (
        <>
          <div className="text-xs font-mono mb-3" style={{ color: 'var(--text-5)' }}>
            Question {index + 1} of {deck.length}
          </div>

          {/* Question Card */}
          <button
            onClick={() => setFlipped(f => !f)}
            className="w-full text-left rounded-2xl p-8 min-h-[180px] flex items-center justify-center transition-all animate-scaleIn mb-4"
            style={{
              background: flipped ? 'var(--accent-bg-subtle)' : 'var(--bg-card)',
              border: '1px solid var(--border-1)',
            }}
            key={index}
          >
            <div className="text-center">
              {!flipped ? (
                <p className="font-display text-lg font-medium" style={{ color: 'var(--text-1)' }}>{card.q}</p>
              ) : (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{card.tip}</p>
              )}
              <div className="flex items-center justify-center gap-1.5 mt-4 text-xs" style={{ color: 'var(--text-5)' }}>
                <RotateCw size={12} />{flipped ? 'Click to see question' : 'Click for coaching tip'}
              </div>
            </div>
          </button>

          {/* Voice Simulator & STAR Feedback Box */}
          <div className="p-5 rounded-2xl border mb-4 space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>Speech Answer Practice</span>
              <button
                onClick={toggleRecord}
                className="text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5 text-white press-scale"
                style={{ background: isRecording ? '#ef4444' : 'var(--accent)' }}
              >
                {isRecording ? <MicOff size={14} className="animate-pulse" /> : <Mic size={14} />}
                {isRecording ? 'Stop Recording Answer...' : 'Record Voice Answer'}
              </button>
            </div>

            {isRecording && (
              <div className="py-4 text-center">
                <div className="inline-flex items-center gap-1">
                  <span className="w-2 h-4 bg-purple-500 rounded animate-bounce" />
                  <span className="w-2 h-6 bg-purple-600 rounded animate-bounce delay-100" />
                  <span className="w-2 h-8 bg-purple-700 rounded animate-bounce delay-200" />
                  <span className="w-2 h-5 bg-purple-500 rounded animate-bounce delay-150" />
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--text-4)' }}>Listening & analyzing STAR structure...</p>
              </div>
            )}

            {recordedText && (
              <div className="space-y-3 pt-2">
                <div className="text-xs p-3 rounded-xl font-mono leading-relaxed" style={{ background: 'var(--bg-page)', color: 'var(--text-2)' }}>
                  "{recordedText}"
                </div>

                {starAnalysis && (
                  <div className="p-4 rounded-xl space-y-1.5 text-xs border" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <div className="flex items-center justify-between font-bold text-emerald-500 mb-2">
                      <span className="flex items-center gap-1"><Award size={14} /> AI STAR Method Feedback</span>
                      <span>{starAnalysis.score}</span>
                    </div>
                    <div>{starAnalysis.situation}</div>
                    <div>{starAnalysis.task}</div>
                    <div>{starAnalysis.action}</div>
                    <div>{starAnalysis.result}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={next}
            className="w-full text-sm px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2 press-scale text-white"
            style={{ background: 'var(--accent)' }}
          >
            {index === deck.length - 1 ? 'Finish Practice Session' : 'Next Question'}<ArrowRight size={16} />
          </button>
        </>
      ) : (
        <div className="rounded-2xl p-10 text-center animate-celebrate" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <CheckCircle2 size={36} style={{ color: '#10b981', margin: '0 auto 12px' }} />
          <h2 className="font-display text-lg font-bold mb-1" style={{ color: 'var(--text-1)' }}>Mock Practice Session Complete!</h2>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>Great job mastering the STAR framework. You are ready to ace your real interview.</p>
        </div>
      )}

      {/* Candidate Personal Meeting Reminder Modal */}
      {showReminderModal && (
        <Modal title="Schedule Personal Interview Reminder" onClose={() => setShowReminderModal(false)}>
          <form onSubmit={handleCreateReminder} className="space-y-3">
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>
              Set a reminder for yourself so you don't miss an upcoming interview meeting!
            </p>

            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Company Name</label>
              <input
                type="text"
                required
                value={remComp}
                onChange={e => setRemComp(e.target.value)}
                placeholder="e.g. Safaricom / Andela"
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Role Title</label>
              <input
                type="text"
                required
                value={remRole}
                onChange={e => setRemRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Meeting Date</label>
                <input
                  type="text"
                  required
                  value={remDate}
                  onChange={e => setRemDate(e.target.value)}
                  placeholder="Aug 22, 2026"
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Meeting Time</label>
                <input
                  type="text"
                  required
                  value={remTime}
                  onChange={e => setRemTime(e.target.value)}
                  placeholder="02:00 PM"
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-medium text-xs text-white press-scale"
              style={{ background: 'var(--accent)' }}
            >
              Add to My Interview Reminders
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

