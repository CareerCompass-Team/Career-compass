const FEATURES = [
  { title: 'Smart role preview', description: 'Scan job details, save strong matches, and apply with a single click.' },
  { title: 'Interview agenda manager', description: 'Schedule interviews with round, type, and join details in one place.' },
  { title: 'Practice workspace', description: 'Open prep notes, questions, and role context before every session.' },
  { title: 'Offer decision flow', description: 'Accept or decline offers while preserving notes and compensation history.' },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid gap-6 md:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-[2rem] p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--accent)' }}>
              {feature.title}
            </p>
            <p className="text-base leading-7" style={{ color: 'var(--text-3)' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
