import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Bot, ShieldCheck, BarChart3, Mic2, FileText, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: ShieldCheck, title: 'Anti-Scam Verified Listings',
    body: 'Every employer is vetted with a KRA PIN, work email, and company registration. Only real companies can post.',
    gradient: 'linear-gradient(135deg,#10b981,#059669)', glow: 'rgba(16,185,129,0.18)',
  },
  {
    icon: Bot, title: 'AI Resume & ATS Matcher',
    body: 'Upload your CV to get a live ATS score, missing keywords, and a one-click tailored cover letter — in seconds.',
    gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)', glow: 'rgba(124,58,237,0.18)',
  },
  {
    icon: BarChart3, title: 'Application Pipeline Tracker',
    body: 'See every application from Applied to Offer in a clean kanban board. No spreadsheets needed.',
    gradient: 'linear-gradient(135deg,#3b82f6,#2563eb)', glow: 'rgba(59,130,246,0.18)',
  },
  {
    icon: Mic2, title: 'AI Mock Interview Room',
    body: 'Practice with real company question decks. Record your answers, get STAR framework feedback, and level up.',
    gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', glow: 'rgba(245,158,11,0.18)',
  },
  {
    icon: FileText, title: 'Smart CV Center',
    body: 'Organize CV versions by role. Know exactly which CV you sent to which company for each application.',
    gradient: 'linear-gradient(135deg,#06b6d4,#0891b2)', glow: 'rgba(6,182,212,0.18)',
  },
  {
    icon: Zap, title: 'Compass AI Copilot',
    body: 'A real-time AI sidekick for salary negotiation tips, interview coaching, and career strategy — always on.',
    gradient: 'linear-gradient(135deg,#ec4899,#db2777)', glow: 'rgba(236,72,153,0.18)',
  },
]

export default function FeatureGrid() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      {/* Section header */}
      <div ref={headRef} className={`text-center mb-14 reveal ${headVisible ? 'in-view' : ''}`}>
        <div className="inline-block text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 border"
          style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
          PLATFORM FEATURES
        </div>
        <h2 className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: 'var(--text-1)' }}>
          Everything you need.{' '}
          <span style={{
            background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Nothing you don't.
          </span>
        </h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-4)' }}>
          Built specifically for Kenyan and African job seekers — from internships to senior roles.
        </p>
      </div>

      {/* Feature cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map(({ icon: Icon, title, body, gradient, glow }, i) => {
          const [ref, visible] = useScrollReveal() // eslint-disable-line react-hooks/rules-of-hooks
          return (
            <div
              key={title}
              ref={ref}
              className={`reveal ${visible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 120}ms` }}>
              <div
                className="rounded-2xl p-6 border h-full group transition-all duration-300 cursor-default"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
                  e.currentTarget.style.boxShadow = `0 12px 40px ${glow}`
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-1)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: gradient, boxShadow: `0 4px 16px ${glow}` }}>
                  <Icon size={20} color="white" strokeWidth={2} />
                </div>

                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-4)' }}>{body}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
