import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FileText, PartyPopper, ChevronRight, Calendar } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import Timeline from '../components/ui/Timeline'
import DetailList from '../components/ui/DetailList'
import Modal from '../components/ui/Modal'
import Celebration from '../components/ui/Celebration'
import StatusBadge from '../components/domain/StatusBadge'
import { APPLICATION_STATUSES } from '../lib/status'

export default function ApplicationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    applications, interviews,
    updateApplicationStatus, acceptOffer, declineOffer,
    addApplicationNote, setApplicationNextStep, addInterview,
  } = useAppData()

  const app = applications.find(a => a.id === id)
  const [noteDraft, setNoteDraft] = useState(app?.notes ?? '')
  const [nextStepDraft, setNextStepDraft] = useState(app?.nextStep ?? '')
  const [editingNote, setEditingNote] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
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
  const currentIdx = APPLICATION_STATUSES.indexOf(app.status)
  const isTerminal = app.status === 'Accepted' || app.status === 'Not Selected'
  const nextStatus = !isTerminal && currentIdx >= 0 && currentIdx < APPLICATION_STATUSES.length - 2
    ? APPLICATION_STATUSES[currentIdx + 1]
    : null

  const handleAccept = () => {
    acceptOffer(app.id)
    setCelebrating(true)
    setTimeout(() => setCelebrating(false), 1300)
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

      <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--text-5)' }}>
        <Link to="/applications" style={{ color: 'var(--accent)' }}>Applications</Link>
        <span>/</span>
        <span>{app.company}</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-5">
          {/* Header */}
          <div className="rounded-xl p-6 relative overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <div className="flex items-start gap-4">
              <CompanyAvatar name={app.company} size="lg" />
              <div className="flex-1">
                <h1 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{app.role}</h1>
                <div className="text-sm font-medium mb-3" style={{ color: 'var(--accent-text)' }}>{app.company}</div>
                <StatusBadge status={app.status} showDot />
              </div>
            </div>

            {app.status === 'Offer' && (
              <div className="mt-5 pt-5 flex items-center gap-3" style={{ borderTop: '1px solid var(--border-3)' }}>
                <button
                  onClick={handleAccept}
                  className="text-sm px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 press-scale"
                  style={{ background: '#10b981', color: 'white' }}
                >
                  <PartyPopper size={16} />Accept Offer
                </button>
                <button
                  onClick={() => declineOffer(app.id)}
                  className="text-sm px-4 py-2.5 rounded-xl font-medium press-scale"
                  style={{ color: 'var(--text-4)', border: '1px solid var(--border-1)' }}
                >
                  Decline
                </button>
              </div>
            )}

            {app.status === 'Accepted' && (
              <div
                className="mt-5 pt-5 flex items-center gap-2 text-sm font-medium animate-celebrate"
                style={{ borderTop: '1px solid var(--border-3)', color: '#10b981' }}
              >
                <PartyPopper size={16} />You accepted this offer. Congratulations!
              </div>
            )}

            {nextStatus && app.status !== 'Offer' && (
              <div className="mt-5 pt-5 flex items-center gap-3" style={{ borderTop: '1px solid var(--border-3)' }}>
                <button
                  onClick={() => updateApplicationStatus(app.id, nextStatus, `Moved to ${nextStatus}`)}
                  className="text-sm px-4 py-2 rounded-lg font-medium flex items-center gap-1.5 press-scale"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)', border: '1px solid var(--border-2)' }}
                >
                  Advance to {nextStatus}<ChevronRight size={14} />
                </button>
                {(app.status === 'Applied' || app.status === 'Screening') && (
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="text-sm px-4 py-2 rounded-lg font-medium flex items-center gap-1.5 press-scale"
                    style={{ color: 'var(--text-3)', border: '1px solid var(--border-1)' }}
                  >
                    <Calendar size={14} />Schedule Interview
                  </button>
                )}
                <button
                  onClick={() => updateApplicationStatus(app.id, 'Not Selected', 'Marked as not selected')}
                  className="text-sm px-3 py-2 rounded-lg font-medium press-scale ml-auto"
                  style={{ color: 'var(--text-5)' }}
                >
                  Mark as Not Selected
                </button>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-5)' }}>Timeline</h2>
            <Timeline items={app.timeline} />
          </div>

          {/* Interviews */}
          {relatedInterviews.length > 0 && (
            <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
              <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-5)' }}>Interviews</h2>
              <div className="flex flex-col gap-2">
                {relatedInterviews.map(iv => (
                  <Link
                    key={iv.id}
                    to={`/interviews/${iv.id}`}
                    className="flex items-center justify-between text-sm px-3 py-2.5 rounded-lg transition-colors"
                    style={{ background: 'var(--surface-hover)', color: 'var(--text-2)' }}
                  >
                    <span>{iv.round} — {iv.date}</span>
                    <StatusBadge status={iv.status} kind="interview" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="rounded-xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-5)' }}>Notes</h2>
            {editingNote ? (
              <>
                <textarea
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  rows={4}
                  className="w-full text-sm rounded-lg p-3 outline-none resize-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
                />
                <div className="flex gap-2 mt-3">
                  <button onClick={handleSaveNote} className="text-xs px-3 py-1.5 rounded-lg font-medium press-scale" style={{ background: 'var(--accent)', color: 'white' }}>Save</button>
                  <button onClick={() => { setEditingNote(false); setNoteDraft(app.notes) }} className="text-xs px-3 py-1.5 rounded-lg press-scale" style={{ color: 'var(--text-4)' }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-3)' }}>{app.notes || 'No notes yet.'}</p>
                <button
                  onClick={() => setEditingNote(true)}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors press-scale"
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
          <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-5)' }}>Details</h2>
            <DetailList
              items={[
                { label: 'Applied', value: app.appliedDate || 'Not applied' },
                { label: 'Deadline', value: app.deadline },
                { label: 'Location', value: app.location },
                { label: 'Source', value: app.source },
              ]}
            />
          </div>

          <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-5)' }}>Next Step</h2>
            <input
              value={nextStepDraft}
              onChange={e => setNextStepDraft(e.target.value)}
              onBlur={() => setApplicationNextStep(app.id, nextStepDraft)}
              className="w-full text-sm rounded-lg px-3 py-2 outline-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
            />
          </div>

          <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <h2 className="font-display text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-5)' }}>Documents</h2>
            <div className="flex flex-col gap-3">
              {[{ label: 'CV Submitted', value: app.resumeName }, { label: 'Cover Letter', value: app.coverLetter }].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-5)' }}>{label}</div>
                  {value ? (
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--accent-text)' }}>
                      <FileText size={14} strokeWidth={2} aria-hidden="true" />{value}
                    </div>
                  ) : (
                    <div className="text-sm" style={{ color: 'var(--text-5)' }}>None</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showScheduleModal && (
        <Modal title="Schedule an Interview" onClose={() => setShowScheduleModal(false)}>
          <div className="flex flex-col gap-3">
            <label className="text-xs" style={{ color: 'var(--text-5)' }}>
              Round
              <input
                value={round}
                onChange={e => setRound(e.target.value)}
                placeholder="e.g. Technical Interview"
                className="w-full mt-1 text-sm rounded-lg px-3 py-2 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />
            </label>
            <label className="text-xs" style={{ color: 'var(--text-5)' }}>
              Date
              <input
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="e.g. Aug 20, 2024"
                className="w-full mt-1 text-sm rounded-lg px-3 py-2 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />
            </label>
            <button
              onClick={handleSchedule}
              className="mt-2 text-sm px-5 py-2.5 rounded-xl font-medium press-scale"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              Schedule
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
