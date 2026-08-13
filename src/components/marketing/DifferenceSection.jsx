import StatusBadge from '../domain/StatusBadge'
import { ShieldCheck, Zap } from 'lucide-react'

export default function DifferenceSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-block text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 border"
          style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)', color: '#10b981' }}>
          WHY CAREERCOMPASS
        </div>
        <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-1)' }}>
          Built different. On purpose.
        </h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-4)' }}>
          We designed CareerCompass around what job seekers actually need — not what keeps them paying monthly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Card 1 */}
        <div className="rounded-2xl p-8 border relative overflow-hidden"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '180px', height: '180px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }} />
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
            <ShieldCheck size={18} />
          </div>
          <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>
            Calm, not chaotic
          </h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-4)' }}>
            A rejection already feels bad. The interface shouldn't make it worse. We call a closed
            application what it is — not "Rejected" in harsh red.
          </p>
          <StatusBadge status="Not Selected" />
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl p-8 border relative overflow-hidden"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '180px', height: '180px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          }} />
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(124,58,237,0.12)', color: '#7c3aed' }}>
            <Zap size={18} />
          </div>
          <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>
            Free to start — not metered
          </h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-4)' }}>
            Job discovery, application tracking, and interview prep don't need a monthly cap.
            They're core features — free with no tier to unlock.
          </p>
          <div className="flex flex-wrap gap-2">
            {['AI Resume Match', 'Application Tracker', 'Mock Interview', 'CV Center'].map(f => (
              <span key={f} className="text-xs px-3 py-1 rounded-full font-medium border"
                style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
                ✓ {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
