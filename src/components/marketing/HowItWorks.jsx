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
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'var(--border-2)' }}>

      {/* Header */}
      <div ref={headRef} className={`text-center mb-12 reveal ${headVisible ? 'in-view' : ''}`}>
        <h2
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-1)' }}
        >
          From first search to signed offer.
        </h2>
        <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--text-4)' }}>
          Three steps. One platform. Zero spreadsheets.
        </p>
      </div>

      {/* Step cards */}
      <div className="grid md:grid-cols-3 gap-6 relative">
        {STEPS.map(({ n, icon: Icon, title, body, color }, i) => {
          const [cardRef, cardVisible] = useScrollReveal() // eslint-disable-line react-hooks/rules-of-hooks
          return (
            <div
              key={n}
              ref={cardRef}
              className={`reveal ${cardVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="rounded-2xl p-5 border h-full transition-all duration-200 flex flex-col justify-between"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div>
                  {/* Step Icon Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--accent-bg-faint)', color: 'var(--accent-text)' }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded-full border" style={{ background: 'var(--bg-muted)', borderColor: 'var(--border-2)', color: 'var(--text-4)' }}>
                      STEP {n}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-4)' }}>{body}</p>
                </div>

                {/* Subtle progress indicator */}
                <div className="mt-2 h-1 rounded-full overflow-hidden bg-slate-800/50">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: cardVisible ? '100%' : '0%',
                      background: 'var(--accent)',
                      transitionDelay: `${i * 120 + 200}ms`,
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
