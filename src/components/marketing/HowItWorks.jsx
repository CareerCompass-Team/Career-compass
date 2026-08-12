export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="font-mono text-xs font-medium tracking-[0.36em] mb-4" style={{ color: 'var(--accent-text)' }}>
          HANDLE APPLICATIONS WITH CONFIDENCE
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: 'var(--text-1)' }}>
          One dashboard for every application, interview, and note.
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-3xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <p className="text-sm uppercase tracking-[0.28em] mb-4" style={{ color: 'var(--accent)' }}>
            Discover
          </p>
          <h3 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-1)' }}>
            Save roles that fit your timeline.
          </h3>
          <p className="text-sm leading-6" style={{ color: 'var(--text-3)' }}>
            Keep a shortlist of promising jobs and return later when you have the right documents ready.
          </p>
        </div>
        <div className="rounded-3xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <p className="text-sm uppercase tracking-[0.28em] mb-4" style={{ color: 'var(--accent)' }}>
            Apply
          </p>
          <h3 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-1)' }}>
            Apply with clarity and control.
          </h3>
          <p className="text-sm leading-6" style={{ color: 'var(--text-3)' }}>
            See when you applied, what materials you sent, and whether the role is internal or external.
          </p>
        </div>
        <div className="rounded-3xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <p className="text-sm uppercase tracking-[0.28em] mb-4" style={{ color: 'var(--accent)' }}>
            Interview
          </p>
          <h3 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-1)' }}>
            Track interviews without the clutter.
          </h3>
          <p className="text-sm leading-6" style={{ color: 'var(--text-3)' }}>
            Add practice sessions, join links, and notes so every conversation feels prepared rather than rushed.
          </p>
        </div>
      </div>
    </section>
  )
}
