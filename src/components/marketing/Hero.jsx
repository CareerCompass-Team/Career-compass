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
      className="p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group text-center md:text-left flex flex-col md:flex-row items-center gap-3.5"
      style={{
        background: 'rgba(14,22,41,0.6)',
        borderColor: 'var(--border-1)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(124,58,237,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}
      >
        <Icon size={20} />
      </div>
      <div>
        <div
          className="font-display text-2xl font-bold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {displayed}
        </div>
        <div className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>{label}</div>
        {subtext && <div className="text-[10px]" style={{ color: 'var(--text-5)' }}>{subtext}</div>}
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
      className="animate-cardFloat w-full max-w-md rounded-3xl border p-5 relative overflow-hidden"
      style={{
        background: 'rgba(14,22,41,0.88)',
        borderColor: 'rgba(124,58,237,0.35)',
        boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Glow orb inside card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header & Tab selector */}
      <div className="flex items-center justify-between mb-4 border-b pb-3" style={{ borderColor: 'var(--border-2)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)' }}
          >
            ⚡
          </div>
          <div>
            <div className="text-xs font-bold" style={{ color: 'var(--text-1)' }}>CareerCompass Studio</div>
            <div className="text-[10px]" style={{ color: 'var(--text-5)' }}>Live Platform Preview</div>
          </div>
        </div>

        <span
          className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-semibold border"
          style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', color: '#34d399' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
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
                  <div className="text-[11px] flex items-center gap-1.5" style={{ color: 'var(--text-4)' }}>
                    <span>{a.company}</span>
                    <span>·</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-5)' }}>{a.date}</span>
                  </div>
                </div>
              </div>
              <span
                className="text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0 border"
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
      <div className="mt-4 pt-3 border-t flex items-center justify-between text-[11px]" style={{ borderColor: 'var(--border-2)', color: 'var(--text-4)' }}>
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
    <section className="relative overflow-hidden bg-tech-grid pt-4">
      {/* ── Background ambient mesh glows ── */}
      <div
        aria-hidden
        className="animate-blob"
        style={{
          position: 'absolute',
          top: -120,
          left: -80,
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        className="animate-blob-delay"
        style={{
          position: 'absolute',
          top: 80,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Main Content ── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left column: Hero copy */}
        <div>
          {/* Glowing Pill Announcement */}
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border animate-glowPulse transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{
              background: 'rgba(124,58,237,0.12)',
              borderColor: 'rgba(124,58,237,0.35)',
              color: '#a78bfa',
              transitionDelay: '0ms',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse inline-block" />
            Kenya's Smarter Career Platform · 100% Free Core Tools
          </div>

          {/* Title */}
          <h1
            className={`font-display font-bold leading-[1.06] mb-5 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)', transitionDelay: '80ms' }}
          >
            <span style={{ color: 'var(--text-1)' }}>Land your dream job </span>
            <br />
            <span className="animate-shimmer">faster & safer.</span>
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
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 8px 30px rgba(124,58,237,0.5)',
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

          {/* Feature Badges Array */}
          <div
            className={`flex items-center gap-3 flex-wrap transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '320ms' }}
          >
            {[
              { label: 'Anti-Scam Verified', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
              { label: 'AI Resume Scoring', color: '#a78bfa', bg: 'rgba(124,58,237,0.1)' },
              { label: 'Visual Kanban Tracker', color: '#60a5fa', bg: 'rgba(59,130,246,0.1)' },
              { label: 'Audio Mock Interview', color: '#fbbf24', bg: 'rgba(245,158,11,0.1)' },
            ].map(pill => (
              <span
                key={pill.label}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:scale-105"
                style={{ background: pill.bg, borderColor: `${pill.color}35`, color: pill.color }}
              >
                ✓ {pill.label}
              </span>
            ))}
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
        className={`border-t border-b py-7 relative z-10 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ borderColor: 'var(--border-1)', background: 'rgba(14,22,41,0.7)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem icon={ShieldCheck} value="12,400+" label="Verified Listings" subtext="100% KRA & PIN vetted" />
          <StatItem icon={CheckCircle2} value="98%" label="Scam-Free Guarantee" subtext="Zero fake recruiters" />
          <StatItem icon={Users} value="47,000+" label="Career Seekers" subtext="Students & graduates" />
          <StatItem icon={TrendingUp} value="3.2×" label="Faster Placement" subtext="Average offer timeline" />
        </div>
      </div>
    </section>
  )
}
