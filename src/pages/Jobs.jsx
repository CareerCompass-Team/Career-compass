import { useState, useMemo } from 'react'
import { Search, ShieldCheck, Bell, MessageSquare } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import FilterGroup from '../components/ui/FilterGroup'
import JobCard from '../components/domain/JobCard'
import Modal from '../components/ui/Modal'

const TYPE_FILTERS = ['All', 'Internship', 'Full-time']
const LOCATION_FILTERS = ['All', 'Nairobi', 'Remote']

export default function Jobs() {
  const { jobs, applications, toggleSaveJob } = useAppData()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [sortBy, setSortBy] = useState('match')
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const appliedJobIds = useMemo(() => new Set(applications.map(a => a.jobId)), [applications])

  const filtered = jobs
    .filter(job => {
      if (search) {
        const q = search.toLowerCase()
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.company.toLowerCase().includes(q) &&
          !job.skills.some(s => s.toLowerCase().includes(q))
        ) return false
      }
      if (typeFilter !== 'All' && job.type !== typeFilter) return false
      if (locationFilter !== 'All' && !job.location.includes(locationFilter)) return false
      return true
    })
    .sort((a, b) => (sortBy === 'match' ? b.matchScore - a.matchScore : 0))

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
            Discover Verified Opportunities
          </h1>
          <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
            <span>{filtered.length} opportunities matched to your profile</span>
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
          <Bell size={14} /> Get Daily WhatsApp / Telegram Alerts
        </button>
      </div>

      {/* Anti Scam Shield Banner */}
      <div className="p-4 rounded-xl mb-6 flex items-center justify-between gap-3 border text-xs" style={{ background: 'rgba(16, 185, 129, 0.06)', borderColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--text-2)' }}>
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
          <div>
            <strong>CareerCompass Anti-Scam Shield:</strong> Every job listing is checked for employer legitimacy, active deadline validity, and zero fee requirements. Never pay money to apply.
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
        <input
          type="text"
          placeholder="Search jobs, companies, skills (e.g. React, Safaricom, Python)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <FilterGroup label="Type" options={TYPE_FILTERS} value={typeFilter} onChange={setTypeFilter} />
        <FilterGroup label="Location" options={LOCATION_FILTERS} value={locationFilter} onChange={setLocationFilter} />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--text-5)' }}>Sort:</span>
          {['match', 'recent'].map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className="text-xs px-3 py-1.5 rounded-lg transition-colors capitalize press-scale"
              style={{
                background: sortBy === s ? 'var(--accent-bg)' : 'var(--surface-hover)',
                color: sortBy === s ? 'var(--accent-text)' : 'var(--text-4)',
                border: sortBy === s ? '1px solid var(--border-1)' : '1px solid transparent',
              }}
            >
              {s === 'match' ? 'Best Match' : 'Most Recent'}
            </button>
          ))}
        </div>
      </div>

      {/* Job Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl p-10 text-center" style={{ background: 'var(--bg-card)', border: '1px dashed var(--border-2)' }}>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>No jobs match your filters right now.</p>
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

      {/* WhatsApp / Telegram Alerts Modal */}
      {showAlertModal && (
        <Modal title="Subscribe to Instant Job Alerts" onClose={() => setShowAlertModal(false)}>
          {subscribed ? (
            <div className="p-6 text-center animate-celebrate">
              <ShieldCheck size={40} className="mx-auto mb-2 text-emerald-500" />
              <h4 className="font-display font-bold text-sm text-emerald-500">Alerts Activated!</h4>
              <p className="text-xs mt-1" style={{ color: 'var(--text-4)' }}>
                You will receive real-time notifications for newly verified Nairobi & Remote tech roles.
              </p>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSubscribed(true); setTimeout(() => setShowAlertModal(false), 1500) }}
              className="space-y-4"
            >
              <p className="text-xs" style={{ color: 'var(--text-4)' }}>
                Get daily digests of newly posted verified jobs sent straight to your mobile messaging app.
              </p>

              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-3)' }}>Phone Number / WhatsApp Number</label>
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

