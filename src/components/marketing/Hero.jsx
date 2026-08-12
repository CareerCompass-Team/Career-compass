import { Link } from 'react-router-dom'
import JourneyPath from './JourneyPath'

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="font-mono text-xs font-medium tracking-widest mb-5" style={{ color: 'var(--accent-text)' }}>
          BUILT FOR STUDENTS & EARLY-CAREER JOBSEEKERS
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-5" style={{ color: 'var(--text-1)' }}>
          The calmer way to find your first job.
        </h1>
        <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'var(--text-3)' }}>
          CareerCompass surfaces roles that actually match your skills, and keeps every application organized from the first save to the final offer.
          Core discovery and tracking stay free — no locked tiers, no countdown on how many times you can check your own progress.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/jobs"
            className="text-sm px-5 py-3 rounded-xl font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            Start exploring jobs
          </Link>
          <a
            href="#how-it-works"
            className="text-sm px-5 py-3 rounded-xl font-medium transition-colors"
            style={{ color: 'var(--text-2)', border: '1px solid var(--border-1)' }}
          >
            See how tracking works
          </a>
        </div>
      </div>

      <div className="flex justify-center md:justify-end animate-fadeIn">
        <JourneyPath />
      </div>
    </section>
  )
}
