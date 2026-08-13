import { useState } from 'react'
import {
  ShieldCheck, Plus, Users, Briefcase, Calendar, ArrowRight,
  Inbox, ClipboardList, Mic2, Gift, Trophy, Ban, Eye, Star,
  MapPin, GraduationCap, FileText, ChevronRight, Sparkles,
  CheckCircle2, XCircle, Video, Phone, Award, BarChart3,
  Clock, Filter, Search, Zap,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import VerificationModal from '../components/ui/VerificationModal'
import Modal from '../components/ui/Modal'
import { RECRUITER_LISTINGS, RECRUITER_CANDIDATES } from '../data/recruiterMockData'

const STAGES = [
  { key: 'Applied',       label: 'Applied',       color: '#6366f1', bg: 'rgba(99,102,241,0.12)',  icon: Inbox },
  { key: 'Screening',     label: 'Screening',     color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  icon: ClipboardList },
  { key: 'Interview',     label: 'Interview',     color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  icon: Mic2 },
  { key: 'Offer',         label: 'Offer Sent',    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', icon: Gift },
  { key: 'Accepted',      label: 'Accepted',      color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: Trophy },
  { key: 'Not Selected',  label: 'Rejected',      color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  icon: Ban },
]

const NEXT_ACTIONS = {
  Applied:    [{ label: 'Move to Screening', next: 'Screening', color: '#f59e0b' }, { label: 'Reject', next: 'Not Selected', color: '#ef4444' }],
  Screening:  [{ label: 'Schedule Interview', next: 'Interview', color: '#3b82f6' }, { label: 'Reject', next: 'Not Selected', color: '#ef4444' }],
  Interview:  [{ label: 'Send Job Offer', next: 'Offer', color: '#8b5cf6' }, { label: 'Reject', next: 'Not Selected', color: '#ef4444' }],
  Offer:      [{ label: '✓ Accepted by Candidate', next: 'Accepted', color: '#10b981' }, { label: '✗ Offer Declined', next: 'Not Selected', color: '#ef4444' }],
}

function ScoreBadge({ score }) {
  const color = score >= 90 ? '#10b981' : score >= 75 ? '#f59e0b' : '#ef4444'
  const bg = score >= 90 ? 'rgba(16,185,129,0.12)' : score >= 75 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)'
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: bg, color }}>
      ATS {score}%
    </span>
  )
}

export default function RecruiterDashboard() {
  const { user, postVerifiedJob } = useAppData()

  const [candidates, setCandidates] = useState(RECRUITER_CANDIDATES)
  const [listings, setListings] = useState(RECRUITER_LISTINGS)
  const [activeTab, setActiveTab] = useState('overview')  // 'overview' | 'pipeline' | 'listings' | 'interviews'
  const [selectedListing, setSelectedListing] = useState(null)   // filter pipeline by listing
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showPostJobModal, setShowPostJobModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [candidateForSchedule, setCandidateForSchedule] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Post job form
  const [jobTitle, setJobTitle] = useState('')
  const [jobLocation, setJobLocation] = useState('Nairobi, Kenya')
  const [jobType, setJobType] = useState('Full-time')
  const [jobSalary, setJobSalary] = useState('KES 80,000 – 120,000/mo')
  const [jobDesc, setJobDesc] = useState('')
  const [jobSkills, setJobSkills] = useState('')

  // Schedule form
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState('')
  const [meetingRound, setMeetingRound] = useState('Technical Interview')
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/career-compass-interview')

  const moveStage = (candidateId, nextStage) => {
    setCandidates(prev => prev.map(c =>
      c.id === candidateId
        ? {
            ...c,
            stage: nextStage,
            timeline: [...c.timeline, {
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              event: `Recruiter moved to ${nextStage}`,
            }],
          }
        : c
    ))
    // If a candidate is selected in review panel, update them too
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(prev => ({ ...prev, stage: nextStage }))
    }
    if (nextStage === 'Interview') {
      setCandidateForSchedule(candidates.find(c => c.id === candidateId))
      setShowScheduleModal(true)
    }
  }

  const handleSchedule = (e) => {
    e.preventDefault()
    if (!candidateForSchedule || !meetingDate || !meetingTime) return
    setCandidates(prev => prev.map(c =>
      c.id === candidateForSchedule.id
        ? { ...c, interviewDate: meetingDate, interviewTime: meetingTime, meetLink: meetingLink, stage: 'Interview', timeline: [...c.timeline, { date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), event: `${meetingRound} scheduled for ${meetingDate} at ${meetingTime}` }] }
        : c
    ))
    setShowScheduleModal(false)
    setCandidateForSchedule(null)
  }

  const handlePostJob = (e) => {
    e.preventDefault()
    if (!jobTitle.trim() || !jobDesc.trim()) return
    const newListing = {
      id: `rl${listings.length + 1}`,
      title: jobTitle.trim(),
      location: jobLocation,
      type: jobType,
      salary: jobSalary,
      postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deadline: 'Sep 30, 2026',
      isVerified: user?.isVerifiedEmployer || false,
      isActive: true,
      skills: jobSkills.split(',').map(s => s.trim()).filter(Boolean),
      description: jobDesc.trim(),
    }
    setListings(prev => [newListing, ...prev])
    postVerifiedJob({ title: jobTitle.trim(), location: jobLocation, type: jobType, salary: jobSalary, description: jobDesc.trim() })
    setJobTitle(''); setJobDesc(''); setJobSkills('')
    setShowPostJobModal(false)
  }

  // ── Computed Stats ─────────────────────────────────────────────────
  const activeListings = listings.filter(l => l.isActive).length
  const totalCandidates = candidates.length
  const inPipeline = candidates.filter(c => ['Screening', 'Interview', 'Offer'].includes(c.stage)).length
  const hired = candidates.filter(c => c.stage === 'Accepted').length
  const avgAts = Math.round(candidates.reduce((sum, c) => sum + c.atsScore, 0) / (candidates.length || 1))

  // ── Filtered candidates for pipeline view ─────────────────────────
  const pipelineCandidates = candidates.filter(c => {
    const matchListing = !selectedListing || c.listingId === selectedListing
    const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.university.toLowerCase().includes(searchQuery.toLowerCase())
    return matchListing && matchSearch
  })

  const byStage = STAGES.reduce((acc, s) => {
    acc[s.key] = pipelineCandidates.filter(c => c.stage === s.key)
    return acc
  }, {})

  // Interviews = candidates who have interview data
  const interviewCandidates = candidates.filter(c => c.interviewDate)

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* ── Header Strip ── */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 p-6 rounded-2xl border shadow-sm"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
      >
        <div>
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
              {user?.companyName || user?.name || 'Recruiter Portal'}
            </h1>
            {user?.isVerifiedEmployer ? (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                <ShieldCheck size={13} /> Verified Employer
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(234,179,8,0.15)', color: '#d97706' }}>
                Pending Anti-Scam Verification
              </span>
            )}
          </div>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            Review applicants, move candidates through the pipeline, schedule interviews, and extend job offers.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {!user?.isVerifiedEmployer && (
            <button
              onClick={() => setShowVerifyModal(true)}
              className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale"
              style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', color: 'white' }}
            >
              <ShieldCheck size={14} /> Verify Organization
            </button>
          )}
          <button
            onClick={() => setShowPostJobModal(true)}
            className="text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5 press-scale text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
          >
            <Plus size={14} /> Post New Job Listing
          </button>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Active Listings', value: activeListings, Icon: Briefcase, color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', tab: 'listings' },
          { label: 'Total Applicants', value: totalCandidates, Icon: Users, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', tab: 'pipeline' },
          { label: 'In Active Pipeline', value: inPipeline, Icon: ArrowRight, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', tab: 'pipeline' },
          { label: 'Offers Accepted', value: hired, Icon: Trophy, color: '#10b981', bg: 'rgba(16,185,129,0.12)', tab: 'pipeline' },
          { label: 'Avg ATS Match', value: `${avgAts}%`, Icon: BarChart3, color: '#ec4899', bg: 'rgba(236,72,153,0.12)', tab: 'pipeline' },
        ].map(({ label, value, Icon, color, bg, tab }) => (
          <div
            key={label}
            onClick={() => setActiveTab(tab)}
            className="p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all hover:border-purple-500/40 press-scale"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg, color }}>
              <Icon size={18} />
            </div>
            <div>
              <div className="font-display text-xl font-bold" style={{ color: 'var(--text-1)' }}>{value}</div>
              <div className="text-[11px] font-medium" style={{ color: 'var(--text-4)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tab Navigation ── */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'overview', label: 'Overview & Actions', icon: BarChart3 },
          { key: 'pipeline', label: 'Candidate Pipeline', icon: Users },
          { key: 'listings', label: 'Job Listings', icon: Briefcase },
          { key: 'interviews', label: 'Interviews Scheduled', icon: Video },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="text-xs px-5 py-2.5 rounded-xl font-semibold transition-all press-scale flex items-center gap-1.5"
            style={activeTab === key
              ? { background: 'var(--accent)', color: 'white' }
              : { background: 'var(--bg-card)', color: 'var(--text-3)', border: '1px solid var(--border-1)' }}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  OVERVIEW TAB                                  */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-3 gap-5">
          {/* Quick Action Cards */}
          <div className="md:col-span-2 space-y-4">
            {/* Stage flow diagram */}
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <h2 className="font-display text-sm font-bold mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-1)' }}>
                <Sparkles size={15} className="text-violet-400" /> Hiring Pipeline Flow
              </h2>
              <div className="flex items-center gap-1.5 flex-wrap">
                {STAGES.map((s, i) => (
                  <div key={s.key} className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: s.bg, color: s.color }}>
                      <s.icon size={12} />
                      <span>{s.label}</span>
                      <span className="ml-0.5 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                        {candidates.filter(c => c.stage === s.key).length}
                      </span>
                    </div>
                    {i < STAGES.length - 1 && <ArrowRight size={12} style={{ color: 'var(--text-5)' }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Candidates needing action */}
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <h2 className="font-display text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Zap size={15} className="text-amber-400" /> Candidates Awaiting Your Action
              </h2>
              <div className="flex flex-col gap-3">
                {candidates
                  .filter(c => ['Applied', 'Screening', 'Interview', 'Offer'].includes(c.stage))
                  .slice(0, 5)
                  .map(c => {
                    const listing = listings.find(l => l.id === c.listingId)
                    const actions = NEXT_ACTIONS[c.stage] || []
                    return (
                      <div
                        key={c.id}
                        className="flex items-center justify-between gap-4 p-3.5 rounded-xl border transition-all hover:border-violet-500/40"
                        style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 text-white"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                          >
                            {c.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold truncate" style={{ color: 'var(--text-1)' }}>{c.name}</div>
                            <div className="text-[11px]" style={{ color: 'var(--text-4)' }}>{listing?.title || c.listingId}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <ScoreBadge score={c.atsScore} />
                          {actions.slice(0, 1).map(action => (
                            <button
                              key={action.next}
                              onClick={() => moveStage(c.id, action.next)}
                              className="text-[11px] px-3 py-1.5 rounded-lg font-bold press-scale text-white flex items-center gap-1"
                              style={{ background: action.color }}
                            >
                              {action.label} <ChevronRight size={11} />
                            </button>
                          ))}
                          <button
                            onClick={() => { setSelectedCandidate(c); setActiveTab('pipeline') }}
                            className="text-[11px] px-2.5 py-1.5 rounded-lg font-semibold press-scale border"
                            style={{ borderColor: 'var(--border-1)', color: 'var(--text-3)' }}
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <button
                onClick={() => setActiveTab('pipeline')}
                className="mt-3 text-xs font-bold text-center w-full py-2 rounded-xl border press-scale"
                style={{ borderColor: 'var(--border-1)', color: 'var(--accent)' }}
              >
                View Full Candidate Pipeline →
              </button>
            </div>
          </div>

          {/* Sidebar: Listings summary + upcoming interviews */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <h2 className="font-display text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Briefcase size={14} className="text-violet-400" /> Your Active Listings
              </h2>
              {listings.filter(l => l.isActive).map(l => (
                <div
                  key={l.id}
                  onClick={() => { setSelectedListing(l.id); setActiveTab('pipeline') }}
                  className="flex items-center justify-between py-2.5 border-b cursor-pointer hover:opacity-80 transition-opacity text-xs"
                  style={{ borderColor: 'var(--border-3)' }}
                >
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--text-1)' }}>{l.title}</div>
                    <div style={{ color: 'var(--text-4)' }}>{l.location} · {l.type}</div>
                  </div>
                  <div className="font-bold px-2 py-0.5 rounded-full text-[10px]" style={{ background: 'rgba(124,58,237,0.12)', color: '#7c3aed' }}>
                    {candidates.filter(c => c.listingId === l.id).length} applicants
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowPostJobModal(true)}
                className="mt-3 w-full text-xs py-2 rounded-xl font-bold press-scale text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
              >
                <Plus size={12} className="inline mr-1" /> Post New Listing
              </button>
            </div>

            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <h2 className="font-display text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Video size={14} className="text-amber-400" /> Upcoming Interviews
              </h2>
              {interviewCandidates.slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center justify-between py-2.5 text-xs border-b" style={{ borderColor: 'var(--border-3)' }}>
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--text-1)' }}>{c.name}</div>
                    <div style={{ color: 'var(--text-4)' }}>{c.interviewDate} at {c.interviewTime}</div>
                  </div>
                  <a href={c.meetLink} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] px-2 py-1 rounded-lg font-bold text-white press-scale"
                    style={{ background: '#10b981' }}
                  >
                    Join
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/*  CANDIDATE PIPELINE TAB                        */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'pipeline' && (
        <div>
          {/* Filter toolbar */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by candidate name or university..."
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Filter size={13} style={{ color: 'var(--text-5)' }} />
              <button
                onClick={() => setSelectedListing(null)}
                className="px-3 py-1.5 rounded-lg font-semibold"
                style={{ background: !selectedListing ? 'var(--accent)' : 'var(--surface-hover)', color: !selectedListing ? 'white' : 'var(--text-4)' }}
              >
                All Listings
              </button>
              {listings.map(l => (
                <button
                  key={l.id}
                  onClick={() => setSelectedListing(l.id === selectedListing ? null : l.id)}
                  className="px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap"
                  style={{ background: selectedListing === l.id ? 'var(--accent)' : 'var(--surface-hover)', color: selectedListing === l.id ? 'white' : 'var(--text-4)' }}
                >
                  {l.title}
                </button>
              ))}
            </div>
          </div>

          {/* Two-row Kanban */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {STAGES.slice(0, 3).map(stage => (
              <PipelineColumn
                key={stage.key}
                stage={stage}
                candidates={byStage[stage.key] || []}
                listings={listings}
                onReview={setSelectedCandidate}
                onMove={moveStage}
                onSchedule={c => { setCandidateForSchedule(c); setShowScheduleModal(true) }}
              />
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {STAGES.slice(3).map(stage => (
              <PipelineColumn
                key={stage.key}
                stage={stage}
                candidates={byStage[stage.key] || []}
                listings={listings}
                onReview={setSelectedCandidate}
                onMove={moveStage}
                onSchedule={c => { setCandidateForSchedule(c); setShowScheduleModal(true) }}
              />
            ))}
          </div>

          {/* Side panel: Candidate Review */}
          {selectedCandidate && (
            <CandidateReviewPanel
              candidate={selectedCandidate}
              listing={listings.find(l => l.id === selectedCandidate.listingId)}
              onClose={() => setSelectedCandidate(null)}
              onMove={moveStage}
              onSchedule={c => { setCandidateForSchedule(c); setShowScheduleModal(true) }}
            />
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/*  JOB LISTINGS TAB                              */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium" style={{ color: 'var(--text-3)' }}>
              {listings.filter(l => l.isActive).length} active listings · {listings.filter(l => !l.isActive).length} closed
            </p>
            <button
              onClick={() => setShowPostJobModal(true)}
              className="text-xs px-4 py-2 rounded-xl font-semibold text-white press-scale"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              <Plus size={13} className="inline mr-1" /> Post New Listing
            </button>
          </div>

          {listings.map(listing => {
            const applicants = candidates.filter(c => c.listingId === listing.id)
            const stageBreakdown = STAGES.slice(0, 5).map(s => ({
              ...s, count: applicants.filter(c => c.stage === s.key).length,
            }))
            return (
              <div
                key={listing.id}
                className="rounded-2xl p-5 border transition-all hover:border-violet-500/40"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-base" style={{ color: 'var(--text-1)' }}>{listing.title}</span>
                      {listing.isVerified && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                          <ShieldCheck size={10} /> Verified
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold`} style={{ background: listing.isActive ? 'rgba(99,102,241,0.12)' : 'rgba(100,116,139,0.12)', color: listing.isActive ? '#6366f1' : '#94a3b8' }}>
                        {listing.isActive ? 'Active' : 'Closed'}
                      </span>
                    </div>
                    <div className="text-xs flex items-center gap-3" style={{ color: 'var(--text-4)' }}>
                      <span className="flex items-center gap-1"><MapPin size={11} />{listing.location}</span>
                      <span>·</span><span>{listing.type}</span>
                      <span>·</span><span>{listing.salary}</span>
                      <span>·</span><span>Posted {listing.postedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="font-bold text-xl" style={{ color: 'var(--text-1)' }}>{applicants.length}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-5)' }}>Applicants</div>
                    </div>
                    <button
                      onClick={() => { setSelectedListing(listing.id); setActiveTab('pipeline') }}
                      className="text-xs px-3.5 py-2 rounded-xl font-bold press-scale text-white"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                    >
                      Review Candidates →
                    </button>
                  </div>
                </div>

                {/* Per-stage mini breakdown */}
                <div className="flex gap-2 flex-wrap">
                  {stageBreakdown.filter(s => s.count > 0).map(s => (
                    <span key={s.key} className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: s.bg, color: s.color }}>
                      {s.label}: {s.count}
                    </span>
                  ))}
                </div>

                {/* Skills needed */}
                {listing.skills.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-3)' }}>
                    <span className="text-[10px] font-bold" style={{ color: 'var(--text-5)' }}>Requires:</span>
                    {listing.skills.map(skill => (
                      <span key={skill} className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: 'var(--accent-bg-subtle)', color: 'var(--accent-text)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/*  INTERVIEWS TAB                                */}
      {/* ═══════════════════════════════════════════════ */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <p className="text-sm mb-4" style={{ color: 'var(--text-4)' }}>
            {interviewCandidates.length} candidates have been scheduled for interview rounds.
          </p>
          {interviewCandidates.length === 0 && (
            <div className="rounded-2xl p-12 text-center border border-dashed" style={{ borderColor: 'var(--border-2)' }}>
              <Video size={36} className="mx-auto mb-3" style={{ color: 'var(--text-5)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--text-3)' }}>No interviews scheduled yet. Move candidates to the Interview stage.</p>
            </div>
          )}
          {interviewCandidates.map(c => {
            const listing = listings.find(l => l.id === c.listingId)
            const stage = STAGES.find(s => s.key === c.stage)
            return (
              <div
                key={c.id}
                className="rounded-2xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-violet-500/40"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                  >
                    {c.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                      {c.name}
                      <ScoreBadge score={c.atsScore} />
                    </div>
                    <div className="text-xs flex items-center gap-3 mt-0.5 flex-wrap" style={{ color: 'var(--text-4)' }}>
                      <span className="flex items-center gap-1"><GraduationCap size={12} />{c.university}</span>
                      <span>·</span>
                      <span>{listing?.title || 'Open Role'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="text-xs text-center px-3 py-2 rounded-xl font-mono" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>
                    <div className="font-bold">{c.interviewDate}</div>
                    <div>{c.interviewTime}</div>
                  </div>

                  {c.meetLink && (
                    <a
                      href={c.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-4 py-2.5 rounded-xl font-bold text-white press-scale flex items-center gap-1.5 shadow"
                      style={{ background: '#10b981' }}
                    >
                      <Video size={13} /> Join Meeting
                    </a>
                  )}

                  <button
                    onClick={() => { moveStage(c.id, 'Offer'); }}
                    className="text-xs px-3.5 py-2.5 rounded-xl font-bold press-scale text-white"
                    style={{ background: '#8b5cf6' }}
                  >
                    <Gift size={13} className="inline mr-1" /> Send Offer
                  </button>

                  <button
                    onClick={() => { moveStage(c.id, 'Not Selected'); }}
                    className="text-xs px-3 py-2.5 rounded-xl font-semibold press-scale"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Modals ─────────────────────────────────────────────────── */}
      <VerificationModal isOpen={showVerifyModal} onClose={() => setShowVerifyModal(false)} />

      {showPostJobModal && (
        <Modal title="Post a New Verified Job Listing" onClose={() => setShowPostJobModal(false)}>
          <form onSubmit={handlePostJob} className="space-y-3">
            {[
              { label: 'Job Title', required: true, val: jobTitle, set: setJobTitle, ph: 'e.g. Senior React Developer' },
              { label: 'Location', val: jobLocation, set: setJobLocation, ph: 'Nairobi / Remote' },
              { label: 'Salary Range', val: jobSalary, set: setJobSalary, ph: 'KES 80,000 – 120,000/mo' },
              { label: 'Required Skills (comma separated)', val: jobSkills, set: setJobSkills, ph: 'React, Node.js, SQL' },
            ].map(({ label, required, val, set, ph }) => (
              <div key={label}>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
                <input type="text" required={required} value={val} onChange={e => set(e.target.value)} placeholder={ph}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>Job Type</label>
              <select value={jobType} onChange={e => setJobType(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}>
                <option>Full-time</option><option>Internship</option><option>Contract</option><option>Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>Job Description <span className="text-red-400">*</span></label>
              <textarea rows={4} required value={jobDesc} onChange={e => setJobDesc(e.target.value)}
                placeholder="Describe responsibilities, technologies, qualifications..."
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none resize-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm text-white press-scale"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
              Publish with Anti-Scam Verified Badge
            </button>
          </form>
        </Modal>
      )}

      {showScheduleModal && candidateForSchedule && (
        <Modal title={`Schedule Interview — ${candidateForSchedule.name}`} onClose={() => { setShowScheduleModal(false); setCandidateForSchedule(null) }}>
          <form onSubmit={handleSchedule} className="space-y-3">
            <div className="p-3 rounded-xl text-xs border font-medium" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
              Candidate: <strong style={{ color: 'var(--text-1)' }}>{candidateForSchedule.name}</strong> · {listings.find(l => l.id === candidateForSchedule.listingId)?.title}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>Date <span className="text-red-400">*</span></label>
                <input type="date" required value={meetingDate} onChange={e => setMeetingDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>Time <span className="text-red-400">*</span></label>
                <input type="time" required value={meetingTime} onChange={e => setMeetingTime(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>Interview Round</label>
              <select value={meetingRound} onChange={e => setMeetingRound(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}>
                <option>Phone Screen</option><option>Technical Interview</option><option>HR Interview</option><option>Final Round</option><option>Culture Fit</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>Google Meet / Zoom Link</label>
              <input type="text" value={meetingLink} onChange={e => setMeetingLink(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }} />
            </div>
            <button type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-sm text-white press-scale"
              style={{ background: 'var(--accent)' }}>
              <Calendar size={14} className="inline mr-1.5" /> Schedule & Notify Candidate
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

// ── Pipeline Column ──────────────────────────────────────────────────────────
function PipelineColumn({ stage, candidates, listings, onReview, onMove, onSchedule }) {
  const Icon = stage.icon
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--border-1)', background: stage.bg }}>
        <Icon size={14} style={{ color: stage.color }} />
        <span className="text-xs font-bold" style={{ color: stage.color }}>{stage.label}</span>
        <span className="ml-auto text-xs font-mono font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-card)', color: stage.color }}>
          {candidates.length}
        </span>
      </div>
      <div className="p-3 space-y-3 min-h-[120px]">
        {candidates.length === 0 && (
          <div className="py-8 text-center text-xs" style={{ color: 'var(--text-5)' }}>No candidates in this stage</div>
        )}
        {candidates.map(c => {
          const listing = listings.find(l => l.id === c.listingId)
          const actions = NEXT_ACTIONS[c.stage] || []
          return (
            <div
              key={c.id}
              className="p-3.5 rounded-xl border cursor-pointer transition-all hover:border-violet-500/30 hover:shadow-md"
              style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}
              onClick={() => onReview(c)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                  >
                    {c.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate" style={{ color: 'var(--text-1)' }}>{c.name}</div>
                    <div className="text-[10px] truncate" style={{ color: 'var(--text-4)' }}>{listing?.title || 'Open Role'}</div>
                  </div>
                </div>
                <ScoreBadge score={c.atsScore} />
              </div>

              <div className="text-[10px] mb-2.5 flex items-center gap-1" style={{ color: 'var(--text-5)' }}>
                <GraduationCap size={10} />{c.university}
              </div>

              <div className="flex gap-1.5 flex-wrap" onClick={e => e.stopPropagation()}>
                {actions.map(action => (
                  <button
                    key={action.next}
                    onClick={() => { if (action.next === 'Interview') onSchedule(c); onMove(c.id, action.next) }}
                    className="text-[10px] px-2 py-1 rounded-lg font-bold press-scale"
                    style={{ background: `${action.color}20`, color: action.color }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Candidate Detail Side Panel ───────────────────────────────────────────────
function CandidateReviewPanel({ candidate: c, listing, onClose, onMove, onSchedule }) {
  const actions = NEXT_ACTIONS[c.stage] || []
  return (
    <div
      className="fixed inset-y-0 right-0 z-40 flex flex-col shadow-2xl border-l animate-fadeIn"
      style={{ width: '380px', background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-1)' }}>
        <div>
          <div className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
            {c.name}
          </div>
          <div className="text-xs" style={{ color: 'var(--accent-text)' }}>{listing?.title || 'Open Role'}</div>
        </div>
        <div className="flex items-center gap-2">
          <ScoreBadge score={c.atsScore} />
          <button onClick={onClose} className="text-xs p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" style={{ color: 'var(--text-4)' }}>✕</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Contact */}
        <div className="space-y-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
          <div className="flex items-center gap-2"><GraduationCap size={12} className="shrink-0" />{c.course}</div>
          <div className="flex items-center gap-2"><MapPin size={12} className="shrink-0" />{c.location}</div>
          <div className="flex items-center gap-2"><Phone size={12} className="shrink-0" />{c.phone}</div>
        </div>

        {/* Skill Match */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>Skill Match Analysis</div>
          <div className="flex flex-col gap-1.5">
            {c.matchedSkills.map(s => (
              <div key={s} className="text-xs flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span style={{ color: 'var(--text-2)' }}>{s}</span>
              </div>
            ))}
            {c.missingSkills.map(s => (
              <div key={s} className="text-xs flex items-center gap-1.5">
                <XCircle size={13} className="text-red-400 shrink-0" />
                <span style={{ color: 'var(--text-4)' }}>{s} — not demonstrated</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>Cover Letter Excerpt</div>
          <p className="text-xs leading-relaxed p-3 rounded-xl border italic" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
            "{c.coverLetter}"
          </p>
        </div>

        {/* CV file */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>Submitted CV</div>
          <div className="text-xs flex items-center gap-2 p-3 rounded-xl border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
            <FileText size={15} className="text-violet-400 shrink-0" />
            <span style={{ color: 'var(--accent-text)' }}>{c.cvFile}</span>
          </div>
        </div>

        {/* Notes */}
        {c.notes && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>Recruiter Notes</div>
            <p className="text-xs leading-relaxed p-3 rounded-xl border" style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.2)', color: 'var(--text-3)' }}>
              {c.notes}
            </p>
          </div>
        )}

        {/* Interview info */}
        {c.interviewDate && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>Interview Scheduled</div>
            <div className="text-xs p-3 rounded-xl border flex items-center justify-between" style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)' }}>
              <span className="font-mono text-amber-400 font-bold">{c.interviewDate} at {c.interviewTime}</span>
              {c.meetLink && (
                <a href={c.meetLink} target="_blank" rel="noopener noreferrer" className="text-[10px] px-2.5 py-1 rounded-lg font-bold text-white" style={{ background: '#10b981' }}>
                  Join Meeting
                </a>
              )}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>Activity Timeline</div>
          <div className="space-y-2 relative before:absolute before:left-2.5 before:top-1 before:bottom-1 before:w-0.5 before:bg-slate-700/30">
            {c.timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-3 pl-6 relative">
                <div className="absolute left-1 top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2" style={{ borderColor: 'var(--bg-card)' }} />
                <div>
                  <span className="text-[10px] font-bold font-mono" style={{ color: 'var(--accent-text)' }}>{t.date}</span>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel Footer Actions */}
      <div className="p-4 border-t space-y-2" style={{ borderColor: 'var(--border-1)' }}>
        {actions.map(action => (
          <button
            key={action.next}
            onClick={() => { if (action.next === 'Interview') onSchedule(c); onMove(c.id, action.next); onClose() }}
            className="w-full py-2.5 rounded-xl text-sm font-bold press-scale text-white"
            style={{ background: action.color }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
