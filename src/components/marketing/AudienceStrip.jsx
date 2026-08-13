import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { GraduationCap, Rocket, Briefcase, ArrowRight, Building2, CheckCircle2 } from 'lucide-react'

const AUDIENCES = [
  {
    id: 'students',
    icon: GraduationCap,
    title: 'Students & Interns',
    body: 'Attachments, industrial training, and part-time internships — filtered by location and skill level.',
    gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    glow: 'rgba(124,58,237,0.22)',
    samples: [
      { title: 'Frontend Developer Intern', company: 'Safaricom PLC', location: 'Nairobi (Hybrid)', pay: 'KES 35,000/mo' },
      { title: 'UX Research Attachment', company: 'Cellulant', location: 'Remote', pay: 'KES 30,000/mo' },
    ],
  },
  {
    id: 'graduates',
    icon: Rocket,
    title: 'New Graduates',
    body: 'Your first full-time role. Built around the fact that "no experience yet" is the starting point, not a flaw.',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    glow: 'rgba(59,130,246,0.22)',
    samples: [
      { title: 'Graduate Software Trainee', company: 'Equity Group', location: 'Nairobi HQ', pay: 'KES 85,000/mo' },
      { title: 'Associate Data Analyst', company: 'Andela Kenya', location: 'Global Remote', pay: 'KES 110,000/mo' },
    ],
  },
  {
    id: 'early_pros',
    icon: Briefcase,
    title: 'Early-Career Pros',
    body: '1-3 years in. Track every application, manage ATS resume versions, and practice audio mock interviews.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    glow: 'rgba(16,185,129,0.22)',
    samples: [
      { title: 'Fullstack Engineer (React/Node)', company: 'M-KOPA Africa', location: 'Nairobi', pay: 'KES 160,000/mo' },
      { title: 'Growth Marketing Specialist', company: 'Jumia Kenya', location: 'Nairobi', pay: 'KES 130,000/mo' },
    ],
  },
]

const COMPANIES = [
  'Safaricom', 'Andela', 'M-KOPA', 'Equity Bank', 'Cellulant',
  "Africa's Talking", 'Flutterwave', 'Jumia', 'Co-op Bank', 'KCB Group', 'Mastercard', 'Twiga Foods'
]

export default function AudienceStrip() {
  const [sectionRef, sectionVisible] = useScrollReveal()
  const [selectedPersona, setSelectedPersona] = useState('graduates')

  const activeAudience = AUDIENCES.find(a => a.id === selectedPersona) || AUDIENCES[1]

  return (
    <>
      {/* ── Audience Cards Section ── */}
      <section id="for-students" className="max-w-6xl mx-auto px-6 py-20" ref={sectionRef}>
        {/* Header */}
        <div className={`mb-12 reveal ${sectionVisible ? 'in-view' : ''}`}>
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4 border"
            style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.3)', color: '#a78bfa' }}
          >
            WHO IT'S TAILORED FOR
          </div>
          <h2
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--text-1)' }}
          >
            Built for where you're starting from.
          </h2>
          <p className="text-sm max-w-xl" style={{ color: 'var(--text-4)' }}>
            Generic job boards treat a first internship search the same as a 10th senior role. We don't.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {AUDIENCES.map(({ id, icon: Icon, title, body, gradient, glow }, i) => {
            const isSelected = selectedPersona === id
            return (
              <div
                key={title}
                className={`reveal ${sectionVisible ? 'in-view' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  onClick={() => setSelectedPersona(id)}
                  className="rounded-3xl p-6 border h-full group cursor-pointer transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: isSelected ? 'rgba(14,22,41,0.95)' : 'var(--bg-card)',
                    borderColor: isSelected ? 'rgba(124,58,237,0.5)' : 'var(--border-1)',
                    boxShadow: isSelected ? `0 12px 40px ${glow}` : 'none',
                    transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: gradient, boxShadow: `0 6px 20px ${glow}` }}
                  >
                    <Icon size={22} color="white" strokeWidth={2} />
                  </div>

                  <h3 className="text-base font-bold mb-2 flex items-center justify-between" style={{ color: 'var(--text-1)' }}>
                    {title}
                    {isSelected && <CheckCircle2 size={16} className="text-purple-400" />}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-4)' }}>
                    {body}
                  </p>

                  <div
                    className="text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    style={{ color: isSelected ? '#a78bfa' : 'var(--text-5)' }}
                  >
                    View Sample Roles <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dynamic Sample Roles Interactive Banner */}
        <div
          className="p-6 rounded-3xl border animate-fadeIn"
          style={{
            background: 'linear-gradient(135deg, rgba(14,22,41,0.9) 0%, rgba(8,14,31,0.95) 100%)',
            borderColor: 'rgba(124,58,237,0.25)',
          }}
        >
          <div className="flex items-center justify-between mb-4 border-b pb-3" style={{ borderColor: 'var(--border-2)' }}>
            <div className="text-xs font-bold flex items-center gap-2" style={{ color: 'var(--text-2)' }}>
              <Building2 size={15} className="text-purple-400" />
              <span>Sample Verified Listings for <strong className="text-purple-300">{activeAudience.title}</strong></span>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
              ✓ KRA Verified
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {activeAudience.samples.map((sample) => (
              <div
                key={sample.title}
                className="p-4 rounded-2xl border flex items-center justify-between"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)' }}
              >
                <div>
                  <div className="text-xs font-bold" style={{ color: 'var(--text-1)' }}>{sample.title}</div>
                  <div className="text-[11px] text-purple-300 mt-0.5">{sample.company} · {sample.location}</div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                  {sample.pay}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Employer Logos Marquee ── */}
      <div
        className="py-8 overflow-hidden border-t border-b bg-tech-grid"
        style={{ borderColor: 'var(--border-1)', background: 'rgba(8,14,31,0.7)' }}
      >
        <div className="text-center text-[11px] font-bold tracking-widest mb-4" style={{ color: 'var(--text-5)' }}>
          TRUSTED BY LEADING EMPLOYERS ACROSS AFRICA
        </div>
        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}>
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-4 py-2 rounded-2xl border transition-all hover:border-purple-500/40 inline-flex items-center gap-2"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)', color: 'var(--text-3)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
