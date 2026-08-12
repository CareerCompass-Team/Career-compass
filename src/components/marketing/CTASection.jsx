import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center rounded-[2.5rem]" style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.14), rgba(94, 92, 194, 0.08))', border: '1px solid rgba(255,255,255,0.08)' }}>
      <p className="text-sm uppercase tracking-[0.35em] mb-4" style={{ color: 'var(--accent)' }}>
        Ready to make progress?
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-5" style={{ color: 'var(--text-1)' }}>
        Start organizing your job search in one calm workspace.
      </h2>
      <p className="max-w-2xl mx-auto text-base leading-7 mb-8" style={{ color: 'var(--text-3)' }}>
        Every application, interview, practice plan, and offer decision lives in the same flow so you can prepare, follow up, and move faster.
      </p>
      <Link
        to="/jobs"
        className="inline-flex items-center justify-center rounded-xl px-6 py-4 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        Browse jobs now
      </Link>
    </section>
  )
}
