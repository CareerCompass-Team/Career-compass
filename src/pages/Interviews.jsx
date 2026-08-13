import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Video, Phone, FileEdit, Eye, PlayCircle, Star, Calendar, Mic2, Plus } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import StatusBadge from '../components/domain/StatusBadge'
import CandidateReviewModal from '../components/ui/CandidateReviewModal'

const TYPE_ICON = { Video, Phone, 'Take-home': FileEdit }

export default function Interviews() {
  const { user, interviews, applications, updateApplicationStatus } = useAppData()
  const [tab, setTab] = useState('Upcoming')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [roleFilter, setRoleFilter] = useState('All Roles')

  const isRecruiter = user?.role === 'recruiter'

  // Extract unique job roles for recruiter filter
  const uniqueRoles = ['All Roles', ...new Set(interviews.map(i => i.role))]

  const filtered = interviews.filter(iv => {
    const matchesStatus = iv.status === tab
    const matchesRole = roleFilter === 'All Roles' || iv.role === roleFilter
    return matchesStatus && matchesRole
  })

  // Find matching application object for candidate review modal
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

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
            {isRecruiter ? 'Interview & Evaluation Hub' : 'Interviews & Reminders'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            {isRecruiter
              ? 'Track scheduled candidate interviews by role, listen to interview recordings, review submitted CVs, and submit evaluation ratings.'
              : `${interviews.length} upcoming and past interviews linked to your job applications`}
          </p>
        </div>
      </div>

      {/* Role Filter for Recruiters */}
      {isRecruiter && (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <span className="text-xs font-semibold mr-1" style={{ color: 'var(--text-5)' }}>Role:</span>
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
      <div className="flex gap-2 mb-6">
        {['Upcoming', 'Completed'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="text-xs px-4 py-2 rounded-xl font-semibold transition-colors press-scale"
            style={{
              background: tab === t ? 'var(--accent-bg)' : 'var(--bg-card)',
              color: tab === t ? 'var(--accent-text)' : 'var(--text-4)',
              border: tab === t ? '1px solid var(--border-1)' : '1px solid transparent',
            }}
          >
            {t} ({interviews.filter(iv => iv.status === t && (roleFilter === 'All Roles' || iv.role === roleFilter)).length})
          </button>
        ))}
      </div>

      {/* List of interviews */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl p-12 text-center border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <Mic2 size={36} className="mx-auto mb-3" style={{ color: 'var(--text-5)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text-3)' }}>
            No {tab.toLowerCase()} interviews found {roleFilter !== 'All Roles' && `for ${roleFilter}`}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((iv, i) => {
            const Icon = TYPE_ICON[iv.type] || Video
            return (
              <div
                key={iv.id}
                className="rounded-2xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-purple-500/40 shadow-sm"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
              >
                <div className="flex items-center gap-4">
                  <CompanyAvatar name={iv.company} size="lg" />
                  <div>
                    <div className="text-sm font-bold flex items-center gap-2 mb-0.5" style={{ color: 'var(--text-1)' }}>
                      <span>{iv.role}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md font-mono font-medium" style={{ background: 'var(--accent-bg-subtle)', color: 'var(--accent-text)' }}>
                        {iv.company}
                      </span>
                    </div>
                    <div className="text-xs flex items-center gap-3 flex-wrap" style={{ color: 'var(--text-4)' }}>
                      <span className="font-medium text-purple-400">{iv.round}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Icon size={13} />{iv.type}</span>
                      <span>•</span>
                      <span><Calendar size={12} className="inline mr-1" />{iv.date} {iv.time && `at ${iv.time}`}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {isRecruiter ? (
                    <>
                      <button
                        onClick={() => handleReviewCandidate(iv)}
                        className="text-xs px-3 py-2 rounded-xl font-semibold border flex items-center gap-1.5 press-scale"
                        style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-page)' }}
                      >
                        <Eye size={13} /> Review CV & Summary
                      </button>
                      <button
                        onClick={() => handleReviewCandidate(iv)}
                        className="text-xs px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5 press-scale text-white"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                      >
                        <PlayCircle size={13} /> Play Recording & Evaluate
                      </button>
                    </>
                  ) : (
                    <Link
                      to={`/interviews/${iv.id}`}
                      className="text-xs px-4 py-2 rounded-xl font-semibold border flex items-center gap-1.5 press-scale"
                      style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
                    >
                      View Prep Notes & Meeting Info
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Candidate Review Modal */}
      {selectedCandidate && (
        <CandidateReviewModal
          app={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onAction={(nextStage) => {
            updateApplicationStatus(selectedCandidate.id, nextStage, `Recruiter updated status to ${nextStage}`)
          }}
        />
      )}
    </div>
  )
}
