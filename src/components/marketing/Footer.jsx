import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-12 text-sm" style={{ color: 'var(--text-3)' }}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>CareerCompass helps early-career jobseekers manage applications, interviews, and offers.</p>
        <div className="flex flex-wrap gap-4">
          <Link to="/jobs" className="hover:underline">
            Jobs
          </Link>
          <Link to="/applications" className="hover:underline">
            Applications
          </Link>
          <Link to="/interviews" className="hover:underline">
            Interviews
          </Link>
        </div>
      </div>
    </footer>
  )
}
