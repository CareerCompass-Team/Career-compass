import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ShieldCheck, Bot, BarChart3, Mic2, FileText, Zap, Sparkles, ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Anti-Scam Verified Listings',
    body: 'Every employer undergoes strict KRA PIN, work email, and official company registration checks before posting.',
    gradient: 'linear-gradient(135deg,#10b981,#059669)',
    glow: 'rgba(16,185,129,0.2)',
    preview: (
      <div className="p-2.5 rounded-xl border bg-emerald-500/10 border-emerald-500/25 flex items-center justify-between text-xs mt-3">
        <span className="text-emerald-300 font-semibold flex items-center gap-1">
          <ShieldCheck size={14} /> Safaricom PLC
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
          VERIFIED KRA
        </span>
      </div>
    ),
  },
  {
    icon: Bot,
    title: 'AI Resume & ATS Matcher',
    body: 'Upload your CV to get a real-time ATS match score, identify missing tech keywords, and generate targeted cover letters.',
    gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
    glow: 'rgba(124,58,237,0.2)',
    preview: (
      <div className="p-2.5 rounded-xl border bg-purple-500/10 border-purple-500/25 space-y-1.5 mt-3">
        <div className="flex justify-between text-xs">
          <span className="text-purple-300 font-medium">ATS Match Score</span>
          <span className="font-bold text-purple-200">89% Match</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full w-[89%]" />
        </div>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: 'Application Pipeline Tracker',
    body: 'Track every application from Applied → Screening → Interview → Offer in a clean visual Kanban board.',
    gradient: 'linear-gradient(135deg,#3b82f6,#2563eb)',
    glow: 'rgba(59,130,246,0.2)',
    preview: (
      <div className="flex gap-1.5 text-[10px] font-semibold mt-3">
        <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Applied (3)</span>
        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Interview (2)</span>
        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Offer (1)</span>
      </div>
    ),
  },
  {
    icon: Mic2,
    title: 'AI Mock Interview Room',
    body: 'Practice company-specific interview question decks with audio recording, time tracking, and STAR response scoring.',
    gradient: 'linear-gradient(135deg,#f59e0b,#d97706)',
    glow: 'rgba(245,158,11,0.2)',
    preview: (
      <div className="p-2 rounded-xl border bg-amber-500/10 border-amber-500/25 flex items-center justify-between text-xs mt-3">
        <span className="text-amber-300 font-medium flex items-center gap-1">
          <Mic2 size={13} /> STAR Audio Prep
        </span>
        <span className="text-[10px] font-mono text-amber-200">Score 8.5/10</span>
      </div>
    ),
  },
  {
    icon: FileText,
    title: 'Smart CV Center',
    body: 'Maintain multiple versions of your resume tailored for different engineering, design, or business roles.',
    gradient: 'linear-gradient(135deg,#06b6d4,#0891b2)',
    glow: 'rgba(6,182,212,0.2)',
    preview: (
      <div className="p-2 rounded-xl border bg-cyan-500/10 border-cyan-500/25 flex items-center justify-between text-xs mt-3">
        <span className="text-cyan-300 font-medium">React_Frontend_V2.pdf</span>
        <span className="text-[10px] text-cyan-200 font-mono">Default</span>
      </div>
    ),
  },
  {
    icon: Zap,
    title: 'Compass AI Copilot',
    body: 'A 24/7 AI sidekick for instant salary negotiation advice, interview preparation strategy, and career guidance.',
    gradient: 'linear-gradient(135deg,#ec4899,#db2777)',
    glow: 'rgba(236,72,153,0.2)',
    preview: (
      <div className="p-2 rounded-xl border bg-pink-500/10 border-pink-500/25 flex items-center justify-between text-xs mt-3">
        <span className="text-pink-300 font-medium flex items-center gap-1">
          <Sparkles size={13} /> AI Copilot Active
        </span>
        <span className="text-[10px] text-pink-200">24/7 Support</span>
      </div>
    ),
  },
]

export default function FeatureGrid() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div ref={headRef} className={`text-center mb-14 reveal ${headVisible ? 'in-view' : ''}`}>
        <div
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 border"
          style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.3)', color: '#a78bfa' }}
        >
          POWERFUL SUITE
        </div>
        <h2
          className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-1)' }}
        >
          Everything you need.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nothing you don't.
          </span>
        </h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-4)' }}>
          Built specifically for job seekers and recruiters across Kenya and Africa.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, title, body, gradient, glow, preview }, i) => {
          const [ref, visible] = useScrollReveal() // eslint-disable-line react-hooks/rules-of-hooks
          return (
            <div
              key={title}
              ref={ref}
              className={`reveal ${visible ? 'in-view' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 120}ms` }}
            >
              <div
                className="rounded-3xl p-6 border h-full group transition-all duration-300 flex flex-col justify-between"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.45)'
                  e.currentTarget.style.boxShadow = `0 14px 45px ${glow}`
                  e.currentTarget.style.transform = 'translateY(-6px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-1)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div>
                  <div
                    className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: gradient, boxShadow: `0 6px 20px ${glow}` }}
                  >
                    <Icon size={22} color="white" strokeWidth={2} />
                  </div>

                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-4)' }}>{body}</p>
                </div>

                {preview}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
