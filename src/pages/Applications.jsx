import { useState } from 'react'
import {
  LayoutGrid, List, Plus, Search, Bookmark, Send, CalendarClock,
  Trophy, Sparkles, Zap, ShieldCheck, CheckCircle2, ArrowRight,
  RefreshCw, Info, Filter,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { APPLICATION_STATUSES } from '../lib/status'
import ApplicationKanban from '../components/domain/ApplicationKanban'
import ApplicationList from '../components/domain/ApplicationList'
import CandidateReviewModal from '../components/ui/CandidateReviewModal'
import Modal from '../components/ui/Modal'

export default function Applications() {
  const {
    user, applications, updateApplicationStatus,
    postVerifiedJob, addInterview, acceptOffer,
  } = useAppData()

  const [view, setView] = useState('kanban')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All') // 'All' | 'Saved' | 'Active' | 'Offers'
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showPostJobModal, setShowPostJobModal] = useState(false)
  const [notification, setNotification] = useState(null)

  // Recruiter post job state
  const [jobTitle, setJobTitle] = useState('')
  const [jobLocation, setJobLocation] = useState('Nairobi, Kenya')
  const [jobType, setJobType] = useState('Full-time')
  const [jobSalary, setJobSalary] = useState('KES 80,000 – 120,000/mo')
  const [jobDesc, setJobDesc] = useState('')

  const isRecruiter = user?.role === 'recruiter'

  // Metric counts
  const savedCount = applications.filter(a => a.status === 'Saved').length
  const activeCount = applications.filter(a => ['Applied', 'Screening', 'Interview', 'Final Stage'].includes(a.status)).length
  const interviewCount = applications.filter(a => a.status === 'Interview').length
  const offerCount = applications.filter(a => a.status === 'Offer' || a.status === 'Accepted').length

  // Filter applications by search text and status category
  const filteredApps = applications.filter(app => {
    if (search.trim()) {
      const q = search.toLowerCase()
      const matchComp = app.company.toLowerCase().includes(q)
      const matchRole = app.role.toLowerCase().includes(q)
      if (!matchComp && !matchRole) return false
    }
    if (statusFilter === 'Saved') return app.status === 'Saved'
    if (statusFilter === 'Active') return ['Applied', 'Screening', 'Interview', 'Final Stage'].includes(app.status)
    if (statusFilter === 'Offers') return ['Offer', 'Accepted'].includes(app.status)
    return true
  })

  // ── Recruiter Live Response Simulator ─────────────────────────────
  // Simulates real-time employer ATS / Email Webhook updates
  const handleSimulateEmployerEvent = () => {
    const candidatesForEvents = applications.filter(a => a.status !== 'Accepted' && a.status !== 'Not Selected')
    if (candidatesForEvents.length === 0) {
      setNotification('All current applications are in terminal state!')
      setTimeout(() => setNotification(null), 3000)
      return
    }

    const appToUpdate = candidatesForEvents[Math.floor(Math.random() * candidatesForEvents.length)]

    if (appToUpdate.status === 'Saved' || appToUpdate.status === 'Applied') {
      updateApplicationStatus(appToUpdate.id, 'Screening', `Recruiter from ${appToUpdate.company} initiated phone screen`)
      setNotification(`🔔 Real-Time Sync: ${appToUpdate.company} HR moved your application to Screening!`)
    } else if (appToUpdate.status === 'Screening') {
      const newId = addInterview(appToUpdate.id, {
        round: 'Technical Interview',
        date: 'Aug 22, 2026',
        time: '2:00 PM',
        type: 'Google Meet',
      })
      setNotification(`📅 Real-Time Sync: ${appToUpdate.company} sent a Technical Interview invitation!`)
    } else if (appToUpdate.status === 'Interview' || appToUpdate.status === 'Final Stage') {
      updateApplicationStatus(appToUpdate.id, 'Offer', `Official offer extended — KES 140,000/mo`)
      setNotification(`🎉 Real-Time Sync: ${appToUpdate.company} extended an official Job Offer!`)
    } else {
      updateApplicationStatus(appToUpdate.id, 'Interview', `Follow-up interview scheduled`)
      setNotification(`🔔 Real-Time Sync: Status updated by ${appToUpdate.company}`)
    }

    setTimeout(() => setNotification(null), 4500)
  }

  const handleAdvanceStatus = (app) => {
    const sequence = ['Saved', 'Applied', 'Screening', 'Interview', 'Final Stage', 'Offer', 'Accepted']
    const idx = sequence.indexOf(app.status)
    if (idx >= 0 && idx < sequence.length - 1) {
      const next = sequence[idx + 1]
      if (next === 'Offer') {
        updateApplicationStatus(app.id, 'Offer', 'Official Job Offer received 🎉')
      } else if (next === 'Accepted') {
        acceptOffer(app.id)
      } else {
        updateApplicationStatus(app.id, next, `Advanced to ${next}`)
      }
    }
  }

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
    <div className="p-8 max-w-7xl mx-auto animate-fadeIn relative">
      {/* ── Toast Notification for Live Employer Sync ── */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl text-xs font-semibold text-white flex items-center gap-3 animate-celebrate bg-gradient-to-r from-violet-600 to-indigo-600 border border-violet-400">
          <Zap size={18} className="text-yellow-300 animate-pulse" />
          <span>{notification}</span>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2.5" style={{ color: 'var(--text-1)' }}>
            {isRecruiter ? 'Recruiter Candidate Pipeline' : 'Application Journey & Tracker'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            {isRecruiter
              ? `${applications.length} candidate applications across your verified listings`
              : `${applications.length} total applications saved & active in your recruitment pipeline`}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* View Toggle */}
          <div className="flex rounded-xl overflow-hidden p-0.5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <button
              onClick={() => setView('kanban')}
              className="px-3.5 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 press-scale"
              style={{
                background: view === 'kanban' ? 'var(--accent-bg)' : 'transparent',
                color: view === 'kanban' ? 'var(--accent-text)' : 'var(--text-4)',
                borderRadius: '8px',
              }}
            >
              <LayoutGrid size={14} /> Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className="px-3.5 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 press-scale"
              style={{
                background: view === 'list' ? 'var(--accent-bg)' : 'transparent',
                color: view === 'list' ? 'var(--accent-text)' : 'var(--text-4)',
                borderRadius: '8px',
              }}
            >
              <List size={14} /> List
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
              className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale text-white shadow"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              <Plus size={14} /> Discover & Save Jobs
            </a>
          )}
        </div>
      </div>

      {/* ── Summary Stats Strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total Tracked', val: applications.length, icon: Send, color: '#3b82f6' },
          { label: 'Saved Wishlist', val: savedCount, icon: Bookmark, color: '#a855f7' },
          { label: 'Active Pipeline', val: activeCount, icon: Sparkles, color: 'var(--accent)' },
          { label: 'Interviews', val: interviewCount, icon: CalendarClock, color: '#f59e0b' },
          { label: 'Offers & Wins', val: offerCount, icon: Trophy, color: '#10b981' },
        ].map(({ label, val, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl p-3.5 flex items-center gap-3 border transition-all"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}1f`, color }}>
              <Icon size={15} strokeWidth={2} />
            </div>
            <div>
              <div className="font-display font-bold text-base leading-none" style={{ color: 'var(--text-1)' }}>{val}</div>
              <div className="text-[11px] mt-0.5 font-medium" style={{ color: 'var(--text-4)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Automated Recruiter Sync & Response Simulator Banner ── */}
      <div
        className="rounded-xl p-4 mb-6 border flex items-center justify-between gap-4 flex-wrap text-xs"
        style={{
          background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.08), rgba(59, 130, 246, 0.08))',
          borderColor: 'rgba(124, 58, 237, 0.25)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
            <Zap size={16} />
          </div>
          <div>
            <strong style={{ color: 'var(--text-1)' }}>Automated Employer Sync & Real-Time Recruiter Engine:</strong>
            <p className="mt-0.5" style={{ color: 'var(--text-4)' }}>
              In production, status changes, interview calendar links, and offers are pushed automatically via ATS webhooks & recruiter dashboard updates.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateEmployerEvent}
          className="px-3.5 py-2 rounded-xl font-bold text-white press-scale flex items-center gap-1.5 shrink-0 shadow"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
        >
          <RefreshCw size={13} className="animate-spin-slow" /> Test Live Employer Response
        </button>
      </div>

      {/* ── Search & Category Filter Bar ── */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
          <input
            type="text"
            placeholder="Search applications by company or job title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl outline-none"
            style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Filter size={13} style={{ color: 'var(--text-5)' }} />
          {[
            { id: 'All', label: `All (${applications.length})` },
            { id: 'Saved', label: `Saved (${savedCount})` },
            { id: 'Active', label: `Active (${activeCount})` },
            { id: 'Offers', label: `Offers (${offerCount})` },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id)}
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
              style={{
                background: statusFilter === btn.id ? 'var(--accent-bg)' : 'var(--surface-hover)',
                color: statusFilter === btn.id ? 'var(--accent-text)' : 'var(--text-4)',
                border: statusFilter === btn.id ? '1px solid var(--border-2)' : '1px solid transparent',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Applications Kanban or List ── */}
      {filteredApps.length === 0 ? (
        <div className="rounded-2xl p-12 text-center border border-dashed" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)' }}>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-3)' }}>
            {search
              ? `No applications match "${search}"`
              : statusFilter === 'Saved'
              ? 'No saved jobs in your wishlist. Go to Discover Jobs and click Save!'
              : 'No applications found in this category.'}
          </p>
          <a
            href="/jobs"
            className="text-xs px-4 py-2.5 rounded-xl font-semibold text-white inline-flex items-center gap-1.5 press-scale"
            style={{ background: 'var(--accent)' }}
          >
            Explore & Save Verified Opportunities <ArrowRight size={13} />
          </a>
        </div>
      ) : view === 'kanban' ? (
        <ApplicationKanban
          applications={filteredApps}
          onCardClick={isRecruiter ? (app) => setSelectedCandidate(app) : undefined}
          onAdvanceStatus={handleAdvanceStatus}
        />
      ) : (
        <ApplicationList
          applications={filteredApps}
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
