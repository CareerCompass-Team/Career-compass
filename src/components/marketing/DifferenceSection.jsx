export default function DifferenceSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] mb-4" style={{ color: 'var(--accent)' }}>
            WHY CAREERCOMPASS
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6" style={{ color: 'var(--text-1)' }}>
            An organized process, not another job board.
          </h2>
          <p className="text-base leading-7 mb-6" style={{ color: 'var(--text-3)' }}>
            Use one workspace for saved jobs, active applications, interviews, and final offers so you can focus on preparation instead of chasing spreadsheets.
          </p>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--text-3)' }}>
            <li>Track what you actually applied to, including external roles.</li>
            <li>Keep notes, documents, and practice sessions attached to each stage.</li>
            <li>Review status updates without losing the role context.</li>
          </ul>
        </div>

        <div className="rounded-[2rem] p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <p className="text-sm uppercase tracking-[0.35em] mb-4" style={{ color: 'var(--accent)' }}>
            TRUSTED PROCESS
          </p>
          <p className="text-base leading-7" style={{ color: 'var(--text-3)' }}>
            CareerCompass is built for roles that require more than a resume — especially internships, apprenticeships, and early-career fellowships.
          </p>
        </div>
      </div>
    </section>
  )
}
