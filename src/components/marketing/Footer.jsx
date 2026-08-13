import { Link } from 'react-router-dom'
import CompassLogo from '../ui/CompassLogo'
import { useAppData } from '../../context/AppDataContext'
import { ShieldCheck, ArrowUpRight, Globe, ExternalLink, Link2 } from 'lucide-react'

const FOOTER_LINKS = {
  Product: [
    { label: 'Job Discovery', href: '#features' },
    { label: 'ATS Resume Matcher', href: '#features' },
    { label: 'Pipeline Tracker', href: '#features' },
    { label: 'AI Mock Interviews', href: '#features' },
    { label: 'Compass AI Copilot', href: '#features' },
  ],
  Platform: [
    { label: 'For Students', href: '#for-students' },
    { label: 'For Graduates', href: '#for-students' },
    { label: 'For Recruiters', href: '#for-students' },
    { label: 'Anti-Scam Policy', href: '#' },
  ],
  Company: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why CareerCompass?', href: '#' },
    { label: 'Moringa School', href: '#' },
    { label: 'Contact', href: '#' },
  ],
}

export default function Footer() {
  const { openAuthModal } = useAppData()

  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border-1)', background: 'rgba(8,16,46,0.98)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Top row: Brand + Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <CompassLogo size={28} />
              <div>
                <span className="font-display font-bold text-sm block" style={{ color: 'var(--text-1)' }}>
                  CareerCompass
                </span>
                <span className="text-[10px] font-mono text-purple-400 tracking-widest block uppercase">
                  Kenya's Job Matcher
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--text-5)' }}>
              AI-powered career platform for Kenyan students, graduates, and early-career professionals. Scam-free. Free to start.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {[Globe, Link2, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 border"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-1)',
                    color: 'var(--text-4)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
                    e.currentTarget.style.color = '#a78bfa'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-1)'
                    e.currentTarget.style.color = 'var(--text-4)'
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-3)' }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs transition-colors hover:text-purple-300 flex items-center gap-1 group"
                      style={{ color: 'var(--text-5)' }}
                    >
                      {link.label}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div
          className="rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border"
          style={{
            background: 'rgba(124,58,237,0.07)',
            borderColor: 'rgba(124,58,237,0.2)',
          }}
        >
          <div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>
              Ready to find your next role?
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>
              Join 47,000+ Kenyan job seekers already on CareerCompass.
            </div>
          </div>
          <button
            onClick={() => openAuthModal?.('signup')}
            className="text-xs px-6 py-2.5 rounded-xl font-bold text-white press-scale flex items-center gap-1.5 shrink-0"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}
          >
            Get Started Free →
          </button>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t text-xs"
          style={{ borderColor: 'var(--border-2)', color: 'var(--text-5)' }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>All listings are KRA PIN & registration verified · 98% scam-free guarantee</span>
          </div>
          <div>
            © {new Date().getFullYear()} CareerCompass · A Moringa School Project
          </div>
        </div>
      </div>
    </footer>
  )
}
