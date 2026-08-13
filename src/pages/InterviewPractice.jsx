import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, RotateCw, ArrowRight, CheckCircle2, Mic, MicOff,
  Sparkles, Calendar, Award, Building, Globe, Target, BookOpen, Info,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/ui/Modal'

// Role-aligned Question Bank: combines Target Employer questions + Other Top Companies for the SAME role
const ROLE_QUESTION_DECKS = {
  frontend: {
    title: 'Frontend & React Developer Role',
    targetCompanyDeck: [
      {
        company: 'Target Employer',
        q: 'Walk us through how you would optimize a React web app for slow 3G mobile networks.',
        tip: 'Focus on code splitting (React.lazy), image optimization, web vitals, service workers, and lightweight bundle size.',
      },
      {
        company: 'Target Employer',
        q: 'Describe a time you built a complex component from scratch. How did you ensure accessibility?',
        tip: 'Mention ARIA labels, keyboard navigation, color contrast ratios, semantic HTML, and screen reader testing.',
      },
    ],
    industryDecks: [
      {
        company: 'Andela (Global Engineering)',
        q: 'Explain the difference between React reconciliation, Virtual DOM, and state batching.',
        tip: 'Explain diffing algorithm, key props, batching in React 18, and useMemo/useCallback optimizations.',
      },
      {
        company: 'Safaricom (M-Pesa Web Portal)',
        q: 'How do you handle API errors, timeout retries, and offline state in a React frontend?',
        tip: 'Mention error boundaries, optimistic UI updates, Axios retry interceptors, and local storage fallback.',
      },
      {
        company: 'Google / Meta Standards',
        q: 'Describe how you debug a memory leak or unnecessary re-renders in a large frontend app.',
        tip: 'Highlight React DevTools Profiler, Chrome Performance tab, dependency arrays, and unmounting event listeners.',
      },
    ],
    starDecks: [
      {
        company: 'Behavioral & Culture Fit',
        q: 'Tell me about a time you had a design disagreement with a product manager or designer.',
        tip: 'STAR Method: Situation -> Task -> Action (collaborative compromise & technical trade-offs) -> Result.',
      },
      {
        company: 'Behavioral & Problem Solving',
        q: 'Describe a time when a critical bug occurred in production right before a deadline.',
        tip: 'STAR Method: Emphasize calm triage, rollback/hotfix strategy, clear team communication, and post-mortem.',
      },
    ],
  },
  software: {
    title: 'Software Engineer & Full-Stack Role',
    targetCompanyDeck: [
      {
        company: 'Target Employer',
        q: 'How would you design a scalable backend API endpoint for processing high-volume transactions?',
        tip: 'Discuss REST vs GraphQL, rate limiting, DB connection pooling, and idempotent request headers.',
      },
    ],
    industryDecks: [
      {
        company: 'Safaricom M-Pesa Team',
        q: 'How do you handle concurrency, distributed locks, and retry mechanisms in backend services?',
        tip: 'Mention Redis locks, idempotency keys, message queues (RabbitMQ/Kafka), and database transactions.',
      },
      {
        company: 'Microsoft Research',
        q: 'Walk us through your approach to unit testing and integration testing in software development.',
        tip: 'Mention TDD principles, mocking external dependencies, test coverage metrics, and CI/CD automation pipelines.',
      },
    ],
    starDecks: [
      {
        company: 'Behavioral',
        q: 'Describe a time you had to learn a completely new technology or stack in less than a week.',
        tip: 'Highlight documentation reading, building a spike MVP, asking targeted questions, and shipping code.',
      },
    ],
  },
}

export default function InterviewPractice() {
  const { id } = useParams()
  const { interviews, addInterview } = useAppData()
  const iv = interviews.find(x => x.id === id)

  // Determine role category & company name
  const roleName = iv?.role || 'Frontend Developer'
  const companyName = iv?.company || 'Target Employer'

  // Pick question set for this role
  const isSoftware = roleName.toLowerCase().includes('software') || roleName.toLowerCase().includes('full stack')
  const roleDeckData = isSoftware ? ROLE_QUESTION_DECKS.software : ROLE_QUESTION_DECKS.frontend

  const [activeCategory, setActiveCategory] = useState('target') // 'target' | 'industry' | 'star'

  // Current questions list based on active category tab
  const activeQuestions = activeCategory === 'target'
    ? roleDeckData.targetCompanyDeck
    : activeCategory === 'industry'
    ? roleDeckData.industryDecks
    : roleDeckData.starDecks

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedText, setRecordedText] = useState('')
  const [starAnalysis, setStarAnalysis] = useState(null)
  const [done, setDone] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)

  // Reminder form state
  const [remComp, setRemComp] = useState(companyName)
  const [remRole, setRemRole] = useState(roleName)
  const [remDate, setRemDate] = useState('Aug 24, 2026')
  const [remTime, setRemTime] = useState('10:00 AM')

  const card = activeQuestions[index] || activeQuestions[0]

  const toggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true)
      setRecordedText('')
      setStarAnalysis(null)
    } else {
      setIsRecording(false)
      // Speech-to-Text & STAR evaluation engine simulation
      const sampleAnswer = "In my last project building web interfaces, we noticed slow load times on mobile devices. I took the initiative to analyze performance using Lighthouse, implemented React code splitting with lazy loading, and optimized images. As a result, page load speeds improved by 55% and user bounce rate dropped significantly."
      setRecordedText(sampleAnswer)
      setStarAnalysis({
        situation: '✔ Clearly identified mobile performance issue via Lighthouse',
        task: '✔ Objective: Reduce load times & improve mobile retention',
        action: '✔ Implemented React code splitting, lazy loading & image compression',
        result: '✔ 55% speed improvement + bounce rate reduction (Quantified success)',
        score: '96/100 (Exceptional STAR Alignment)',
      })
    }
  }

  const next = () => {
    if (index === activeQuestions.length - 1) {
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
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn relative">
      {/* ── Navigation Top Bar ── */}
      <div className="flex items-center justify-between mb-6">
        <Link to={iv ? `/interviews/${iv.id}` : '/interviews'} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
          <ArrowLeft size={14} /> Back to Interviews Center
        </Link>

        <button
          onClick={() => setShowReminderModal(true)}
          className="text-xs px-3.5 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 press-scale"
          style={{ borderColor: 'var(--border-1)', color: 'var(--text-1)', background: 'var(--bg-card)' }}
        >
          <Calendar size={13} className="text-amber-400" /> Set Personal Meeting Reminder
        </button>
      </div>

      {/* ── Page Header & Guidance ── */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">
          <Target size={14} /> AI Mock Practice Room — Role Aligned
        </div>
        <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>
          Practicing for: <span style={{ color: 'var(--accent)' }}>{roleName}</span>
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-4)' }}>
          Questions are curated from <strong>{companyName}</strong> plus top tech companies (Andela, Safaricom, Google) interviewing for the <strong>{roleName}</strong> position.
        </p>
      </div>

      {/* ── Self-Explanatory Step Banner ── */}
      <div
        className="rounded-2xl p-4 mb-6 border flex items-center justify-between gap-3 text-xs"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-violet-500 text-white font-bold flex items-center justify-center text-[10px]">1</span>
            <span style={{ color: 'var(--text-2)' }}>Read Question / Coaching Tip</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-violet-500 text-white font-bold flex items-center justify-center text-[10px]">2</span>
            <span style={{ color: 'var(--text-2)' }}>Record Voice Answer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px]">3</span>
            <span style={{ color: 'var(--text-2)' }}>Get Instant STAR Feedback</span>
          </div>
        </div>
      </div>

      {/* ── Role Question Category Selector ── */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
        <button
          onClick={() => { setActiveCategory('target'); setIndex(0); setDone(false); setFlipped(false) }}
          className="flex-1 py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
          style={{
            background: activeCategory === 'target' ? 'var(--accent)' : 'transparent',
            color: activeCategory === 'target' ? 'white' : 'var(--text-4)',
          }}
        >
          <Building size={14} /> {companyName} Questions
        </button>

        <button
          onClick={() => { setActiveCategory('industry'); setIndex(0); setDone(false); setFlipped(false) }}
          className="flex-1 py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
          style={{
            background: activeCategory === 'industry' ? 'var(--accent)' : 'transparent',
            color: activeCategory === 'industry' ? 'white' : 'var(--text-4)',
          }}
        >
          <Globe size={14} /> Other Companies ({roleName})
        </button>

        <button
          onClick={() => { setActiveCategory('star'); setIndex(0); setDone(false); setFlipped(false) }}
          className="flex-1 py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
          style={{
            background: activeCategory === 'star' ? 'var(--accent)' : 'transparent',
            color: activeCategory === 'star' ? 'white' : 'var(--text-4)',
          }}
        >
          <Sparkles size={14} /> STAR Method Behavioral
        </button>
      </div>

      {!done && card ? (
        <>
          {/* Question Counter & Origin Badge */}
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-mono font-medium" style={{ color: 'var(--text-4)' }}>
              Question {index + 1} of {activeQuestions.length}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold" style={{ background: 'var(--accent-bg-subtle)', color: 'var(--accent-text)' }}>
              Source: {card.company}
            </span>
          </div>

          {/* Flashcard Box */}
          <button
            onClick={() => setFlipped(f => !f)}
            className="w-full text-left rounded-2xl p-8 min-h-[200px] flex items-center justify-center transition-all animate-scaleIn mb-4 shadow-sm"
            style={{
              background: flipped ? 'var(--accent-bg-subtle)' : 'var(--bg-card)',
              border: '1px solid var(--border-1)',
            }}
            key={index}
          >
            <div className="text-center max-w-xl mx-auto">
              {!flipped ? (
                <>
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Practice Question</div>
                  <p className="font-display text-lg font-semibold leading-snug" style={{ color: 'var(--text-1)' }}>{card.q}</p>
                </>
              ) : (
                <>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">AI Coaching Tip & Suggested Framework</div>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-2)' }}>{card.tip}</p>
                </>
              )}
              <div className="flex items-center justify-center gap-1.5 mt-5 text-xs font-medium" style={{ color: 'var(--text-4)' }}>
                <RotateCw size={13} />{flipped ? 'Click to see question again' : 'Click to flip for AI coaching tip'}
              </div>
            </div>
          </button>

          {/* Voice Simulator & STAR Feedback Box */}
          <div className="p-5 rounded-2xl border mb-5 space-y-3 shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold block" style={{ color: 'var(--text-1)' }}>Speech Answer Practice & STAR Evaluation</span>
                <span className="text-[11px]" style={{ color: 'var(--text-4)' }}>Click record to practice your voice response out loud.</span>
              </div>

              <button
                onClick={toggleRecord}
                className="text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 text-white press-scale shadow"
                style={{ background: isRecording ? '#ef4444' : 'var(--accent)' }}
              >
                {isRecording ? <MicOff size={14} className="animate-pulse" /> : <Mic size={14} />}
                {isRecording ? 'Stop & Evaluate Answer' : 'Record Voice Answer'}
              </button>
            </div>

            {isRecording && (
              <div className="py-5 text-center">
                <div className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-5 bg-violet-500 rounded animate-bounce" />
                  <span className="w-2.5 h-7 bg-violet-600 rounded animate-bounce delay-100" />
                  <span className="w-2.5 h-9 bg-violet-700 rounded animate-bounce delay-200" />
                  <span className="w-2.5 h-6 bg-violet-500 rounded animate-bounce delay-150" />
                </div>
                <p className="text-xs mt-2 font-medium" style={{ color: 'var(--text-4)' }}>Listening & evaluating STAR structure in real-time...</p>
              </div>
            )}

            {recordedText && (
              <div className="space-y-3 pt-2">
                <div className="text-xs p-3.5 rounded-xl font-mono leading-relaxed border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)', color: 'var(--text-2)' }}>
                  "{recordedText}"
                </div>

                {starAnalysis && (
                  <div className="p-4 rounded-xl space-y-2 text-xs border animate-fadeIn" style={{ background: 'rgba(16, 185, 129, 0.06)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
                    <div className="flex items-center justify-between font-bold text-emerald-400 mb-2 border-b pb-2" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
                      <span className="flex items-center gap-1.5"><Award size={15} /> AI STAR Method Evaluation</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">{starAnalysis.score}</span>
                    </div>
                    <div className="font-medium" style={{ color: 'var(--text-2)' }}>{starAnalysis.situation}</div>
                    <div className="font-medium" style={{ color: 'var(--text-2)' }}>{starAnalysis.task}</div>
                    <div className="font-medium" style={{ color: 'var(--text-2)' }}>{starAnalysis.action}</div>
                    <div className="font-medium text-emerald-400">{starAnalysis.result}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={next}
            className="w-full text-sm px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 press-scale text-white shadow"
            style={{ background: 'var(--accent)' }}
          >
            {index === activeQuestions.length - 1 ? 'Complete Category Practice' : 'Next Question'} <ArrowRight size={16} />
          </button>
        </>
      ) : (
        <div className="rounded-2xl p-10 text-center animate-celebrate shadow-md border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <CheckCircle2 size={44} style={{ color: '#10b981', margin: '0 auto 12px' }} />
          <h2 className="font-display text-xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>Category Practice Completed!</h2>
          <p className="text-sm max-w-md mx-auto mb-6" style={{ color: 'var(--text-4)' }}>
            Great work mastering questions for <strong>{roleName}</strong>. Switch to another category or restart your practice session.
          </p>
          <button
            onClick={() => { setDone(false); setIndex(0); setFlipped(false) }}
            className="text-xs px-5 py-2.5 rounded-xl font-bold text-white press-scale"
            style={{ background: 'var(--accent)' }}
          >
            Practice Again
          </button>
        </div>
      )}

      {/* Meeting Reminder Modal */}
      {showReminderModal && (
        <Modal title="Schedule Personal Interview Reminder" onClose={() => setShowReminderModal(false)}>
          <form onSubmit={handleCreateReminder} className="space-y-3">
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: 'var(--text-3)' }}>Company Name</label>
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
              <label className="block text-xs mb-1 font-medium" style={{ color: 'var(--text-3)' }}>Role Title</label>
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
                <label className="block text-xs mb-1 font-medium" style={{ color: 'var(--text-3)' }}>Meeting Date</label>
                <input
                  type="text"
                  required
                  value={remDate}
                  onChange={e => setRemDate(e.target.value)}
                  placeholder="Aug 24, 2026"
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1 font-medium" style={{ color: 'var(--text-3)' }}>Meeting Time</label>
                <input
                  type="text"
                  required
                  value={remTime}
                  onChange={e => setRemTime(e.target.value)}
                  placeholder="10:00 AM"
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white press-scale"
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
