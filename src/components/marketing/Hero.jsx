import { useState, useEffect } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { useScrollReveal, useCountUp } from '../../hooks/useScrollReveal'

// Animated stat item
function StatItem({ value, label }) {
  const [ref, visible] = useScrollReveal()
  const displayed = useCountUp(value, visible)
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-2xl font-bold"
        style={{
          background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
        {displayed}
      </div>
      <div className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>{label}</div>
    </div>
  )
}

// Floating mini dashboard preview
function HeroDashboard() {
  const apps = [
    { role: 'Frontend Engineer', company: 'Safaricom',  stage: 'Interview', color: '#3b82f6' },
    { role: 'UX Designer',       company: 'M-KOPA',     stage: 'Offer',     color: '#8b5cf6' },
    { role: 'Data Analyst',      company: 'Andela',     stage: 'Screening', color: '#f59e0b' },
  ]
  return (
    <div className="animate-cardFloat w-full max-w-sm rounded-2xl border p-5"
      style={{
        background: 'rgba(14,22,41,0.85)',
        borderColor: 'rgba(124,58,237,0.3)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
      }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md" style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)' }} />
          <span className="text-xs font-bold" style={{ color: 'var(--text-2)' }}>CareerCompass</span>
        </div>
        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Live
        </span>
      </div>

      {/* Applications */}
      <div className="space-y-2 mb-4">
        {apps.map((a, i) => (
          <div key={a.role} className="flex items-center justify-between p-2.5 rounded-xl border stagger-item"
            style={{ background: 'rgba(8,14,31,0.6)', borderColor: 'var(--border-2)', animationDelay: `${i * 120}ms` }}>
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-1)' }}>{a.role}</div>
              <div className="text-xs" style={{ color: 'var(--text-5)' }}>{a.company}</div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ml-2"
              style={{ background: `${a.color}1a`, color: a.color }}>{a.stage}</span>
          </div>
        ))}
      </div>

      {/* ATS bar */}
      <div className="p-3 rounded-xl border" style={{ background: 'rgba(8,14,31,0.6)', borderColor: 'var(--border-2)' }}>
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: 'var(--text-4)' }}>ATS Resume Match</span>
          <span className="font-bold" style={{ color: '#10b981' }}>87%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-1)' }}>
          <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg,#7c3aed,#10b981)', borderRadius: 999 }} />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { openAuthModal } = useAppData()
  const [titleVisible, setTitleVisible] = useState(false)
  const [statsRef, statsVisible] = useScrollReveal()

  useEffect(() => {
    // Stagger in the hero text on mount
    const t = setTimeout(() => setTitleVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative overflow-hidden">

      {/* ── Background ambient blobs ── */}
      <div aria-hidden className="animate-blob" style={{
        position: 'absolute', top: -140, left: -100,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden className="animate-blob-delay" style={{
        position: 'absolute', top: 60, right: -120,
        width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: -60, left: '30%',
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-20 grid md:grid-cols-2 gap-14 items-center relative">

        {/* Left: copy */}
        <div>
          {/* Animated badge */}
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border animate-glowPulse transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{
              background: 'rgba(124,58,237,0.1)',
              borderColor: 'rgba(124,58,237,0.3)',
              color: '#a78bfa',
              transitionDelay: '0ms',
            }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Kenya's Smarter Career Platform · 100% Free Core Tools
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-bold leading-[1.08] mb-5 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: 'clamp(2.3rem,5vw,3.6rem)', transitionDelay: '80ms' }}>
            <span style={{ color: 'var(--text-1)' }}>Land your dream job{' '}</span>
            <br />
            <span className="animate-shimmer">faster & safer.</span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-base leading-relaxed mb-8 max-w-md transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--text-3)', transitionDelay: '160ms' }}>
            CareerCompass gives you AI-powered job matching, a real-time application tracker,
            mock interviews, and <strong style={{ color: 'var(--text-2)' }}>scam-verified listings</strong> — all in one place.
            No paywalls. No fake recruiters.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-3 mb-9 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '240ms' }}>
            <button
              id="hero-cta-btn"
              onClick={() => openAuthModal?.('signup')}
              className="text-sm px-7 py-3.5 rounded-xl font-bold text-white press-scale"
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
                boxShadow: '0 6px 24px rgba(124,58,237,0.45)',
              }}>
              Get Started Free →
            </button>
            <a href="#features"
              className="text-sm px-7 py-3.5 rounded-xl font-semibold transition-colors"
              style={{ color: 'var(--text-2)', border: '1px solid var(--border-1)', background: 'var(--bg-card)' }}>
              See Features
            </a>
          </div>

          {/* Trust pills */}
          <div
            className={`flex items-center gap-5 flex-wrap transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '320ms' }}>
            {['🛡️ Anti-Scam Verified', '🤖 AI Resume Review', '🎯 Smart Job Match', '🚀 Free to Start'].map(t => (
              <span key={t} className="text-xs font-medium" style={{ color: 'var(--text-4)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right: dashboard preview */}
        <div
          className={`flex justify-center md:justify-end transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          style={{ transitionDelay: '200ms' }}>
          <HeroDashboard />
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div ref={statsRef}
        className={`border-t border-b py-5 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ borderColor: 'var(--border-1)', background: 'var(--bg-card)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center md:justify-between gap-8">
          <StatItem value="12,400+" label="Verified Listings" />
          <StatItem value="98%"     label="Scam-Free Rate" />
          <StatItem value="47,000+" label="Career Seekers" />
          <StatItem value="3.2×"    label="Faster Placement" />
        </div>
      </div>
    </section>
  )
}
