import { useAppData } from '../../context/AppDataContext'
import { ArrowRight, ShieldCheck, Star, Users, CheckCircle2 } from 'lucide-react'

export default function CTASection() {
  const { openAuthModal } = useAppData()

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div
        className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border animate-gradientBorder"
        style={{
          padding: 2, // Gradient border wrapper thickness
        }}
      >
        <div
          className="rounded-[22px] p-8 md:p-16 relative overflow-hidden"
          style={{ background: 'rgba(8,14,31,0.94)', backdropFilter: 'blur(20px)' }}
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-80px',
              left: '25%',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Social Proof Avatars & Rating */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 relative z-10">
            <div className="flex -space-x-2">
              {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" stroke="none" />
              ))}
              <span className="ml-1.5 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                Joined by 47,000+ Kenyan job seekers
              </span>
            </div>
          </div>

          <h2
            className="font-display font-bold mb-4 relative z-10"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--text-1)' }}
          >
            Your next career move{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              starts here.
            </span>
          </h2>

          <p className="text-sm mb-9 max-w-lg mx-auto relative z-10 leading-relaxed" style={{ color: 'var(--text-3)' }}>
            Join thousands of professionals across Nairobi and East Africa who found scam-free, well-matched opportunities with CareerCompass.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => openAuthModal?.('signup')}
              id="cta-signup-btn"
              className="text-sm px-9 py-4 rounded-2xl font-bold text-white press-scale flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 8px 30px rgba(124,58,237,0.55)',
              }}
            >
              Start for Free <ArrowRight size={17} />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#34d399' }}>
              <ShieldCheck size={16} />
              100% Free Core Tools · No Credit Card Required
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
