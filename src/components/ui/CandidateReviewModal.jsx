import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  X, FileText, Star, MessageSquare, CheckCircle2, XCircle,
  Mic2, ChevronRight, Award, ClipboardCheck, User2, Phone,
  Mail, Calendar, Clock, Building2, PlayCircle, PauseCircle,
  ThumbsUp, ThumbsDown, AlertCircle, Wand2
} from 'lucide-react'

// Mock candidate data generator based on application
function buildCandidateProfile(app) {
  return {
    name:       app.candidateName || 'Amara Osei',
    phone:      app.candidatePhone || '+254 712 345 678',
    email:      app.candidateEmail || 'amara.osei@email.com',
    location:   'Nairobi, Kenya',
    experience: '3 years',
    education:  'BSc Computer Science — University of Nairobi (2021)',
    skills:     ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Git'],
    summary:    'Passionate frontend developer with 3 years of experience building scalable web applications for fintech and e-commerce. Proficient in modern React ecosystem with a strong eye for UI/UX detail.',
    cvScore:    82,
    coverLetter: `Dear Hiring Team,\n\nI am excited to apply for the ${app.role} position at ${app.company}. Over the past three years I have led the development of customer-facing products used by 50,000+ active users...\n\nI believe my experience aligns closely with your team's goals and I would love the opportunity to contribute.\n\nWarm regards,\nAmara Osei`,
    interviewAnswers: [
      { q: 'Tell us about a challenging project you delivered.', a: 'At my previous role I led a migration of a legacy jQuery app to React — completed in 6 weeks with zero downtime, improving load times by 40%.' },
      { q: 'How do you handle tight deadlines?', a: 'I prioritize ruthlessly using MoSCoW. I delivered a critical payment feature in 48 hours by breaking it into atomic, shippable increments.' },
      { q: 'Where do you see yourself in 3 years?', a: 'I want to grow into a lead engineer role, mentoring juniors while architecting scalable systems.' },
    ],
    screeningNotes: '',
    interviewScore:  74,
    offerSalary:     'KES 115,000/mo',
    offerStartDate:  'Sep 1, 2026',
    offerBenefits:   'Medical cover, remote Fridays, annual training budget',
  }
}

const STAGE_TABS = {
  Applied:      ['Application', 'CV & Cover Letter'],
  Screening:    ['Application', 'CV & Cover Letter', 'Screening'],
  Interview:    ['Application', 'CV & Cover Letter', 'Screening', 'Interview'],
  Offer:        ['Application', 'CV & Cover Letter', 'Screening', 'Interview', 'Offer'],
  Accepted:     ['Application', 'CV & Cover Letter', 'Interview', 'Offer'],
  'Not Selected': ['Application', 'CV & Cover Letter'],
}

export default function CandidateReviewModal({ app, initialTab, onClose, onAction }) {
  const candidate = buildCandidateProfile(app)
  const tabs      = STAGE_TABS[app.status] || ['Application']

  // If initialTab is provided AND that tab exists in the available tabs, use it. Otherwise fall back to first tab.
  const resolvedInitialTab = initialTab && tabs.includes(initialTab) ? initialTab : tabs[0]

  const [activeTab, setActiveTab] = useState(resolvedInitialTab)
  const [screeningNotes, setScreeningNotes] = useState('')
  const [screeningScore, setScreeningScore] = useState(null) // null | 'pass' | 'fail'
  const [interviewFeedback, setInterviewFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const actions = nextActions(app.status)
  const [copiedCv, setCopiedCv] = useState(false)

  const handleDownloadCv = () => {
    const element = document.createElement("a")
    const file = new Blob([
      `CURRICULUM VITAE - ${candidate.name}\n` +
      `Email: ${candidate.email} | Phone: ${candidate.phone}\n` +
      `Location: ${candidate.location} | Experience: ${candidate.experience}\n\n` +
      `SUMMARY:\n${candidate.summary}\n\n` +
      `EDUCATION:\n${candidate.education}\n\n` +
      `SKILLS:\n${candidate.skills.join(', ')}\n\n` +
      `COVER LETTER:\n${candidate.coverLetter}`
    ], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${candidate.name.replace(/\s+/g, '_')}_Resume.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCopyCv = () => {
    navigator.clipboard.writeText(`${candidate.name} - Resume\n${candidate.summary}`)
    setCopiedCv(true)
    setTimeout(() => setCopiedCv(false), 2500)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(8,14,31,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border flex flex-col overflow-hidden animate-scaleIn my-auto shrink-0 shadow-2xl"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)', color: 'var(--text-1)' }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: 'var(--border-1)', background: 'var(--bg-page)' }}>
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
              {candidate.name.split(' ').map(n => n[0]).join('').slice(0,2)}
            </div>
            <div>
              <div className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                {candidate.name}
              </div>
              <div className="text-xs flex items-center gap-2 mt-0.5" style={{ color: 'var(--text-4)' }}>
                <span className="font-medium" style={{ color: 'var(--accent-text)' }}>{app.role}</span>
                <span>·</span>
                <span>{app.company}</span>
                <StageChip status={app.status} />
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border transition-all hover:bg-white/10 press-scale flex items-center gap-1 text-xs font-semibold"
            style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
            aria-label="Exit review modal"
            title="Exit popup"
          >
            <X size={16} /> Exit
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 px-6 pt-3 pb-0 border-b shrink-0 overflow-x-auto"
          style={{ borderColor: 'var(--border-1)' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="text-xs px-4 py-2.5 font-semibold whitespace-nowrap border-b-2 transition-all"
              style={activeTab === tab
                ? { borderColor: 'var(--accent)', color: 'var(--accent-text)', background: 'transparent' }
                : { borderColor: 'transparent', color: 'var(--text-4)', background: 'transparent' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* APPLICATION TAB */}
          {activeTab === 'Application' && (
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <SectionTitle icon={User2}>Candidate Info</SectionTitle>
                <InfoRow icon={Phone} label="Phone" value={candidate.phone} />
                <InfoRow icon={Mail} label="Email" value={candidate.email} />
                <InfoRow icon={Building2} label="Location" value={candidate.location} />
                <InfoRow icon={Award} label="Experience" value={candidate.experience} />
                <InfoRow icon={ClipboardCheck} label="Education" value={candidate.education} />

                <SectionTitle icon={Star}>Skills</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      style={{ background: 'var(--accent-bg-subtle)', borderColor: 'rgba(124,58,237,0.25)', color: 'var(--accent-text)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <SectionTitle icon={MessageSquare}>Summary</SectionTitle>
                <p className="text-xs leading-relaxed p-3.5 rounded-xl border"
                  style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
                  {candidate.summary}
                </p>

                <SectionTitle icon={Calendar}>Application Timeline</SectionTitle>
                <div className="p-3.5 rounded-xl border space-y-2"
                  style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                  <TimelineItem date={app.appliedDate} label="Application Submitted" done />
                  <TimelineItem date="" label="Screening" done={['Screening','Interview','Offer','Accepted'].includes(app.status)} />
                  <TimelineItem date="" label="Interview" done={['Interview','Offer','Accepted'].includes(app.status)} />
                  <TimelineItem date="" label="Offer" done={['Offer','Accepted'].includes(app.status)} />
                  <TimelineItem date="" label="Hired" done={app.status === 'Accepted'} />
                </div>
              </div>
            </div>
          )}

          {/* CV & COVER LETTER TAB */}
          {activeTab === 'CV & Cover Letter' && (
            <div className="space-y-6">
              {/* Top Action Bar for CV */}
              <div className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                <div>
                  <div className="text-xs font-bold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                    <FileText size={15} className="text-purple-400" />
                    <span>Candidate Resume: {candidate.name.replace(/\s+/g, '_')}_CV.pdf</span>
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-4)' }}>
                    Uploaded for {app.role} · Verified document
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCopyCv}
                    className="text-xs px-3 py-1.5 rounded-xl font-semibold border flex items-center gap-1.5 press-scale"
                    style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
                  >
                    <ClipboardCheck size={13} /> {copiedCv ? 'Copied to Clipboard!' : 'Copy Resume Text'}
                  </button>

                  <button
                    onClick={handleDownloadCv}
                    className="text-xs px-3.5 py-1.5 rounded-xl font-semibold text-white flex items-center gap-1.5 press-scale"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                  >
                    <Award size={13} /> Download Candidate CV (.pdf)
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Formatted Resume Preview Document */}
                <div className="p-5 rounded-2xl border space-y-4"
                  style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-2)' }}>
                    <div>
                      <div className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>{candidate.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-4)' }}>{candidate.email} · {candidate.phone}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                      VERIFIED CV
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-5)' }}>Professional Summary</div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{candidate.summary}</p>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-5)' }}>Education & Degree</div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{candidate.education}</p>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-5)' }}>Skills & Technical Competencies</div>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.skills.map(s => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded-md font-medium border"
                          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)', color: 'var(--accent-text)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ATS Match & Cover Letter */}
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border text-center"
                    style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-1)" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none"
                          stroke={candidate.cvScore >= 80 ? '#10b981' : candidate.cvScore >= 60 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="10"
                          strokeDasharray={`${candidate.cvScore * 2.51} 251`}
                          strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold font-display" style={{ color: 'var(--text-1)' }}>
                          {candidate.cvScore}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold" style={{ color: candidate.cvScore >= 80 ? '#10b981' : '#f59e0b' }}>
                      {candidate.cvScore >= 80 ? 'Strong ATS Match' : candidate.cvScore >= 60 ? 'Moderate Match' : 'Weak Match'}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold mb-1.5" style={{ color: 'var(--text-3)' }}>Cover Letter</div>
                    <div className="p-3.5 rounded-xl border text-xs leading-relaxed whitespace-pre-line"
                      style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-3)', maxHeight: 200, overflowY: 'auto' }}>
                      {candidate.coverLetter}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREENING TAB */}
          {activeTab === 'Screening' && (
            <div className="space-y-5">
              <SectionTitle icon={ClipboardCheck}>Screening Evaluation</SectionTitle>
              <p className="text-xs" style={{ color: 'var(--text-4)' }}>
                Review the candidate's application and decide if they should advance to the interview stage.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                  <div className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>Quick Criteria Check</div>
                  {[
                    { label: 'Meets experience requirement (3yr+)', pass: true },
                    { label: 'Location match (Nairobi)', pass: true },
                    { label: 'Required skills present', pass: true },
                    { label: 'AWS/Cloud experience', pass: false },
                  ].map(({ label, pass }) => (
                    <div key={label} className="flex items-center gap-2 text-xs">
                      {pass
                        ? <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                        : <XCircle size={14} style={{ color: '#ef4444' }} />}
                      <span style={{ color: pass ? 'var(--text-2)' : 'var(--text-5)' }}>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold mb-2" style={{ color: 'var(--text-2)' }}>Screening Decision</div>
                  <div className="flex gap-2">
                    <button onClick={() => setScreeningScore('pass')}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border"
                      style={screeningScore === 'pass'
                        ? { background: '#10b981', color: 'white', borderColor: '#10b981' }
                        : { background: 'rgba(16,185,129,0.08)', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)' }}>
                      <ThumbsUp size={14} /> Pass to Interview
                    </button>
                    <button onClick={() => setScreeningScore('fail')}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border"
                      style={screeningScore === 'fail'
                        ? { background: '#ef4444', color: 'white', borderColor: '#ef4444' }
                        : { background: 'rgba(239,68,68,0.08)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>
                      <ThumbsDown size={14} /> Decline
                    </button>
                  </div>

                  <div>
                    <div className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-4)' }}>Internal Screening Notes</div>
                    <textarea value={screeningNotes} onChange={e => setScreeningNotes(e.target.value)}
                      rows={5} placeholder="Add private notes for your team..."
                      className="w-full text-xs p-3 rounded-xl outline-none resize-none"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
                  </div>
                </div>
              </div>

              {screeningScore && (
                <button
                  onClick={() => { onAction(screeningScore === 'pass' ? 'Interview' : 'Not Selected'); onClose() }}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white press-scale"
                  style={{ background: screeningScore === 'pass' ? 'linear-gradient(135deg,#7c3aed,#6d28d9)' : '#ef4444' }}>
                  {screeningScore === 'pass' ? '→ Advance to Technical Interview' : '✕ Decline Candidate'}
                </button>
              )}
            </div>
          )}

          {/* INTERVIEW TAB */}
          {activeTab === 'Interview' && (
            <div className="space-y-5">
              <SectionTitle icon={Mic2}>Interview Review</SectionTitle>

              {/* Simulated recording */}
              <div className="p-4 rounded-2xl border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>📹 Interview Recording</div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                    45:20
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(p => !p)}
                    className="shrink-0 press-scale" style={{ color: 'var(--accent-text)' }}>
                    {isPlaying ? <PauseCircle size={38} /> : <PlayCircle size={38} />}
                  </button>
                  {/* Waveform */}
                  <div className="flex-1 flex items-center gap-0.5 h-10 overflow-hidden">
                    {Array.from({ length: 60 }).map((_, i) => {
                      const h = 20 + Math.sin(i * 0.7) * 15 + Math.random() * 10
                      return (
                        <div key={i}
                          style={{
                            width: 3, height: `${h}px`, borderRadius: 2,
                            background: i < 24 ? 'var(--accent)' : 'var(--border-1)',
                            animation: isPlaying ? `waveBar ${0.6 + (i % 5) * 0.1}s ease-in-out ${i * 0.02}s infinite` : 'none',
                          }} />
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Q&A answers */}
              <div className="space-y-3">
                <div className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>Interview Q&A Transcript</div>
                {candidate.interviewAnswers.map((qa, i) => (
                  <div key={i} className="p-4 rounded-xl border space-y-2"
                    style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                    <div className="text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>Q{i + 1}: {qa.q}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{qa.a}</div>
                  </div>
                ))}
              </div>

              {/* Scorecard */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>Interviewer Score</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <button key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        style={{ color: star <= (hoverRating || rating) ? '#f59e0b' : 'var(--border-1)', fontSize: 28, lineHeight: 1 }}>
                        ★
                      </button>
                    ))}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-4)' }}>
                    AI Interview Score: <span style={{ color: '#10b981' }}>{candidate.interviewScore}/100</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-4)' }}>Feedback Notes</div>
                  <textarea value={interviewFeedback} onChange={e => setInterviewFeedback(e.target.value)}
                    rows={4} placeholder="Add interview feedback for your team..."
                    className="w-full text-xs p-3 rounded-xl outline-none resize-none"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => { onAction('Offer'); onClose() }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white press-scale"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                  → Send Offer
                </button>
                <button onClick={() => { onAction('Not Selected'); onClose() }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border press-scale"
                  style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#ef4444' }}>
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* OFFER TAB */}
          {activeTab === 'Offer' && (
            <div className="space-y-5">
              <SectionTitle icon={Award}>Offer Package</SectionTitle>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[
                    { label: 'Role Offered', value: app.role },
                    { label: 'Salary Package', value: candidate.offerSalary },
                    { label: 'Proposed Start Date', value: candidate.offerStartDate },
                    { label: 'Benefits', value: candidate.offerBenefits },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3.5 rounded-xl border"
                      style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                      <div className="text-xs" style={{ color: 'var(--text-5)' }}>{label}</div>
                      <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text-1)' }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border text-center"
                    style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                    <Clock size={28} className="mx-auto mb-2" style={{ color: '#f59e0b' }} />
                    <div className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>Awaiting Response</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-4)' }}>Offer sent · Expires in 5 days</div>
                  </div>

                  <div className="text-xs font-bold mb-2" style={{ color: 'var(--text-2)' }}>Simulate Candidate Response</div>
                  <div className="flex gap-2">
                    <button onClick={() => { onAction('Accepted'); onClose() }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white press-scale flex items-center justify-center gap-1"
                      style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
                      <CheckCircle2 size={14} /> Candidate Accepted
                    </button>
                    <button onClick={() => { onAction('Not Selected'); onClose() }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold press-scale flex items-center justify-center gap-1 border"
                      style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#ef4444' }}>
                      <XCircle size={14} /> Candidate Declined
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        {actions.length > 0 && activeTab === 'Application' && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center gap-3"
            style={{ borderColor: 'var(--border-1)', background: 'var(--bg-page)' }}>
            <span className="text-xs" style={{ color: 'var(--text-4)' }}>Quick action:</span>
            {actions.map(({ label, next }) => (
              <button key={next} onClick={() => { onAction(next); onClose() }}
                className="text-xs px-4 py-2 rounded-xl font-semibold press-scale"
                style={next === 'Not Selected'
                  ? { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }
                  : { background: 'var(--accent)', color: 'white' }}>
                {label} <ChevronRight size={12} className="inline" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function nextActions(status) {
  switch (status) {
    case 'Applied':   return [{ label: 'Move to Screening', next: 'Screening' }, { label: 'Reject', next: 'Not Selected' }]
    case 'Screening': return [{ label: 'Schedule Interview', next: 'Interview' }, { label: 'Reject', next: 'Not Selected' }]
    case 'Interview': return [{ label: 'Send Offer', next: 'Offer' }, { label: 'Reject', next: 'Not Selected' }]
    case 'Offer':     return [{ label: '✓ Accepted', next: 'Accepted' }, { label: '✗ Declined', next: 'Not Selected' }]
    default: return []
  }
}

function StageChip({ status }) {
  const colors = {
    Applied:        { bg: 'rgba(99,102,241,0.15)', text: '#818cf8' },
    Screening:      { bg: 'rgba(245,158,11,0.15)', text: '#fbbf24' },
    Interview:      { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa' },
    Offer:          { bg: 'rgba(139,92,246,0.15)', text: '#a78bfa' },
    Accepted:       { bg: 'rgba(16,185,129,0.15)', text: '#34d399' },
    'Not Selected': { bg: 'rgba(239,68,68,0.15)',  text: '#f87171' },
  }
  const c = colors[status] || colors['Applied']
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
      style={{ background: c.bg, color: c.text }}>
      {status}
    </span>
  )
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
      style={{ color: 'var(--text-4)' }}>
      <Icon size={13} /> {children}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <Icon size={13} style={{ color: 'var(--text-5)', flexShrink: 0 }} />
      <span style={{ color: 'var(--text-4)', minWidth: 80 }}>{label}</span>
      <span className="font-medium" style={{ color: 'var(--text-2)' }}>{value}</span>
    </div>
  )
}

function TimelineItem({ date, label, done }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${done ? '' : ''}`}
        style={{ background: done ? '#10b981' : 'var(--border-1)' }}>
        {done && <CheckCircle2 size={12} color="white" />}
      </div>
      <span style={{ color: done ? 'var(--text-2)' : 'var(--text-5)', fontWeight: done ? 500 : 400 }}>{label}</span>
      {date && <span className="ml-auto" style={{ color: 'var(--text-5)' }}>{date}</span>}
    </div>
  )
}
