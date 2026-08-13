import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Search, ClipboardCheck, Trophy } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    icon: Search,
    title: 'Discover verified roles',
    body: 'Search and filter by location, job type, and salary range — every listing carries a mandatory anti-scam employer badge.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.3)',
  },
  {
    n: '02',
    icon: ClipboardCheck,
    title: 'Apply & track your pipeline',
    body: 'Every application has one clear journey: Applied → Screening → Interview → Offer. All tracked in a visual Kanban board.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    n: '03',
    icon: Trophy,
    title: 'Prepare & land the offer',
    body: 'Use AI mock interviews, live ATS resume scoring, and your Compass AI copilot to walk into every interview with confidence.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
  },
]

export default function HowItWorks() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 border-t" style={{ borderColor: 'var(--border-1)' }}>

      {/* Header */}
      <div ref={headRef} className={`text-center mb-14 reveal ${headVisible ? 'in-view' : ''}`}>
        <div
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 border"
          style={{ background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)', color: '#60a5fa' }}
        >
          HOW IT WORKS
        </div>
        <h2
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text-1)' }}
        >
          From first search to signed offer.
        </h2>
        <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--text-4)' }}>
          Three steps. One platform. Zero spreadsheets.
        </p>
      </div>

      {/* Step cards */}
      <div className="grid md:grid-cols-3 gap-6 relative">
        {STEPS.map(({ n, icon: Icon, title, body, color, bg, border }, i) => {
          const [cardRef, cardVisible] = useScrollReveal() // eslint-disable-line react-hooks/rules-of-hooks
          return (
            <div
              key={n}
              ref={cardRef}
              className={`reveal ${cardVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div
                className="rounded-3xl p-6 border h-full group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = border
                  e.currentTarget.style.boxShadow = `0 12px 35px ${bg}`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div>
                  {/* Step Icon Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: bg, border: `1px solid ${border}`, color }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-full border" style={{ background: 'rgba(8,14,31,0.6)', borderColor: border, color }}>
                      STEP {n}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-4)' }}>{body}</p>
                </div>

                {/* Animated progress bar */}
                <div className="mt-4 h-1 rounded-full overflow-hidden bg-gray-800">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: cardVisible ? '100%' : '0%',
                      background: `linear-gradient(90deg, ${color}, transparent)`,
                      transitionDelay: `${i * 150 + 300}ms`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
