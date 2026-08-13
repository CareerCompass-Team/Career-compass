import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Video, Phone, FileEdit, Eye, PlayCircle, Star, Calendar, Mic2,
  Plus, CalendarClock, CheckCircle2, Sparkles, Clock, ArrowRight,
  ExternalLink, ShieldCheck, Flame, BookOpen, ChevronRight,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import StatusBadge from '../components/domain/StatusBadge'
import CandidateReviewModal from '../components/ui/CandidateReviewModal'
import ProgressBar from '../components/ui/ProgressBar'
import Modal from '../components/ui/Modal'

const TYPE_ICON = { Video, Phone, 'Take-home': FileEdit }

export default function Interviews() {
  const { user, interviews, applications, updateApplicationStatus, addInterview } = useAppData()

  const [tab, setTab] = useState('Upcoming')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  // Schedule modal form state
  const [companyName, setCompanyName] = useState('')
  const [roleTitle, setRoleTitle] = useState('')
  const [interviewDate, setInterviewDate] = useState('Aug 24, 2026')
  const [interviewTime, setInterviewTime] = useState('10:00 AM')
  const [roundType, setRoundType] = useState('Technical Round')
  const [formatType, setFormatType] = useState('Video')
  const [meetLink, setMeetLink] = useState('https://meet.google.com/career-compass-interview')

  const isRecruiter = user?.role === 'recruiter'

  // Unique roles for filtering
  const uniqueRoles = ['All Roles', ...new Set(interviews.map(i => i.role))]

  const upcomingCount = interviews.filter(iv => iv.status === 'Upcoming').length
  const completedCount = interviews.filter(iv => iv.status === 'Completed').length

  // Calculate overall prep checklist completion percentage across all upcoming interviews
  const totalPrepTasks = interviews.filter(iv => iv.status === 'Upcoming').flatMap(iv => iv.prepNotes || [])
  const checkedPrepTasks = totalPrepTasks.filter(p => p.checked).length
  const prepReadinessPct = totalPrepTasks.length > 0 ? Math.round((checkedPrepTasks / totalPrepTasks.length) * 100) : 100

  const filtered = interviews.filter(iv => {
    const matchesStatus = iv.status === tab
    const matchesRole = roleFilter === 'All Roles' || iv.role === roleFilter
    return matchesStatus && matchesRole
  })

  const handleReviewCandidate = (interview) => {
    const matchedApp = applications.find(a => a.id === interview.applicationId || a.role === interview.role) || {
      id: interview.id,
      role: interview.role,
      company: interview.company,
      appliedDate: interview.date,
      status: 'Interview',
      candidateName: interview.candidateName || 'Amara Osei',
    }
    setSelectedCandidate(matchedApp)
  }

  const handleScheduleSubmit = (e) => {
    e.preventDefault()
    if (!companyName.trim() || !roleTitle.trim()) return

    const matchedApp = applications.find(a => a.company.toLowerCase().includes(companyName.toLowerCase()))
    addInterview(matchedApp?.id || null, {
      company: companyName.trim(),
      role: roleTitle.trim(),
      date: interviewDate,
      time: interviewTime,
      round: roundType,
      type: formatType,
      meetingLink: meetLink,
    })

    setCompanyName('')
    setRoleTitle('')
    setShowScheduleModal(false)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn relative">
      {/* ── Page Header Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1 flex items-center gap-2.5" style={{ color: 'var(--text-1)' }}>
            <CalendarClock size={24} className="text-amber-400" />
            {isRecruiter ? 'Recruiter Interview & Candidate Evaluation Hub' : 'Interviews & Reminders Center'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            {isRecruiter
              ? 'Schedule candidate rounds, review video submissions, and evaluate technical performance.'
              : 'Track upcoming interview dates, launch AI practice rounds, and join live meeting links.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isRecruiter && (
            <button
              onClick={() => setShowScheduleModal(true)}
              className="text-xs px-4 py-2.5 rounded-xl font-semibold text-white press-scale flex items-center gap-1.5 shadow"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              <Plus size={14} /> Schedule Interview Reminder
            </button>
          )}
        </div>
      </div>

      {/* ── Guidance Banner ── */}
      <div
        className="rounded-2xl p-4 mb-6 border flex items-center justify-between gap-4 flex-wrap text-xs"
        style={{
          background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.08), rgba(124, 58, 237, 0.08))',
          borderColor: 'rgba(245, 158, 11, 0.25)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <strong style={{ color: 'var(--text-1)' }}>How Interviews & Reminders Work:</strong>
            <p className="mt-0.5" style={{ color: 'var(--text-4)' }}>
              1. Access direct Google Meet links 15 mins before your interview. 2. Track prep checklists for each round. 3. Practice mock STAR questions with Compass AI.
            </p>
          </div>
        </div>

        {interviews.length > 0 && (
          <Link
            to={`/interviews/${interviews[0].id}/practice`}
            className="px-3.5 py-2 rounded-xl font-bold text-white press-scale flex items-center gap-1.5 shrink-0 shadow text-xs"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
          >
            <Mic2 size={13} /> Launch AI Mock Practice
          </Link>
        )}
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-4)' }}>
            <span>Upcoming Rounds</span>
            <CalendarClock size={16} className="text-amber-400" />
          </div>
          <div className="font-display text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{upcomingCount}</div>
        </div>

        <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-4)' }}>
            <span>Completed Rounds</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="font-display text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{completedCount}</div>
        </div>

        <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--text-4)' }}>
            <span>Prep Readiness</span>
            <Sparkles size={16} className="text-violet-400" />
          </div>
          <div className="font-display text-2xl font-bold mb-1" style={{ color: '#10b981' }}>{prepReadinessPct}%</div>
          <ProgressBar value={prepReadinessPct} color="#10b981" />
        </div>

        <div className="rounded-xl p-4 border flex flex-col justify-between" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <div className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>AI Interview Coach</div>
          <Link
            to={interviews[0] ? `/interviews/${interviews[0].id}/practice` : '#'}
            className="text-xs py-1.5 px-3 rounded-lg font-semibold text-center text-white press-scale"
            style={{ background: 'var(--accent)' }}
          >
            Start Flashcard Mode →
          </Link>
        </div>
      </div>

      {/* Recruiter Role Filter */}
      {isRecruiter && (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <span className="text-xs font-semibold mr-1" style={{ color: 'var(--text-5)' }}>Filter Role:</span>
          {uniqueRoles.map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className="text-xs px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap press-scale"
              style={{
                background: roleFilter === role ? 'var(--accent)' : 'var(--bg-card)',
                color: roleFilter === role ? 'white' : 'var(--text-4)',
                border: '1px solid var(--border-1)',
              }}
            >
              {role}
            </button>
          ))}
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex rounded-xl overflow-hidden p-0.5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          {['Upcoming', 'Completed'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="text-xs px-4 py-2 rounded-lg font-bold transition-colors press-scale"
              style={{
                background: tab === t ? 'var(--accent-bg)' : 'transparent',
                color: tab === t ? 'var(--accent-text)' : 'var(--text-4)',
              }}
            >
              {t} ({interviews.filter(iv => iv.status === t && (roleFilter === 'All Roles' || iv.role === roleFilter)).length})
            </button>
          ))}
        </div>

        <span className="text-xs" style={{ color: 'var(--text-5)' }}>
          Showing {filtered.length} {tab.toLowerCase()} interview rounds
        </span>
      </div>

      {/* Interview Cards List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl p-12 text-center border border-dashed" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)' }}>
          <Mic2 size={36} className="mx-auto mb-3" style={{ color: 'var(--text-5)' }} />
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-3)' }}>
            No {tab.toLowerCase()} interviews found {roleFilter !== 'All Roles' && `for ${roleFilter}`}.
          </p>
          {!isRecruiter && (
            <button
              onClick={() => setShowScheduleModal(true)}
              className="text-xs px-4 py-2.5 rounded-xl font-semibold text-white press-scale"
              style={{ background: 'var(--accent)' }}
            >
              Schedule New Interview Reminder
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((iv) => {
            const Icon = TYPE_ICON[iv.type] || Video
            const checkedCount = (iv.prepNotes || []).filter(p => p.checked).length
            const totalCount = (iv.prepNotes || []).length
            const prepPct = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0

            return (
              <div
                key={iv.id}
                className="rounded-2xl p-5 border flex flex-col gap-4 transition-all hover:border-violet-500/40 shadow-sm"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
              >
                {/* Main Card Content */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <CompanyAvatar name={iv.company} size="lg" />
                    <div>
                      <div className="text-base font-bold flex items-center gap-2 mb-1 flex-wrap" style={{ color: 'var(--text-1)' }}>
                        <span>{iv.role}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold" style={{ background: 'var(--accent-bg-subtle)', color: 'var(--accent-text)' }}>
                          {iv.company}
                        </span>
                        {isRecruiter && iv.candidateName && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                            👤 {iv.candidateName}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: 'var(--text-4)' }}>
                        <span className="font-semibold text-violet-400">{iv.round}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Icon size={13} />{iv.type} Format</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-amber-400 font-medium">
                          <Calendar size={12} /> {iv.date} {iv.time && `at ${iv.time}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {isRecruiter ? (
                      <>
                        <button
                          onClick={() => handleReviewCandidate(iv)}
                          className="text-xs px-3.5 py-2 rounded-xl font-semibold border flex items-center gap-1.5 press-scale"
                          style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-page)' }}
                        >
                          <Eye size={13} /> Review CV & Summary
                        </button>
                        <button
                          onClick={() => handleReviewCandidate(iv)}
                          className="text-xs px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 press-scale text-white"
                          style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                        >
                          <PlayCircle size={13} /> Evaluate Candidate
                        </button>
                      </>
                    ) : (
                      <>
                        {iv.meetingLink && iv.status === 'Upcoming' && (
                          <a
                            href={iv.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3.5 py-2 rounded-xl font-bold text-white press-scale flex items-center gap-1.5 shadow"
                            style={{ background: '#10b981' }}
                          >
                            <Video size={13} /> Join Meeting Link
                          </a>
                        )}

                        {iv.status === 'Upcoming' && (
                          <Link
                            to={`/interviews/${iv.id}/practice`}
                            className="text-xs px-3.5 py-2 rounded-xl font-semibold press-scale flex items-center gap-1.5 text-white"
                            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
                          >
                            <Mic2 size={13} /> Practice with AI
                          </Link>
                        )}

                        <Link
                          to={`/interviews/${iv.id}`}
                          className="text-xs px-3.5 py-2 rounded-xl font-semibold border flex items-center gap-1.5 press-scale"
                          style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--surface-hover)' }}
                        >
                          Prep Notes & Checklist <ChevronRight size={12} />
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Prep Progress Indicator */}
                {!isRecruiter && totalCount > 0 && (
                  <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-3)' }}>
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <span className="font-medium" style={{ color: 'var(--text-4)' }}>
                        Prep Progress: <strong>{checkedCount}/{totalCount} tasks</strong> ({prepPct}%)
                      </span>
                      <div className="flex-1"><ProgressBar value={prepPct} color="#10b981" /></div>
                    </div>

                    <Link to={`/interviews/${iv.id}`} className="text-xs font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                      Open Checklist →
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Candidate Review Modal for Recruiter */}
      {selectedCandidate && (
        <CandidateReviewModal
          app={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onAction={(nextStage) => {
            updateApplicationStatus(selectedCandidate.id, nextStage, `Recruiter updated status to ${nextStage}`)
          }}
        />
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <Modal title="Schedule an Interview Reminder" onClose={() => setShowScheduleModal(false)}>
          <form onSubmit={handleScheduleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Safaricom, Andela, Flutterwave"
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Role Title</label>
              <input
                type="text"
                required
                value={roleTitle}
                onChange={e => setRoleTitle(e.target.value)}
                placeholder="e.g. Frontend Developer Intern"
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Date</label>
                <input
                  type="text"
                  value={interviewDate}
                  onChange={e => setInterviewDate(e.target.value)}
                  placeholder="e.g. Aug 24, 2026"
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Time</label>
                <input
                  type="text"
                  value={interviewTime}
                  onChange={e => setInterviewTime(e.target.value)}
                  placeholder="e.g. 10:00 AM"
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Round Type</label>
                <select
                  value={roundType}
                  onChange={e => setRoundType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                >
                  <option value="Recruiter Screen">Recruiter Screen</option>
                  <option value="Technical Round">Technical Round</option>
                  <option value="Coding Challenge">Coding Challenge</option>
                  <option value="System Design">System Design</option>
                  <option value="Final Manager Round">Final Manager Round</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Format</label>
                <select
                  value={formatType}
                  onChange={e => setFormatType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                >
                  <option value="Video">Video Meeting (Google Meet/Zoom)</option>
                  <option value="Take-home">Take-Home Project</option>
                  <option value="Phone">Phone Call</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Meeting Link</label>
              <input
                type="text"
                value={meetLink}
                onChange={e => setMeetLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm text-white press-scale mt-2"
              style={{ background: 'var(--accent)' }}
            >
              Add Interview to Command Center
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
