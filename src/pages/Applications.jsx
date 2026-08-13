import { useState } from 'react'
import { LayoutGrid, List, Plus, Briefcase } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { APPLICATION_STATUSES } from '../lib/status'
import ApplicationKanban from '../components/domain/ApplicationKanban'
import ApplicationList from '../components/domain/ApplicationList'
import CandidateReviewModal from '../components/ui/CandidateReviewModal'
import Modal from '../components/ui/Modal'

export default function Applications() {
  const { user, applications, updateApplicationStatus, postVerifiedJob } = useAppData()
  const [view, setView] = useState('kanban')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showPostJobModal, setShowPostJobModal] = useState(false)

  // Post job form state for recruiter
  const [jobTitle, setJobTitle] = useState('')
  const [jobLocation, setJobLocation] = useState('Nairobi, Kenya')
  const [jobType, setJobType] = useState('Full-time')
  const [jobSalary, setJobSalary] = useState('KES 80,000 – 120,000/mo')
  const [jobDesc, setJobDesc] = useState('')

  const isRecruiter = user?.role === 'recruiter'

  const handlePostJob = (e) => {
    e.preventDefault()
    if (!jobTitle.trim() || !jobDesc.trim()) return
    postVerifiedJob({
      title: jobTitle.trim(),
      location: jobLocation,
      type: jobType,
      salary: jobSalary,
      description: jobDesc.trim(),
    })
    setJobTitle('')
    setJobDesc('')
    setShowPostJobModal(false)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
            {isRecruiter ? 'Recruiter Candidate Pipeline' : 'Applications'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            {isRecruiter
              ? `${applications.length} candidate applications across your posted job listings`
              : `${applications.length} total applications saved & submitted`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-1)' }}>
            <button
              onClick={() => setView('kanban')}
              className="px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5 press-scale"
              style={{ background: view === 'kanban' ? 'var(--accent-bg)' : 'transparent', color: view === 'kanban' ? 'var(--accent-text)' : 'var(--text-4)' }}
            >
              <LayoutGrid size={14} />Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className="px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5 press-scale"
              style={{ background: view === 'list' ? 'var(--accent-bg)' : 'transparent', color: view === 'list' ? 'var(--accent-text)' : 'var(--text-4)' }}
            >
              <List size={14} />List
            </button>
          </div>

          {isRecruiter ? (
            <button
              onClick={() => setShowPostJobModal(true)}
              className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              <Plus size={14} /> Post New Job
            </button>
          ) : (
            <a
              href="/jobs"
              className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale text-white"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              <Plus size={14} /> Find Jobs to Apply
            </a>
          )}
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl p-12 text-center" style={{ background: 'var(--bg-card)', border: '1px dashed var(--border-2)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--text-4)' }}>
            {isRecruiter
              ? 'No applicant submissions yet. Post a job to attract candidates!'
              : 'No applications yet — your job search starts on the Jobs page.'}
          </p>
          {isRecruiter ? (
            <button
              onClick={() => setShowPostJobModal(true)}
              className="text-xs px-4 py-2 rounded-xl font-semibold text-white press-scale"
              style={{ background: 'var(--accent)' }}
            >
              Post a Job
            </button>
          ) : (
            <a href="/jobs" className="text-sm font-medium" style={{ color: 'var(--accent)' }}>Discover jobs →</a>
          )}
        </div>
      ) : view === 'kanban' ? (
        <ApplicationKanban
          applications={applications}
          onCardClick={isRecruiter ? (app) => setSelectedCandidate(app) : undefined}
        />
      ) : (
        <ApplicationList
          applications={applications}
          onCardClick={isRecruiter ? (app) => setSelectedCandidate(app) : undefined}
        />
      )}

      {/* Recruiter Candidate Review Modal */}
      {selectedCandidate && (
        <CandidateReviewModal
          app={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onAction={(nextStage) => {
            updateApplicationStatus(selectedCandidate.id, nextStage, `Recruiter updated status to ${nextStage}`)
          }}
        />
      )}

      {/* Post Job Modal */}
      {showPostJobModal && (
        <Modal title="Post a Verified Job Opportunity" onClose={() => setShowPostJobModal(false)}>
          <form onSubmit={handlePostJob} className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Job Title</label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Senior React Developer"
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Location</label>
                <input
                  type="text"
                  value={jobLocation}
                  onChange={e => setJobLocation(e.target.value)}
                  placeholder="Nairobi / Remote"
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Job Type</label>
                <select
                  value={jobType}
                  onChange={e => setJobType(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Salary Range</label>
              <input
                type="text"
                value={jobSalary}
                onChange={e => setJobSalary(e.target.value)}
                placeholder="e.g. KES 80,000 – 120,000/mo"
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-4)' }}>Job Description & Requirements</label>
              <textarea
                rows={4}
                required
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                placeholder="Describe role responsibilities, key technologies, and qualifications..."
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none resize-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white press-scale"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              Publish Listing with Anti-Scam Badge
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
