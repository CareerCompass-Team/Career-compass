import { useScrollReveal } from '../../hooks/useScrollReveal'

const STEPS = [
  {
    n: '01', emoji: '🔍',
    title: 'Discover verified roles',
    body: 'Search and filter by location, job type, and salary — every listing carries an anti-scam verified employer badge.',
    color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)',
  },
  {
    n: '02', emoji: '📋',
    title: 'Apply & track your pipeline',
    body: 'Every application has one clear journey: Applied → Screening → Interview → Offer. All in a visual kanban board.',
    color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)',
  },
  {
    n: '03', emoji: '🚀',
    title: 'Prepare & land the offer',
    body: 'Use AI mock interviews, ATS resume scoring, and your Compass AI copilot to walk into every interview with confidence.',
    color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)',
  },
]

export default function HowItWorks() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20"
      style={{ borderTop: '1px solid var(--border-1)' }}>

      {/* Header */}
      <div ref={headRef} className={`text-center mb-14 reveal ${headVisible ? 'in-view' : ''}`}>
        <div className="inline-block text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 border"
          style={{ background: 'rgba(59,130,246,0.08)', borderColor: 'rgba(59,130,246,0.2)', color: '#60a5fa' }}>
          HOW IT WORKS
        </div>
        <h2 className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text-1)' }}>
          From first search to signed offer.
        </h2>
        <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--text-4)' }}>
          Three steps. One platform. Zero spreadsheets.
        </p>
      </div>

      {/* Step cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {STEPS.map(({ n, emoji, title, body, color, bg, border }, i) => {
          // Each card has its own observer
          const [cardRef, cardVisible] = useScrollReveal() // eslint-disable-line react-hooks/rules-of-hooks
          return (
            <div
              key={n}
              ref={cardRef}
              className={`reveal ${cardVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="rounded-2xl p-6 border h-full group transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.boxShadow = `0 8px 32px ${bg}` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.boxShadow = 'none' }}>

                {/* Step emoji badge */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: bg, border: `1px solid ${border}` }}>
                    {emoji}
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest" style={{ color }}>
                    STEP {n}
                  </span>
                </div>

                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-4)' }}>{body}</p>

                {/* Animated progress indicator */}
                <div className="mt-5 h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--border-1)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: cardVisible ? '100%' : '0%',
                      background: `linear-gradient(90deg, ${color}, transparent)`,
                      transitionDelay: `${i * 150 + 400}ms`,
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
