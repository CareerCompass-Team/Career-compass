import { useState, useEffect } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { useScrollReveal, useCountUp } from '../../hooks/useScrollReveal'
import {
  ShieldCheck, Bot, Sparkles, CheckCircle2, ArrowRight,
  TrendingUp, Users, Mic2, FileText, Play, Check, Award
} from 'lucide-react'

// Animated stat item with icon and hover lift
function StatItem({ icon: Icon, value, label, subtext }) {
  const [ref, visible] = useScrollReveal()
  const displayed = useCountUp(value, visible)
  return (
    <div
      ref={ref}
      className="p-4 rounded-xl border flex flex-col md:flex-row items-center gap-3 text-center md:text-left"
      style={{
        background: 'var(--bg-muted)',
        borderColor: 'var(--border-2)',
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'var(--accent-bg-faint)', color: 'var(--accent-text)' }}
      >
        <Icon size={18} />
      </div>
      <div>
        <div className="font-display text-xl font-bold tracking-tight gradient-text">
          {displayed}
        </div>
        <div className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{label}</div>
        {subtext && <div className="text-[11px]" style={{ color: 'var(--text-4)' }}>{subtext}</div>}
      </div>
    </div>
  )
}

// Multi-tab interactive live preview card for Hero
function HeroInteractivePreview() {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [atsScore, setAtsScore] = useState(87)
  const [isPlayingAudio, setIsPlayingAudio] = useState(true)

  const apps = [
    { role: 'Frontend Developer', company: 'Safaricom PLC', stage: 'Interview', color: '#3b82f6', date: 'Today' },
    { role: 'UI/UX Product Designer', company: 'M-KOPA Africa', stage: 'Offer Sent', color: '#8b5cf6', date: '2d ago' },
    { role: 'Junior Data Analyst', company: 'Equity Group', stage: 'Screening', color: '#f59e0b', date: '3d ago' },
  ]

  return (
    <div
      className="w-full max-w-md rounded-2xl border p-5 relative"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header & Tab selector */}
      <div className="flex items-center justify-between mb-4 border-b pb-3" style={{ borderColor: 'var(--border-2)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ background: 'var(--accent)' }}
          >
            ⚡
          </div>
          <div>
            <div className="text-xs font-bold" style={{ color: 'var(--text-1)' }}>CareerCompass Studio</div>
            <div className="text-[11px]" style={{ color: 'var(--text-4)' }}>Live Platform Preview</div>
          </div>
        </div>

        <span
          className="text-[11px] px-2.5 py-1 rounded-full font-medium border"
          style={{ background: 'var(--bg-muted)', borderColor: 'var(--border-2)', color: 'var(--text-3)' }}
        >
          Interactive Demo
        </span>
      </div>

      {/* Mini tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl border text-[11px] font-semibold" style={{ background: 'rgba(8,14,31,0.6)', borderColor: 'var(--border-2)' }}>
        {[
          { key: 'pipeline', label: 'Pipeline Tracker' },
          { key: 'ats', label: 'ATS Matcher' },
          { key: 'interview', label: 'AI Practice' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 py-1.5 rounded-lg transition-all text-center"
            style={
              activeTab === tab.key
                ? { background: 'var(--accent)', color: 'white', boxShadow: '0 2px 8px rgba(124,58,237,0.4)' }
                : { color: 'var(--text-4)', background: 'transparent' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="space-y-2.5 animate-fadeIn">
          {apps.map((a, i) => (
            <div
              key={a.role}
              className="p-3 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01]"
              style={{
                background: 'rgba(8,14,31,0.7)',
                borderColor: 'var(--border-2)',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${a.color}, #7c3aed)` }}
                >
                  {a.company[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate" style={{ color: 'var(--text-1)' }}>{a.role}</div>
                  <div className="text-[11px] flex items-center gap-1.5" style={{ color: 'var(--text-3)' }}>
                    <span>{a.company}</span>
                    <span>·</span>
                    <span className="text-[11px]" style={{ color: 'var(--text-4)' }}>{a.date}</span>
                  </div>
                </div>
              </div>
              <span
                className="text-[11px] px-2.5 py-1 rounded-full font-semibold shrink-0 border"
                style={{ background: `${a.color}1f`, borderColor: `${a.color}40`, color: a.color }}
              >
                {a.stage}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: ATS Matcher */}
      {activeTab === 'ats' && (
        <div className="space-y-3 p-3 rounded-2xl border animate-fadeIn" style={{ background: 'rgba(8,14,31,0.7)', borderColor: 'var(--border-2)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-purple-400" />
              <span className="text-xs font-bold" style={{ color: 'var(--text-1)' }}>Software_Engineer_CV.pdf</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{atsScore}% ATS Match</span>
          </div>

          <div className="h-2 rounded-full overflow-hidden bg-gray-800">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${atsScore}%`, background: 'linear-gradient(90deg, #7c3aed, #10b981)' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
            <div className="p-2 rounded-lg border bg-emerald-500/10 border-emerald-500/20 text-emerald-300 flex items-center gap-1">
              <Check size={12} /> React, TS, REST APIs
            </div>
            <div className="p-2 rounded-lg border bg-amber-500/10 border-amber-500/20 text-amber-300 flex items-center gap-1">
              💡 Add System Architecture
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: AI Interview Practice */}
      {activeTab === 'interview' && (
        <div className="space-y-3 p-3.5 rounded-2xl border animate-fadeIn" style={{ background: 'rgba(8,14,31,0.7)', borderColor: 'var(--border-2)' }}>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-1.5" style={{ color: 'var(--text-1)' }}>
              <Mic2 size={14} className="text-blue-400" /> Technical Mock Round
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-mono font-bold">STAR Feedback</span>
          </div>

          <div className="p-2.5 rounded-xl border text-[11px] leading-snug" style={{ background: 'rgba(14,22,41,0.8)', borderColor: 'var(--border-1)', color: 'var(--text-3)' }}>
            "Tell me about a time you optimized a slow API response."
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="p-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1 press-scale"
              style={{ background: 'var(--accent)' }}
            >
              <Play size={12} fill="white" /> {isPlayingAudio ? 'Playing' : 'Play'}
            </button>
            <div className="flex-1 flex items-center gap-0.5 h-6 overflow-hidden">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: `${12 + Math.sin(i * 0.8) * 8 + Math.random() * 6}px`,
                    borderRadius: 2,
                    background: i < 16 ? '#7c3aed' : 'var(--border-1)',
                    animation: isPlayingAudio ? `waveBar 0.6s ease-in-out ${i * 0.03}s infinite` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Trust Badge */}
      <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
        <span className="flex items-center gap-1">
          <ShieldCheck size={14} className="text-emerald-400" />
          KRA & Registration Verified
        </span>
        <span className="text-purple-300 font-semibold flex items-center gap-1">
          <Award size={13} />
          100% Free Core Access
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { openAuthModal } = useAppData()
  const [titleVisible, setTitleVisible] = useState(false)
  const [statsRef, statsVisible] = useScrollReveal()

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative bg-tech-grid pt-4" style={{ overflowX: 'hidden' }}>
      {/* Subtle single glow — much calmer than two animated blobs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109,40,217,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Main Content ── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left column: Hero copy */}
        <div>
          {/* Quiet label pill — no pulse, no glow */}
          <div
            className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full mb-6 border transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{
              background: 'var(--accent-bg-faint)',
              borderColor: 'var(--border-1)',
              color: 'var(--accent-text)',
              transitionDelay: '0ms',
            }}
          >
            Kenya's Smarter Career Platform · 100% Free Core Tools
          </div>

          {/* Title */}
          <h1
            className={`font-display font-bold leading-[1.06] mb-5 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', transitionDelay: '80ms', color: 'var(--text-1)' }}
          >
            Land your dream job{' '}
            <br />
            <span style={{ color: 'var(--accent-light)' }}>faster & safer.</span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-base leading-relaxed mb-8 max-w-md transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--text-3)', transitionDelay: '160ms' }}
          >
            CareerCompass gives you AI job matching, live ATS resume scoring, audio interview practice, and{' '}
            <strong className="text-emerald-400 font-semibold">anti-scam verified listings</strong> — all in one place.
          </p>

          {/* CTA Action Buttons */}
          <div
            className={`flex flex-wrap items-center gap-3.5 mb-10 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '240ms' }}
          >
            <button
              id="hero-cta-btn"
              onClick={() => openAuthModal?.('signup')}
              className="text-sm px-8 py-3.5 rounded-xl font-bold text-white press-scale flex items-center gap-2"
              style={{
                background: 'var(--accent)',
                boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
              }}
            >
              Get Started Free <ArrowRight size={16} />
            </button>

            <a
              href="#features"
              className="text-sm px-7 py-3.5 rounded-xl font-semibold transition-all hover:bg-white/5 press-scale"
              style={{ color: 'var(--text-2)', border: '1px solid var(--border-1)', background: 'rgba(14,22,41,0.5)' }}
            >
              Explore Features
            </a>
          </div>

          {/* Simple trust line — replaces the 4 colourful pill badges */}
          <div
            className={`flex items-center gap-2 text-xs transition-all duration-700 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ color: 'var(--text-4)', transitionDelay: '320ms' }}
          >
            <ShieldCheck size={13} style={{ color: 'var(--accent-text)' }} />
            Anti-scam verified · AI resume scoring · Mock interviews · Kanban tracker
          </div>
        </div>

        {/* Right column: Interactive demo card */}
        <div
          className={`flex justify-center md:justify-end transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <HeroInteractivePreview />
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div
        ref={statsRef}
        className={`border-t py-7 relative z-10 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ borderColor: 'var(--border-2)', background: 'var(--bg-card)' }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem icon={ShieldCheck} value="12,400+" label="Verified Listings" subtext="KRA & PIN vetted" />
          <StatItem icon={CheckCircle2} value="98%" label="Scam-Free" subtext="Zero fake recruiters" />
          <StatItem icon={Users} value="47,000+" label="Job Seekers" subtext="Students & graduates" />
          <StatItem icon={TrendingUp} value="3.2×" label="Faster Placement" subtext="Avg. offer timeline" />
        </div>
      </div>
    </section>
  )
}
