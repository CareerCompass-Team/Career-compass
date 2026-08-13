import { useAppData } from '../../context/AppDataContext'
import { ArrowRight, ShieldCheck, Star } from 'lucide-react'

export default function CTASection() {
  const { openAuthModal } = useAppData()

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(6,182,212,0.08) 100%)',
          borderColor: 'rgba(124,58,237,0.25)',
        }}>
        {/* Glows */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-60px', left: '30%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} fill="#f59e0b" stroke="none" />
          ))}
          <span className="ml-2 text-xs font-medium" style={{ color: 'var(--text-4)' }}>Loved by 47,000+ job seekers</span>
        </div>

        <h2 className="font-display font-bold mb-4 relative"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--text-1)' }}>
          Your next career move{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            starts here.
          </span>
        </h2>

        <p className="text-sm mb-8 max-w-lg mx-auto relative" style={{ color: 'var(--text-3)' }}>
          Join thousands of Kenyan professionals who found scam-free, well-matched opportunities
          with CareerCompass. Free forever for job seekers.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 relative">
          <button
            onClick={() => openAuthModal?.('signup')}
            id="cta-signup-btn"
            className="text-sm px-8 py-3.5 rounded-xl font-bold text-white press-scale flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              boxShadow: '0 6px 24px rgba(124,58,237,0.45)',
            }}>
            Start for Free <ArrowRight size={16} />
          </button>

          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-4)' }}>
            <ShieldCheck size={13} style={{ color: '#10b981' }} />
            No payment required · No locked features
          </div>
        </div>
      </div>
    </section>
  )
}
