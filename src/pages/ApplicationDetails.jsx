import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  FileText, PartyPopper, ChevronRight, Calendar, CheckCircle2,
  Clock, ShieldCheck, MapPin, Briefcase, ExternalLink, Sparkles,
  Award, MessageSquare, History, Video,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import Timeline from '../components/ui/Timeline'
import DetailList from '../components/ui/DetailList'
import Modal from '../components/ui/Modal'
import Celebration from '../components/ui/Celebration'
import StatusBadge from '../components/domain/StatusBadge'
import ApplyModal from '../components/ui/ApplyModal'
import { APPLICATION_STATUSES } from '../lib/status'

const STAGE_STEPS = ['Saved', 'Applied', 'Screening', 'Interview', 'Final Stage', 'Offer', 'Accepted']

export default function ApplicationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    jobs, applications, interviews,
    updateApplicationStatus, acceptOffer, declineOffer,
    addApplicationNote, setApplicationNextStep, addInterview,
  } = useAppData()

  const app = applications.find(a => a.id === id)
  const associatedJob = (jobs || []).find(j => j.id === app?.jobId) || {
    id: app?.jobId || 'j_temp',
    company: app?.company || 'Employer',
    title: app?.role || 'Role',
    location: app?.location || 'Remote',
    salary: 'KES 80,000 – 120,000/mo',
    skills: ['JavaScript', 'React', 'Node.js'],
  }

  const [noteDraft, setNoteDraft] = useState(app?.notes ?? '')
  const [nextStepDraft, setNextStepDraft] = useState(app?.nextStep ?? '')
  const [editingNote, setEditingNote] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [round, setRound] = useState('')
  const [date, setDate] = useState('')

  if (!app) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Application not found. <Link to="/applications" style={{ color: 'var(--accent)' }}>Back to Applications</Link>
      </div>
    )
  }

  const relatedInterviews = interviews.filter(iv => iv.applicationId === app.id)
  const currentStageIdx = STAGE_STEPS.indexOf(app.status)
  const isTerminal = app.status === 'Accepted' || app.status === 'Not Selected'
  const nextStatus = !isTerminal && currentStageIdx >= 0 && currentStageIdx < STAGE_STEPS.length - 1
    ? STAGE_STEPS[currentStageIdx + 1]
    : null

  const handleAccept = () => {
    acceptOffer(app.id)
    setCelebrating(true)
    setTimeout(() => setCelebrating(false), 1600)
  }

  const handleSaveNote = () => {
    addApplicationNote(app.id, noteDraft)
    setEditingNote(false)
  }

  const handleSchedule = () => {
    if (!round.trim() || !date.trim()) return
    const newId = addInterview(app.id, { round, date, time: 'TBD', type: 'Video' })
    setShowScheduleModal(false)
    setRound('')
    setDate('')
    navigate(`/interviews/${newId}`)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fadeIn relative">
      {celebrating && <Celebration />}

      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center gap-2 text-xs mb-6 font-medium" style={{ color: 'var(--text-5)' }}>
        <Link to="/applications" style={{ color: 'var(--accent)' }}>Applications</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-2)' }}>{app.company} — {app.role}</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-5">
          {/* Header Card */}
          <div className="rounded-2xl p-6 relative overflow-hidden shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <CompanyAvatar name={app.company} size="lg" />
                <div>
                  <h1 className="font-display text-xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>{app.role}</h1>
                  <div className="text-sm font-semibold mb-3" style={{ color: 'var(--accent-text)' }}>{app.company}</div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={app.status} showDot />
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-mono" style={{ background: 'var(--surface-hover)', color: 'var(--text-4)' }}>
                      {app.location || 'Remote'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Pipeline Stage Stepper */}
            {app.status !== 'Not Selected' && (
              <div className="mt-6 pt-5 border-t" style={{ borderColor: 'var(--border-3)' }}>
                <div className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
                  <Sparkles size={13} className="text-violet-400" /> Current Pipeline Stage Progression
                </div>
                <div className="flex items-center justify-between relative px-2">
                  <div className="absolute top-2.5 left-4 right-4 h-0.5 -z-0" style={{ background: 'var(--border-2)' }} />
                  {STAGE_STEPS.map((step, idx) => {
                    const isPassed = currentStageIdx >= idx
                    const isCurrent = app.status === step
                    return (
                      <div key={step} className="flex flex-col items-center relative z-10">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all"
                          style={{
                            background: isCurrent ? 'var(--accent)' : isPassed ? '#10b981' : 'var(--bg-card)',
                            color: isPassed || isCurrent ? 'white' : 'var(--text-5)',
                            border: isPassed || isCurrent ? 'none' : '2px solid var(--border-2)',
                            boxShadow: isCurrent ? '0 0 0 3px var(--accent-bg)' : 'none',
                          }}
                        >
                          {isPassed && !isCurrent ? '✓' : idx + 1}
                        </div>
                        <span
                          className="text-[10px] mt-1 font-semibold text-center"
                          style={{
                            color: isCurrent ? 'var(--accent-text)' : isPassed ? 'var(--text-2)' : 'var(--text-5)',
                          }}
                        >
                          {step}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Saved Job Wishlist Banner */}
            {app.status === 'Saved' && (
              <div className="mt-5 pt-5 flex items-center justify-between gap-3 border-t flex-wrap" style={{ borderColor: 'var(--border-3)' }}>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-violet-400" />
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                    Saved in Wishlist — ready to submit application?
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {app.jobId && (
                    <Link
                      to={`/jobs/${app.jobId}`}
                      className="text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 press-scale border"
                      style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
                    >
                      <ExternalLink size={14} /> View Full Job Listing
                    </Link>
                  )}
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 press-scale text-white shadow"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    <CheckCircle2 size={14} /> Review CV & Submit Application
                  </button>
                </div>
              </div>
            )}

            {/* Active Offer Banner */}
            {app.status === 'Offer' && (
              <div className="mt-5 pt-5 flex items-center gap-3 border-t flex-wrap" style={{ borderColor: 'var(--border-3)' }}>
                <Link
                  to={`/applications/${app.id}/offer`}
                  className="text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 press-scale text-white shadow"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                  <FileText size={15} /> Review & Sign Offer Contract
                </Link>
                <button
                  onClick={handleAccept}
                  className="text-xs px-4 py-2.5 rounded-xl font-semibold press-scale border"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)', color: 'var(--text-1)' }}
                >
                  <PartyPopper size={14} className="inline mr-1" /> Quick Accept
                </button>
                <button
                  onClick={() => declineOffer(app.id)}
                  className="text-xs px-4 py-2.5 rounded-xl font-semibold press-scale border"
                  style={{ color: 'var(--text-4)', borderColor: 'var(--border-1)' }}
                >
                  Decline Offer
                </button>
              </div>
            )}

            {app.status === 'Accepted' && (
              <div
                className="mt-5 pt-5 flex items-center justify-between gap-3 text-xs font-bold animate-celebrate border-t flex-wrap"
                style={{ borderColor: 'var(--border-3)', color: '#10b981' }}
              >
                <div className="flex items-center gap-2">
                  <PartyPopper size={18} /> Offer Accepted! Congratulations on landing this role! 🎉
                </div>
                <Link
                  to={`/applications/${app.id}/offer`}
                  className="px-3.5 py-1.5 rounded-xl font-semibold text-xs border flex items-center gap-1.5 press-scale"
                  style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}
                >
                  <FileText size={14} /> View Executed Contract
                </Link>
              </div>
            )}

            {/* Next Stage Controls */}
            {nextStatus && app.status !== 'Offer' && (
              <div className="mt-5 pt-5 flex items-center gap-3 flex-wrap border-t" style={{ borderColor: 'var(--border-3)' }}>
                <button
                  onClick={() => updateApplicationStatus(app.id, nextStatus, `Advanced to ${nextStatus}`)}
                  className="text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 press-scale shadow"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  Advance Stage to {nextStatus} <ChevronRight size={14} />
                </button>

                {(app.status === 'Applied' || app.status === 'Screening') && (
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale border"
                    style={{ color: 'var(--text-2)', borderColor: 'var(--border-1)', background: 'var(--surface-hover)' }}
                  >
                    <Calendar size={14} className="text-amber-400" /> Schedule Interview Meeting
                  </button>
                )}

                <button
                  onClick={() => updateApplicationStatus(app.id, 'Not Selected', 'Marked as not selected')}
                  className="text-xs px-3.5 py-2 rounded-xl font-semibold press-scale ml-auto"
                  style={{ color: 'var(--text-5)' }}
                >
                  Mark Not Selected
                </button>
              </div>
            )}
          </div>

          {/* Timeline Card */}
          <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
              <History size={14} /> Application Milestones & Timeline
            </h2>
            <Timeline items={app.timeline} />
          </div>

          {/* Related Interviews Card */}
          {relatedInterviews.length > 0 && (
            <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h2 className="font-display text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
                <Video size={14} className="text-amber-400" /> Linked Interview Rounds
              </h2>
              <div className="flex flex-col gap-2.5">
                {relatedInterviews.map(iv => (
                  <Link
                    key={iv.id}
                    to={`/interviews/${iv.id}`}
                    className="flex items-center justify-between text-xs px-4 py-3 rounded-xl transition-all border hover:border-violet-500/40"
                    style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
                  >
                    <div>
                      <span className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>{iv.round}</span>
                      <span className="ml-2 font-mono" style={{ color: 'var(--text-5)' }}>{iv.date} at {iv.time || '10:00 AM'}</span>
                    </div>
                    <StatusBadge status={iv.status} kind="interview" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Candidate Notes Card */}
          <div className="rounded-2xl p-6 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
              <MessageSquare size={14} /> Personal Candidate Notes
            </h2>
            {editingNote ? (
              <>
                <textarea
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  rows={4}
                  className="w-full text-xs rounded-xl p-3 outline-none resize-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
                />
                <div className="flex gap-2 mt-3">
                  <button onClick={handleSaveNote} className="text-xs px-4 py-2 rounded-xl font-bold press-scale text-white" style={{ background: 'var(--accent)' }}>Save Note</button>
                  <button onClick={() => { setEditingNote(false); setNoteDraft(app.notes) }} className="text-xs px-3.5 py-2 rounded-xl font-semibold press-scale" style={{ color: 'var(--text-4)' }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs leading-relaxed mb-3 font-medium" style={{ color: 'var(--text-3)' }}>{app.notes || 'No personal notes added yet.'}</p>
                <button
                  onClick={() => setEditingNote(true)}
                  className="text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-colors press-scale"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)', border: '1px solid var(--border-2)' }}
                >
                  {app.notes ? 'Edit Note' : '+ Add Note'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Details Box */}
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-4)' }}>Application Info</h2>
            <DetailList
              items={[
                { label: 'Applied On', value: app.appliedDate || 'Not applied yet' },
                { label: 'Application Deadline', value: app.deadline },
                { label: 'Job Location', value: app.location },
                { label: 'Sourced Via', value: app.source || 'CareerCompass' },
              ]}
            />
          </div>

          {/* Next Step Box */}
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
              <Clock size={13} className="text-amber-400" /> Current Next Step Action
            </h2>
            <input
              value={nextStepDraft}
              onChange={e => setNextStepDraft(e.target.value)}
              onBlur={() => setApplicationNextStep(app.id, nextStepDraft)}
              className="w-full text-xs font-medium rounded-xl px-3 py-2.5 outline-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
            />
            <span className="text-[10px] mt-1.5 block" style={{ color: 'var(--text-5)' }}>Edits save automatically on focus change.</span>
          </div>

          {/* Submitted Documents Box */}
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-4)' }}>Submitted Documents</h2>
            <div className="flex flex-col gap-3">
              {[{ label: 'Submitted CV', value: app.resumeName }, { label: 'Cover Letter', value: app.coverLetter }].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[11px] mb-1 font-medium" style={{ color: 'var(--text-5)' }}>{label}</div>
                  {value ? (
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
                      <FileText size={14} />{value}
                    </div>
                  ) : (
                    <div className="text-xs" style={{ color: 'var(--text-5)' }}>None attached</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <Modal title="Schedule an Interview Meeting" onClose={() => setShowScheduleModal(false)}>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--text-4)' }}>Round Title</label>
              <input
                value={round}
                onChange={e => setRound(e.target.value)}
                placeholder="e.g. Technical Coding Challenge"
                className="w-full text-xs rounded-xl px-3 py-2.5 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--text-4)' }}>Meeting Date</label>
              <input
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="e.g. Aug 24, 2026"
                className="w-full text-xs rounded-xl px-3 py-2.5 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />
            </div>
            <button
              onClick={handleSchedule}
              className="mt-2 text-xs px-5 py-2.5 rounded-xl font-bold press-scale text-white"
              style={{ background: 'var(--accent)' }}
            >
              Schedule Interview & Link to Application
            </button>
          </div>
        </Modal>
      )}

      {/* ── Apply Modal: CV review + cover letter editor + confirm ── */}
      <ApplyModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        job={associatedJob}
        existingApp={app}
        onSuccess={(newAppId) => navigate(`/applications/${newAppId || app.id}`)}
      />
    </div>
  )
}
