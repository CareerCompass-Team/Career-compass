export default function AudienceStrip() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 rounded-[2.5rem]" style={{ background: 'linear-gradient(125deg, rgba(72,63,255,0.14), rgba(57,59,125,0.08))', border: '1px solid rgba(255,255,255,0.09)' }}>
      <div className="grid gap-8 md:grid-cols-3 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--accent)' }}>
            STUDENTS
          </p>
          <p className="text-lg font-semibold" style={{ color: 'var(--text-1)' }}>
            Keep every role in one tidy list.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--accent)' }}>
            MENTORS
          </p>
          <p className="text-lg font-semibold" style={{ color: 'var(--text-1)' }}>
            Share interview prep and help book winning offers.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--accent)' }}>
            CAREER TEAMS
          </p>
          <p className="text-lg font-semibold" style={{ color: 'var(--text-1)' }}>
            Bring application tracking to advising conversations.
          </p>
        </div>
      </div>
    </section>
  )
}
