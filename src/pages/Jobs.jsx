import { useState, useMemo } from 'react'
import {
  Search, ShieldCheck, Bell, MessageSquare, SlidersHorizontal,
  Laptop, Building2, Users, ChevronDown, ChevronUp, X,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import JobCard from '../components/domain/JobCard'
import Modal from '../components/ui/Modal'

// ─── Filter options ──────────────────────────────────────────────────────────
const WORK_MODES    = ['All', 'Remote', 'Hybrid', 'Onsite']
const JOB_TYPES     = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Internship']
const EXP_LEVELS    = ['All', 'Entry Level', 'Mid Level', 'Senior']
const SORT_OPTIONS  = [
  { value: 'match',   label: 'Best Match' },
  { value: 'recent',  label: 'Most Recent' },
  { value: 'az',      label: 'A → Z' },
]

// work-mode icon mapping
const WORK_MODE_ICONS = {
  Remote: Laptop,
  Hybrid: Users,
  Onsite: Building2,
}

export default function Jobs() {
  const { jobs, applications, toggleSaveJob } = useAppData()

  // search & filter state
  const [search, setSearch]           = useState('')
  const [workMode, setWorkMode]       = useState('All')
  const [jobType, setJobType]         = useState('All')
  const [expLevel, setExpLevel]       = useState('All')
  const [sortBy, setSortBy]           = useState('match')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [subscribed, setSubscribed]   = useState(false)

  const appliedJobIds = useMemo(() => new Set(applications.map(a => a.jobId)), [applications])

  // active filter count badge
  const activeCount = [
    workMode !== 'All',
    jobType  !== 'All',
    expLevel !== 'All',
  ].filter(Boolean).length

  const clearFilters = () => {
    setWorkMode('All')
    setJobType('All')
    setExpLevel('All')
    setSearch('')
  }

  const filtered = useMemo(() => {
    let list = jobs.filter(job => {
      // text search
      if (search) {
        const q = search.toLowerCase()
        if (
          !job.title?.toLowerCase().includes(q) &&
          !job.company?.toLowerCase().includes(q) &&
          !(job.skills || []).some(s => s.toLowerCase().includes(q)) &&
          !job.location?.toLowerCase().includes(q)
        ) return false
      }

      // work mode
      if (workMode !== 'All') {
        const jm = (job.workMode || '').toLowerCase()
        const jl = (job.location || '').toLowerCase()
        const jt = (job.type || '').toLowerCase()
        if (workMode === 'Remote')  { if (!jm.includes('remote') && !jl.includes('remote')) return false }
        if (workMode === 'Onsite')  { if (!jm.includes('onsite') && !jm.includes('on-site') && jm !== '') {
          if (jm.includes('remote') || jl.includes('remote')) return false
        }}
        if (workMode === 'Hybrid')  { if (!jm.includes('hybrid') && !jt.includes('hybrid') && !jl.includes('hybrid')) return false }
      }

      // job type
      if (jobType !== 'All') {
        const jt = (job.type || '').toLowerCase()
        if (!jt.includes(jobType.toLowerCase())) return false
      }

      // experience level
      if (expLevel !== 'All') {
        const jl = (job.experienceLevel || '').toLowerCase()
        const jt = (job.title || '').toLowerCase()
        const match =
          jl.includes(expLevel.toLowerCase()) ||
          (expLevel === 'Senior'      && (jt.includes('senior') || jt.includes('lead') || jt.includes('principal'))) ||
          (expLevel === 'Entry Level' && (jt.includes('junior') || jt.includes('entry') || jt.includes('intern') || jt.includes('graduate'))) ||
          (expLevel === 'Mid Level'   && jl === '')
        if (!match) return false
      }

      return true
    })

    // sort
    if (sortBy === 'match')  list = list.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    if (sortBy === 'recent') list = list.sort((a, b) => {
      const da = a.postedDate === 'Recently' ? Date.now() : new Date(a.postedDate).getTime()
      const db = b.postedDate === 'Recently' ? Date.now() : new Date(b.postedDate).getTime()
      return db - da
    })
    if (sortBy === 'az') list = list.sort((a, b) => (a.title || '').localeCompare(b.title || ''))

    return list
  }, [jobs, search, workMode, jobType, expLevel, sortBy])

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-fadeIn">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
            Discover Verified Opportunities
          </h1>
          <p className="text-sm flex items-center gap-1.5 flex-wrap" style={{ color: 'var(--text-4)' }}>
            <span>
              <strong style={{ color: 'var(--accent-text)' }}>{filtered.length}</strong> opportunities matched
            </span>
            <span>•</span>
            <span className="text-emerald-500 font-medium flex items-center gap-1">
              <ShieldCheck size={14} /> 100% Anti-Scam Screened
            </span>
          </p>
        </div>

        <button
          onClick={() => setShowAlertModal(true)}
          className="text-xs px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 text-white press-scale shrink-0"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
        >
          <Bell size={14} /> Get Job Alerts
        </button>
      </div>

      {/* ── Anti-Scam Banner ── */}
      <div className="p-4 rounded-xl mb-5 flex items-center gap-3 border text-xs" style={{ background: 'rgba(16, 185, 129, 0.06)', borderColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--text-2)' }}>
        <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
        <div>
          <strong>CareerCompass Anti-Scam Shield:</strong> Every listing is checked for employer legitimacy, active deadline validity, and zero fee requirements. <em>Never pay money to apply.</em>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
        <input
          type="text"
          placeholder="Search jobs, companies, skills, location (e.g. React, Safaricom, Nairobi)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:opacity-70"
            style={{ color: 'var(--text-5)' }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Quick Work-Mode Pills (always visible) ── */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {WORK_MODES.map(mode => {
          const Icon = WORK_MODE_ICONS[mode]
          const active = workMode === mode
          return (
            <button
              key={mode}
              onClick={() => setWorkMode(mode)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all press-scale border"
              style={{
                background:     active ? 'var(--accent)' : 'var(--bg-card)',
                color:          active ? 'white' : 'var(--text-3)',
                borderColor:    active ? 'var(--accent)' : 'var(--border-1)',
                boxShadow:      active ? '0 2px 10px rgba(99,102,241,0.3)' : 'none',
              }}
            >
              {Icon && <Icon size={13} />}
              {mode === 'All' ? '🌐 All Modes' : mode}
            </button>
          )
        })}

        {/* Expand more filters toggle */}
        <button
          onClick={() => setFiltersOpen(v => !v)}
          className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all press-scale"
          style={{
            background:  filtersOpen ? 'rgba(99,102,241,0.12)' : 'var(--bg-card)',
            borderColor: filtersOpen ? 'rgba(99,102,241,0.4)' : 'var(--border-1)',
            color:       filtersOpen ? 'var(--accent-text)' : 'var(--text-3)',
          }}
        >
          <SlidersHorizontal size={13} />
          Filters
          {activeCount > 0 && (
            <span className="w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              {activeCount}
            </span>
          )}
          {filtersOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* ── Expanded Filter Panel ── */}
      {filtersOpen && (
        <div
          className="mb-5 p-5 rounded-2xl border animate-fadeIn"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Job Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>
                Job Type
              </label>
              <div className="flex flex-col gap-1.5">
                {JOB_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setJobType(t)}
                    className="text-left px-3 py-2 rounded-lg text-xs font-medium transition-all border"
                    style={{
                      background:  jobType === t ? 'var(--accent-bg)' : 'transparent',
                      borderColor: jobType === t ? 'var(--accent)' : 'transparent',
                      color:       jobType === t ? 'var(--accent-text)' : 'var(--text-3)',
                    }}
                  >
                    {t === 'All' ? '✦ All Types' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>
                Experience Level
              </label>
              <div className="flex flex-col gap-1.5">
                {EXP_LEVELS.map(l => (
                  <button
                    key={l}
                    onClick={() => setExpLevel(l)}
                    className="text-left px-3 py-2 rounded-lg text-xs font-medium transition-all border"
                    style={{
                      background:  expLevel === l ? 'var(--accent-bg)' : 'transparent',
                      borderColor: expLevel === l ? 'var(--accent)' : 'transparent',
                      color:       expLevel === l ? 'var(--accent-text)' : 'var(--text-3)',
                    }}
                  >
                    {l === 'All' ? '✦ All Levels' : l}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-5)' }}>
                Sort By
              </label>
              <div className="flex flex-col gap-1.5">
                {SORT_OPTIONS.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setSortBy(s.value)}
                    className="text-left px-3 py-2 rounded-lg text-xs font-medium transition-all border"
                    style={{
                      background:  sortBy === s.value ? 'var(--accent-bg)' : 'transparent',
                      borderColor: sortBy === s.value ? 'var(--accent)' : 'transparent',
                      color:       sortBy === s.value ? 'var(--accent-text)' : 'var(--text-3)',
                    }}
                  >
                    {sortBy === s.value ? '● ' : '○ '}{s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear all */}
          {(activeCount > 0 || search) && (
            <div className="mt-4 pt-4 border-t flex justify-end" style={{ borderColor: 'var(--border-2)' }}>
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg press-scale border"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-4)' }}
              >
                <X size={13} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active filter summary chips */}
      {(activeCount > 0 || search) && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs" style={{ color: 'var(--text-5)' }}>Active:</span>
          {search && (
            <Chip label={`"${search}"`} onRemove={() => setSearch('')} />
          )}
          {workMode !== 'All' && <Chip label={workMode} onRemove={() => setWorkMode('All')} />}
          {jobType  !== 'All' && <Chip label={jobType}  onRemove={() => setJobType('All')}  />}
          {expLevel !== 'All' && <Chip label={expLevel} onRemove={() => setExpLevel('All')} />}
        </div>
      )}

      {/* ── Job Grid ── */}
      {filtered.length === 0 ? (
        <div className="rounded-xl p-12 text-center" style={{ background: 'var(--bg-card)', border: '1px dashed var(--border-2)' }}>
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-2)' }}>No jobs match your current filters</p>
          <p className="text-xs mb-4" style={{ color: 'var(--text-5)' }}>Try adjusting the work mode, job type, or experience level.</p>
          <button
            onClick={clearFilters}
            className="text-xs px-4 py-2 rounded-xl font-medium press-scale border"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job, i) => (
            <JobCard
              key={job.id}
              job={job}
              saved={job.saved}
              applied={appliedJobIds.has(job.id)}
              onToggleSave={toggleSaveJob}
              style={{ animationDelay: `${i * 0.04}s` }}
            />
          ))}
        </div>
      )}

      {/* ── Alert Subscription Modal ── */}
      {showAlertModal && (
        <Modal title="Subscribe to Instant Job Alerts" onClose={() => setShowAlertModal(false)}>
          {subscribed ? (
            <div className="p-6 text-center animate-celebrate">
              <ShieldCheck size={40} className="mx-auto mb-2 text-emerald-500" />
              <h4 className="font-display font-bold text-sm text-emerald-500">Alerts Activated!</h4>
              <p className="text-xs mt-1" style={{ color: 'var(--text-4)' }}>
                You'll receive real-time notifications for newly verified roles matching your profile.
              </p>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSubscribed(true); setTimeout(() => setShowAlertModal(false), 1600) }}
              className="space-y-4"
            >
              <p className="text-xs" style={{ color: 'var(--text-4)' }}>
                Get daily digests of newly posted verified jobs sent to your mobile app.
              </p>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Phone / WhatsApp Number</label>
                <input
                  type="text"
                  required
                  placeholder="+254 700 000 000"
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Preferred Channel</label>
                <select className="w-full px-3 py-2 text-sm rounded-lg outline-none" style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}>
                  <option value="whatsapp">WhatsApp Alerts</option>
                  <option value="telegram">Telegram Alerts</option>
                  <option value="email">Email Daily Digest</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 press-scale"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                <MessageSquare size={14} /> Subscribe Free
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  )
}

// ─── tiny chip component ──────────────────────────────────────────────────────
function Chip({ label, onRemove }) {
  return (
    <span
      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border"
      style={{ background: 'var(--accent-bg)', borderColor: 'var(--accent)', color: 'var(--accent-text)' }}
    >
      {label}
      <button onClick={onRemove} className="hover:opacity-70 ml-0.5">
        <X size={11} />
      </button>
    </span>
  )
}
