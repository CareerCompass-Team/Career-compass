import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Sparkles, ArrowRight, ArrowLeft, X, Briefcase, FileText, CheckCircle2, ShieldCheck, Video, BookOpen, Compass, ExternalLink } from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

const TOUR_STEPS = [
  {
    path: '/dashboard',
    icon: Compass,
    title: '1. Welcome to Your Dashboard 🚀',
    targetName: 'Main Dashboard & Career Metrics',
    subtitle: 'Where all your active applications, offers, and upcoming interviews live.',
    badge: 'Feature 1 of 5 — Dashboard',
    content: (
      <div className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
        <p>
          We’ve navigated you to your <strong>Dashboard</strong>! Here you get a real-time high-level view of your career pipeline:
        </p>
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
          <div className="p-2 rounded-lg border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
            <span className="block text-indigo-400 font-bold">Applications</span> Total tracked
          </div>
          <div className="p-2 rounded-lg border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
            <span className="block text-amber-400 font-bold">Interviews</span> Upcoming rounds
          </div>
          <div className="p-2 rounded-lg border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
            <span className="block text-emerald-400 font-bold">Offers</span> Active contracts
          </div>
        </div>
      </div>
    ),
  },
  {
    path: '/jobs',
    icon: Briefcase,
    title: '2. Discover Verified Jobs & Live Listings 💼',
    targetName: 'Discover Jobs Page',
    subtitle: 'Explore safe, anti-scam verified job postings and live remote roles.',
    badge: 'Feature 2 of 5 — Discover Jobs',
    content: (
      <div className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
        <p>
          Notice how we jumped to <strong>Discover Jobs</strong>! You can search by role, filter by experience level, or switch between local Kenya and global remote roles.
        </p>
        <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
          <li><strong>Verified Employer Badges:</strong> Guaranteed scam-free employers.</li>
          <li><strong>Direct Apply Buttons:</strong> One-click submission with tailored CVs.</li>
          <li><strong>Bookmark / Save:</strong> Add interesting listings to your Wishlist.</li>
        </ul>
      </div>
    ),
  },
  {
    path: '/applications',
    icon: FileText,
    title: '3. Applications Pipeline & Wishlist 📊',
    targetName: 'Applications Tracker',
    subtitle: 'Track your application from Saved Wishlist → Applied → Interview → Offer.',
    badge: 'Feature 3 of 5 — Applications',
    content: (
      <div className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
        <p>
          You are now looking at your <strong>Applications Tracker</strong>! Every job you save or apply to moves through an automated stage pipeline.
        </p>
        <div className="p-3 rounded-xl border flex items-start gap-2 text-[11px]" style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}>
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Saved Wishlist Items:</strong> Click "Review CV & Submit Application" on any saved item whenever you're ready to apply!
          </span>
        </div>
      </div>
    ),
  },
  {
    path: '/resumes',
    icon: BookOpen,
    title: '4. AI CV Studio & Pro Templates 📝',
    targetName: 'CV Studio & ATS Optimizer',
    subtitle: 'Read & edit your CVs live, test ATS score match, or choose from 5 pro templates.',
    badge: 'Feature 4 of 5 — CV Studio',
    content: (
      <div className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
        <p>
          We are now in the <strong>AI CV Studio</strong>! Here is what you can do:
        </p>
        <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
          <li><strong>Click any CV card:</strong> Open the full document reader & live editor.</li>
          <li><strong>5 Pro Templates:</strong> Select from Tech, Corporate, ATS-HighPass, Creative, or Graduate templates.</li>
          <li><strong>ATS Keyword Analyzer:</strong> Test your CV against any job description.</li>
        </ul>
      </div>
    ),
  },
  {
    path: '/interviews',
    icon: Video,
    title: '5. Interview Prep & Mock Q&A 🎯',
    targetName: 'Interviews & Reminders',
    subtitle: 'Schedule upcoming rounds and practice common interview scenarios with AI.',
    badge: 'Feature 5 of 5 — Interview Prep',
    content: (
      <div className="space-y-3 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
        <p>
          Finally, here is your <strong>Interview & Reminders Hub</strong>!
        </p>
        <div className="p-3 rounded-xl border space-y-1 text-[11px]" style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)' }}>
          <div className="font-semibold text-indigo-400 flex items-center gap-1.5">
            <Sparkles size={14} /> CompassAI Assistant Always Ready:
          </div>
          <p style={{ color: 'var(--text-3)' }}>
            Look at the purple <strong>CompassAI</strong> button in the bottom right corner — click it anytime for instant help writing cover letters or interview answers!
          </p>
        </div>
      </div>
    ),
  },
]

export default function OnboardingTour() {
  const { user, dismissTour } = useAppData()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(0)

  // Sync route whenever tour step changes
  useEffect(() => {
    if (user?.isNewUser && !user?.tourDismissed) {
      const step = TOUR_STEPS[currentStep]
      if (step && location.pathname !== step.path) {
        navigate(step.path)
      }
    }
  }, [currentStep, user?.isNewUser, user?.tourDismissed, navigate, location.pathname])

  if (!user || !user.isNewUser || user.tourDismissed) return null

  const step = TOUR_STEPS[currentStep]
  const IconComponent = step.icon

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(c => c + 1)
    } else {
      dismissTour()
      navigate('/dashboard')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[300] pointer-events-none flex items-end sm:items-center justify-center p-4 sm:p-6"
    >
      {/* Dimmed backdrop with pointer events allowed only on backdrop click */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-[3px] pointer-events-auto transition-all duration-300"
        onClick={() => dismissTour()}
      />

      {/* Floating Guided Tour Card */}
      <div
        className="w-full max-w-lg max-h-[85vh] my-auto rounded-2xl border shadow-2xl p-6 relative animate-scaleUp overflow-hidden pointer-events-auto shrink-0 flex flex-col justify-between"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--accent)', color: 'var(--text-1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Glowing Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #10b981)' }}
        />

        {/* Top Header Controls */}
        <div className="flex items-center justify-between gap-2 mb-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-indigo-300 border" style={{ background: 'rgba(99,102,241,0.15)', borderColor: 'rgba(99,102,241,0.3)' }}>
              {step.badge}
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Viewing Live Feature
            </span>
          </div>

          <button
            onClick={() => { dismissTour(); navigate('/dashboard') }}
            className="p-1 rounded-lg text-xs font-medium flex items-center gap-1 press-scale hover:bg-white/10"
            style={{ color: 'var(--text-4)' }}
            title="Skip tour"
          >
            <span>Skip Tour</span>
            <X size={15} />
          </button>
        </div>

        {/* Feature Title & Current Location Indicator */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg text-white" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}>
            <IconComponent size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold font-display" style={{ color: 'var(--text-1)' }}>
              {step.title}
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>
              {step.subtitle}
            </p>
          </div>
        </div>

        {/* Interactive Feature Content Body */}
        <div className="my-3 p-4 rounded-xl border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
          {step.content}
        </div>

        {/* Step Counter & Nav Buttons */}
        <div className="pt-3 border-t flex items-center justify-between gap-3" style={{ borderColor: 'var(--border-1)' }}>
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-indigo-500' : 'w-2 bg-gray-500/30'}`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 press-scale border"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 press-scale text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              <span>{currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour & Start' : 'Next Feature'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
