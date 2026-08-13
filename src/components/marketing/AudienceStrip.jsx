import { useScrollReveal } from '../../hooks/useScrollReveal'
import { GraduationCap, Rocket, Briefcase, ArrowRight } from 'lucide-react'

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: 'Students & Interns',
    body: 'Internships, attachments, and part-time roles near you — filtered by how far you can actually travel.',
    gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    glow: 'rgba(124,58,237,0.2)',
  },
  {
    icon: Rocket,
    title: 'New Graduates',
    body: 'Your first full-time role. Built around the fact that "no experience yet" is the starting point, not a flaw.',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    glow: 'rgba(59,130,246,0.2)',
  },
  {
    icon: Briefcase,
    title: 'Early-Career Pros',
    body: 'Still building your foundation. Track every application and interview in one place as you grow.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    glow: 'rgba(16,185,129,0.2)',
  },
]

// Marquee companies strip
const COMPANIES = [
  'Safaricom', 'Andela', 'M-KOPA', 'Twiga Foods', 'Equity Bank', 'Cellulant',
  "Africa's Talking", 'Flutterwave', 'Jumia', 'Co-op Bank', 'KCB Group', 'Mastercard',
]

export default function AudienceStrip() {
  const [sectionRef, sectionVisible] = useScrollReveal()
  const [marqueeRef, marqueeVisible] = useScrollReveal()

  return (
    <>
      {/* ── Audience Cards ── */}
      <section id="for-students" className="max-w-6xl mx-auto px-6 py-16" ref={sectionRef}>
        <div className={`mb-10 reveal ${sectionVisible ? 'in-view' : ''}`}>
          <div className="inline-block text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 border"
            style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
            WHO IT'S FOR
          </div>
          <h2 className="font-display font-bold mb-2"
            style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text-1)' }}>
            Built for where you're starting from.
          </h2>
          <p className="text-sm max-w-lg" style={{ color: 'var(--text-4)' }}>
            General job boards treat a first job search the same as a tenth. We don't.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {AUDIENCES.map(({ icon: Icon, title, body, gradient, glow }, i) => (
            <div
              key={title}
              className={`reveal ${sectionVisible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="rounded-2xl p-6 border h-full group transition-all duration-300"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${glow}`; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border-1)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: gradient, boxShadow: `0 6px 16px ${glow}` }}>
                  <Icon size={20} color="white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-4)' }}>{body}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--accent-text)' }}>
                  Explore roles <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hiring Company Marquee ── */}
      <div ref={marqueeRef}
        className={`py-6 overflow-hidden border-t border-b transition-all duration-700 ${marqueeVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ borderColor: 'var(--border-1)' }}>
        <div className="text-center text-xs font-bold tracking-widest mb-4" style={{ color: 'var(--text-5)' }}>
          TRUSTED BY EMPLOYERS ACROSS AFRICA
        </div>
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}>
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span key={i} className="text-sm font-semibold px-4 py-1.5 rounded-full border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)', color: 'var(--text-4)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
