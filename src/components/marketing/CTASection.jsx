import { useAppData } from '../../context/AppDataContext'
import { ArrowRight, ShieldCheck, Star, Users, CheckCircle2 } from 'lucide-react'

export default function CTASection() {
  const { openAuthModal } = useAppData()

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div
        className="rounded-2xl p-8 md:p-14 text-center border relative"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-1)',
        }}
      >
        {/* Social Proof Avatars & Rating */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
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
              <Star key={i} size={14} fill="#f59e0b" stroke="none" />
            ))}
            <span className="ml-1.5 text-xs font-medium" style={{ color: 'var(--text-3)' }}>
              Joined by 47,000+ Kenyan job seekers
            </span>
          </div>
        </div>

        <h2
          className="font-display font-bold mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--text-1)' }}
        >
          Your next career move{' '}
          <span className="gradient-text">
            starts here.
          </span>
        </h2>

        <p className="text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-3)' }}>
          Join thousands of professionals across Nairobi and East Africa who found scam-free, well-matched opportunities with CareerCompass.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openAuthModal?.('signup')}
            id="cta-signup-btn"
            className="text-sm px-8 py-3.5 rounded-xl font-bold text-white press-scale flex items-center gap-2"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
            }}
          >
            Start for Free <ArrowRight size={16} />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#34d399' }}>
            <ShieldCheck size={15} />
            100% Free Core Tools · No Credit Card Required
          </div>
        </div>
      </div>
    </section>
  )
}
