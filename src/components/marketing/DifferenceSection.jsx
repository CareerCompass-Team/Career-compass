import { useState } from 'react'
import { ShieldCheck, Zap, X, Check } from 'lucide-react'

export default function DifferenceSection() {
  const [activeCompareTab, setActiveCompareTab] = useState('all')

  const comparisons = [
    {
      feature: 'Employer Verification',
      old: 'Anyone can post without identity or company checks',
      new: '100% Anti-Scam verified with KRA PIN & organization check',
      highlight: true,
    },
    {
      feature: 'ATS Resume Scoring',
      old: 'Paid add-on or restricted to third-party tools',
      new: 'Free built-in ATS matching & keyword optimizer',
      highlight: true,
    },
    {
      feature: 'Application Pipeline',
      old: 'Manual spreadsheets or messy email threads',
      new: 'Visual Kanban board with automated stage progression',
      highlight: true,
    },
    {
      feature: 'AI Interview Practice',
      old: 'Expensive coaching sessions ($50+/hr)',
      new: 'Built-in AI mock interviews with STAR framework scoring',
      highlight: true,
    },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-1)' }}>
          Built different. On purpose.
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--text-4)' }}>
          We designed CareerCompass around what Kenyan job seekers actually need — not what keeps them trapped in monthly subscriptions.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div
        className="rounded-2xl border overflow-hidden p-6 md:p-8"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border-2)', color: 'var(--text-4)' }}>
          <div>Feature</div>
          <div className="text-red-400 flex items-center gap-1">
            <X size={14} /> Traditional Job Boards
          </div>
          <div className="text-purple-300 flex items-center gap-1 font-bold">
            <Check size={14} className="text-emerald-400" /> CareerCompass
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--border-3)' }}>
          {comparisons.map((row, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 text-xs items-center transition-colors hover:bg-white/5 px-2 rounded-xl">
              <div className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>
                {row.feature}
              </div>
              <div className="flex items-start gap-2" style={{ color: 'var(--text-5)' }}>
                <span className="w-4 h-4 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center shrink-0 mt-0.5">✕</span>
                <span>{row.old}</span>
              </div>
              <div className="flex items-start gap-2 font-semibold" style={{ color: '#34d399' }}>
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>{row.new}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
