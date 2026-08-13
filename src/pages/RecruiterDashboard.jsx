import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck, Plus, Users, Briefcase, Calendar,
  ArrowRight, Inbox, ClipboardList, Mic2, Gift, Trophy, Ban, Eye
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import VerificationModal from '../components/ui/VerificationModal'
import CandidateReviewModal from '../components/ui/CandidateReviewModal'
import Modal from '../components/ui/Modal'

const STAGES = [
  { key: 'Applied',       label: 'Applied',             color: '#6366f1', bg: 'rgba(99,102,241,0.1)',  icon: Inbox },
  { key: 'Screening',     label: 'Screening',            color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: ClipboardList },
  { key: 'Interview',     label: 'Technical Interview',  color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  icon: Mic2 },
  { key: 'Offer',         label: 'Offer Sent',           color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  icon: Gift },
  { key: 'Accepted',      label: 'Offer Accepted',       color: '#10b981', bg: 'rgba(16,185,129,0.1)',  icon: Trophy },
  { key: 'Not Selected',  label: 'Rejected',             color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   icon: Ban },
]

function nextActions(status) {
  switch (status) {
    case 'Applied':    return [{ label: 'Move to Screening', next: 'Screening' },  { label: 'Reject', next: 'Not Selected' }]
    case 'Screening':  return [{ label: 'Schedule Interview', next: 'Interview' }, { label: 'Reject', next: 'Not Selected' }]
    case 'Interview':  return [{ label: 'Send Offer', next: 'Offer' },             { label: 'Reject', next: 'Not Selected' }]
    case 'Offer':      return [{ label: '✓ Accepted', next: 'Accepted' },          { label: '✗ Declined', next: 'Not Selected' }]
    default: return []
  }
}

export default function RecruiterDashboard() {
  const { user, jobs, applications, updateApplicationStatus, postVerifiedJob, addInterview } = useAppData()
  const navigate = useNavigate()

  const [showVerifyModal,   setShowVerifyModal]   = useState(false)
  const [showPostJobModal,  setShowPostJobModal]   = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [reviewApp,         setReviewApp]          = useState(null) // candidate under review
  const [reviewInitialTab,  setReviewInitialTab]   = useState(null) // pre-select tab in review modal
  const [selectedApp,       setSelectedApp]        = useState(null) // for schedule modal
  const [activeTab,         setActiveTab]          = useState('pipeline')

  // Post job form
  const [jobTitle,    setJobTitle]    = useState('')
  const [jobLocation, setJobLocation] = useState('Nairobi, Kenya')
  const [jobType,     setJobType]     = useState('Full-time')
  const [jobSalary,   setJobSalary]   = useState('KES 80,000 – 120,000/mo')
  const [jobDesc,     setJobDesc]     = useState('')

  // Schedule form
  const [meetingDate,  setMeetingDate]  = useState('')
  const [meetingTime,  setMeetingTime]  = useState('')
  const [meetingRound, setMeetingRound] = useState('Technical Interview')

  const handlePostJob = (e) => {
    e.preventDefault()
    if (!jobTitle.trim() || !jobDesc.trim()) return
    postVerifiedJob({ title: jobTitle.trim(), location: jobLocation, type: jobType, salary: jobSalary, description: jobDesc.trim() })
    setJobTitle(''); setJobDesc(''); setShowPostJobModal(false)
  }

  const handleScheduleMeeting = (e) => {
    e.preventDefault()
    if (!selectedApp || !meetingDate || !meetingTime) return
    addInterview(selectedApp.id, {
      date: meetingDate, time: meetingTime, round: meetingRound,
      type: 'Video Meeting', interviewers: [user?.name || 'Hiring Team'],
    })
    setShowScheduleModal(false); setSelectedApp(null)
  }

  const moveStage = (app, next) => {
    updateApplicationStatus(app.id, next, `Recruiter moved to ${next}`)
    if (next === 'Interview') {
      setSelectedApp(app)
      setShowScheduleModal(true)
    }
  }

  const safeJobs = jobs || []
  const safeApps = applications || []

  const stats = {
    active:    safeJobs.length,
    total:     safeApps.length,
    inProcess: safeApps.filter(a => ['Screening','Interview','Offer'].includes(a?.status)).length,
    hired:     safeApps.filter(a => a?.status === 'Accepted').length,
  }

  const byStage = STAGES.reduce((acc, s) => {
    acc[s.key] = safeApps.filter(a => a?.status === s.key)
    return acc
  }, {})

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fadeIn">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-7 p-6 rounded-2xl border"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
        <div>
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
              {user?.companyName || user?.name || 'Recruiter Portal'}
            </h1>
            {user?.isVerifiedEmployer ? (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                <ShieldCheck size={13} /> Verified Employer
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'rgba(234,179,8,0.15)', color: '#d97706' }}>
                Unverified · Pending Anti-Scam Check
              </span>
            )}
          </div>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            Manage listings and move candidates through the full hiring lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {!user?.isVerifiedEmployer && (
            <button onClick={() => setShowVerifyModal(true)}
              className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale"
              style={{ background: 'linear-gradient(135deg,#d97706,#b45309)', color: 'white' }}>
              <ShieldCheck size={14} /> Verify Organization
            </button>
          )}
          <button onClick={() => setShowPostJobModal(true)}
            className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale text-white"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
            <Plus size={14} /> Post New Job
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Active Listings',  value: stats.active,    color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', Icon: Briefcase, tab: 'listings' },
          { label: 'Total Applicants', value: stats.total,     color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', Icon: Users,     tab: 'pipeline' },
          { label: 'In Pipeline',      value: stats.inProcess, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', Icon: ArrowRight, tab: 'pipeline' },
          { label: 'Hired / Accepted', value: stats.hired,     color: '#10b981', bg: 'rgba(16,185,129,0.1)', Icon: Trophy,    tab: 'pipeline' },
        ].map(({ label, value, color, bg, Icon, tab }) => (
          <div key={label}
            role="button"
            tabIndex={0}
            onClick={() => setActiveTab(tab)}
            onKeyDown={e => e.key === 'Enter' && setActiveTab(tab)}
            className="p-5 rounded-xl border flex items-center gap-4 cursor-pointer transition-all hover:border-purple-500/40 press-scale"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: bg, color }}>
              <Icon size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold font-display" style={{ color: 'var(--text-1)' }}>{value}</div>
              <div className="text-xs" style={{ color: 'var(--text-4)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tab switcher ── */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          ['pipeline', 'Candidate Pipeline'],
          ['listings', 'Job Listings'],
          ['interviews', 'Interviews & Recordings Hub'],
        ].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className="text-xs px-5 py-2.5 rounded-xl font-semibold transition-all press-scale"
            style={activeTab === key
              ? { background: 'var(--accent)', color: 'white' }
              : { background: 'var(--bg-card)', color: 'var(--text-3)', border: '1px solid var(--border-1)' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── INTERVIEWS & RECORDINGS EVALUATION VIEW ── */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border flex items-center justify-between"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div>
              <h3 className="font-display text-base font-bold" style={{ color: 'var(--text-1)' }}>
                Interview Evaluation Hub
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>
                Listen to candidate interview recordings, review ATS resume scores, and record hiring decisions.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full font-mono font-bold"
              style={{ background: 'var(--accent-bg-subtle)', color: 'var(--accent-text)' }}>
              {safeApps.filter(a => a.status === 'Interview' || a.status === 'Offer').length} Active Interviews
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {safeApps.map(app => (
              <div key={app.id}
                className="p-5 rounded-2xl border space-y-3 transition-all hover:border-purple-500/40 cursor-pointer"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                onClick={() => { setReviewInitialTab('CV & Cover Letter'); setReviewApp(app) }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>{app.role}</div>
                    <div className="text-xs font-medium text-purple-400 mt-0.5">{app.company || 'Candidate'}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa' }}>
                    {app.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl border space-y-1.5 text-xs"
                  style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
                  <div className="flex items-center justify-between">
                    <span>Applied Date:</span>
                    <strong style={{ color: 'var(--text-1)' }}>{app.appliedDate}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Stage:</span>
                    <strong style={{ color: 'var(--text-1)' }}>{app.status}</strong>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap pt-1" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => { setReviewInitialTab('CV & Cover Letter'); setReviewApp(app) }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 press-scale"
                    style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-page)' }}>
                    👁 View Candidate Resume
                  </button>
                  <button
                    onClick={() => { setReviewInitialTab('Interview'); setReviewApp(app) }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 press-scale"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                    🎧 Review Recording
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PIPELINE VIEW ── */}
      {activeTab === 'pipeline' && (
        <div>
          {/* Stage flow bar */}
          <div className="flex items-center gap-1 flex-wrap mb-6 p-4 rounded-2xl border text-xs font-medium overflow-x-auto"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            {STAGES.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1">
                <span className="px-3 py-1.5 rounded-full whitespace-nowrap"
                  style={{ background: s.bg, color: s.color }}>{s.label}</span>
                {i < STAGES.length - 1 && <ArrowRight size={13} style={{ color: 'var(--text-5)', flexShrink: 0 }} />}
              </div>
            ))}
          </div>

          {safeApps.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <Users size={36} className="mx-auto mb-3" style={{ color: 'var(--text-5)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--text-3)' }}>No candidates in the pipeline yet.</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-5)' }}>Post a job to attract applicants.</p>
            </div>
          ) : (
            <>
              {/* Top 3 stages */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {STAGES.slice(0, 3).map(stage => (
                  <StageColumn
                    key={stage.key}
                    stage={stage}
                    candidates={byStage[stage.key] || []}
                    onReview={setReviewApp}
                    onAction={(app, next) => moveStage(app, next)}
                    onSchedule={(app) => { setSelectedApp(app); setShowScheduleModal(true) }}
                  />
                ))}
              </div>
              {/* Bottom 3 stages */}
              <div className="grid md:grid-cols-3 gap-4">
                {STAGES.slice(3).map(stage => (
                  <StageColumn
                    key={stage.key}
                    stage={stage}
                    candidates={byStage[stage.key] || []}
                    onReview={setReviewApp}
                    onAction={(app, next) => moveStage(app, next)}
                    onSchedule={(app) => { setSelectedApp(app); setShowScheduleModal(true) }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── JOB LISTINGS VIEW ── */}
      {activeTab === 'listings' && (
        <div className="space-y-3">
          {safeJobs.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <Briefcase size={36} className="mx-auto mb-3" style={{ color: 'var(--text-5)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--text-3)' }}>No job listings posted yet.</p>
              <button onClick={() => setShowPostJobModal(true)}
                className="mt-4 text-xs px-5 py-2.5 rounded-xl font-semibold text-white press-scale"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                Post Your First Job
              </button>
            </div>
          ) : (
            safeJobs.map(job => (
              <div key={job.id}
                className="p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all hover:border-purple-500/40 cursor-pointer group"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                onClick={() => navigate(`/jobs/${job.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/jobs/${job.id}`)}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm group-hover:text-purple-400 transition-colors" style={{ color: 'var(--text-1)' }}>{job.title}</span>
                    {job.isVerified && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                        <ShieldCheck size={11} /> Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs flex items-center gap-3" style={{ color: 'var(--text-4)' }}>
                    <span>{job.location}</span><span>·</span>
                    <span>{job.type}</span><span>·</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed' }}>
                    {safeApps.filter(a => a.role === job.title).length} Applicants
                  </div>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Candidate Review Modal ── */}
      {reviewApp && (
        <CandidateReviewModal
          app={reviewApp}
          initialTab={reviewInitialTab}
          onClose={() => { setReviewApp(null); setReviewInitialTab(null) }}
          onAction={(next) => moveStage(reviewApp, next)}
        />
      )}

      {/* ── Post Job Modal ── */}
      {showPostJobModal && (
        <Modal title="Post a Verified Job Opportunity" onClose={() => setShowPostJobModal(false)}>
          <form onSubmit={handlePostJob} className="space-y-3">
            <FormField label="Job Title" required>
              <input type="text" required value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Senior React Developer"
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Location">
                <input type="text" value={jobLocation} onChange={e => setJobLocation(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
              </FormField>
              <FormField label="Type">
                <select value={jobType} onChange={e => setJobType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}>
                  <option>Full-time</option><option>Internship</option>
                  <option>Contract</option><option>Remote</option>
                </select>
              </FormField>
            </div>
            <FormField label="Salary Range">
              <input type="text" value={jobSalary} onChange={e => setJobSalary(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
            </FormField>
            <FormField label="Job Description" required>
              <textarea rows={4} required value={jobDesc} onChange={e => setJobDesc(e.target.value)}
                placeholder="Describe responsibilities, technologies, and qualifications..."
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none resize-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
            </FormField>
            <button type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white press-scale"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
              Publish with Anti-Scam Verified Badge
            </button>
          </form>
        </Modal>
      )}

      {/* ── Schedule Modal ── */}
      {showScheduleModal && selectedApp && (
        <Modal title="Schedule Interview Reminder" onClose={() => { setShowScheduleModal(false); setSelectedApp(null) }}>
          <form onSubmit={handleScheduleMeeting} className="space-y-3">
            <div className="p-3 rounded-xl text-xs border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
              <strong style={{ color: 'var(--text-1)' }}>{selectedApp.role}</strong> · {selectedApp.company}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Date" required>
                <input type="date" required value={meetingDate} onChange={e => setMeetingDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
              </FormField>
              <FormField label="Time" required>
                <input type="time" required value={meetingTime} onChange={e => setMeetingTime(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
              </FormField>
            </div>
            <FormField label="Round">
              <select value={meetingRound} onChange={e => setMeetingRound(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}>
                <option>Phone Screen</option><option>Technical Interview</option>
                <option>HR Interview</option><option>Final Round</option><option>Culture Fit</option>
              </select>
            </FormField>
            <button type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white press-scale"
              style={{ background: 'var(--accent)' }}>
              <Calendar size={14} className="inline mr-1.5" />Set Interview Reminder
            </button>
          </form>
        </Modal>
      )}

      <VerificationModal isOpen={showVerifyModal} onClose={() => setShowVerifyModal(false)} />
    </div>
  )
}

// ── Stage Column ─────────────────────────────────────────────────────────────
function StageColumn({ stage, candidates, onReview, onAction, onSchedule }) {
  const Icon = stage.icon
  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: 'var(--border-1)', background: stage.bg }}>
        <Icon size={14} style={{ color: stage.color }} />
        <span className="text-xs font-bold" style={{ color: stage.color }}>{stage.label}</span>
        <span className="ml-auto text-xs font-mono font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'var(--bg-card)', color: stage.color }}>{candidates.length}</span>
      </div>
      <div className="p-3 space-y-3 min-h-[110px]">
        {candidates.length === 0 && (
          <div className="py-6 text-center text-xs" style={{ color: 'var(--text-5)' }}>No candidates here</div>
        )}
        {candidates.map(app => (
          <CandidateCard
            key={app.id}
            app={app}
            stage={stage}
            onReview={() => onReview(app)}
            onAction={(next) => onAction(app, next)}
            onSchedule={() => onSchedule(app)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Candidate Card ───────────────────────────────────────────────────────────
function CandidateCard({ app, stage, onReview, onAction, onSchedule }) {
  const actions = nextActions(app.status)
  return (
    <div
      className="p-3 rounded-xl border group cursor-pointer transition-all hover:border-purple-500/30 hover:shadow-md"
      style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}
      onClick={onReview}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onReview()}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="text-xs font-semibold leading-snug truncate" style={{ color: 'var(--text-1)' }}>
            {app.role}
          </div>
          <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-4)' }}>
            {app.company || 'Candidate'}
          </div>
        </div>
        {/* Review badge */}
        <span
          className="shrink-0 text-xs px-2 py-1 rounded-lg font-semibold flex items-center gap-1"
          style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
        >
          <Eye size={11} /> Review
        </span>
      </div>
      <div className="text-xs mb-2.5" style={{ color: 'var(--text-5)' }}>Applied: {app.appliedDate}</div>
      <div className="flex gap-1.5 flex-wrap" onClick={e => e.stopPropagation()}>
        {actions.map(({ label, next }) => (
          <button key={next} onClick={() => onAction(next)}
            className="text-xs px-2 py-1 rounded-lg font-semibold press-scale"
            style={next === 'Not Selected'
              ? { background: 'rgba(239,68,68,0.1)', color: '#ef4444' }
              : { background: stage.bg, color: stage.color }}>
            {label}
          </button>
        ))}
        {app.status === 'Interview' && (
          <button onClick={e => { e.stopPropagation(); onSchedule() }}
            className="text-xs px-2 py-1 rounded-lg font-semibold press-scale"
            style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
            <Calendar size={10} className="inline mr-0.5" />Remind
          </button>
        )}
      </div>
    </div>
  )
}

function FormField({ label, children, required }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-4)' }}>
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
