import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Gift, Check, DollarSign, Calendar, ShieldCheck, Sparkles, FileText, Send } from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

export default function SendOfferModal({ candidate, isOpen, onClose, onSuccess }) {
  const { sendCandidateOffer } = useAppData()

  const [salary, setSalary] = useState('KES 115,000/mo')
  const [startDate, setStartDate] = useState('Sep 1, 2026')
  const [benefits, setBenefits] = useState('Comprehensive Medical Insurance, Remote Work Fridays, KES 50,000 Annual Learning Budget')
  const [letter, setLetter] = useState(
    `Dear ${candidate?.candidateName || candidate?.name || 'Applicant'},\n\nWe are delighted to extend an official Job Offer for the position of ${candidate?.role || 'Software Engineer'} at Safaricom!\n\nSalary: KES 115,000/mo\nStart Date: Sep 1, 2026\nBenefits: Comprehensive Medical Insurance, Remote Work Fridays, KES 50,000 Annual Learning Budget\n\nWe were incredibly impressed by your technical interview performance and look forward to welcoming you to the team!`
  )
  const [sentSuccess, setSentSuccess] = useState(false)

  if (!isOpen || !candidate) return null

  const handleSend = (e) => {
    e.preventDefault()
    sendCandidateOffer(candidate.id, {
      salary,
      startDate,
      benefits,
      letter,
    })
    setSentSuccess(true)
    setTimeout(() => {
      setSentSuccess(false)
      if (onSuccess) onSuccess()
      onClose()
    }, 1500)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      style={{
        background: 'rgba(8, 14, 31, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[85vh] rounded-2xl shadow-2xl border animate-scaleIn relative flex flex-col shrink-0 my-auto"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-1)',
          color: 'var(--text-1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between shrink-0" style={{ borderColor: 'var(--border-3)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-purple-400 border shrink-0" style={{ background: 'rgba(168,85,247,0.15)', borderColor: 'rgba(168,85,247,0.3)' }}>
              <Gift size={18} />
            </div>
            <div>
              <h2 className="font-display text-base font-bold" style={{ color: 'var(--text-1)' }}>
                Review & Edit Job Offer Letter
              </h2>
              <p className="text-xs" style={{ color: 'var(--text-4)' }}>
                Candidate: <strong className="text-purple-400">{candidate.candidateName || candidate.name}</strong> • {candidate.role}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: 'var(--text-4)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {sentSuccess ? (
          <div className="p-8 text-center animate-celebrate space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <Check size={28} />
            </div>
            <h3 className="font-display font-bold text-base text-emerald-400">Job Offer Sent Successfully!</h3>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>
              Offer details and notification email have been dispatched to {candidate.candidateName || candidate.name}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 overflow-y-auto space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-3)' }}>Offered Salary / Compensation</label>
                <div className="relative">
                  <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
                  <input
                    type="text"
                    required
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl outline-none"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-3)' }}>Expected Start Date</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
                  <input
                    type="text"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl outline-none"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-3)' }}>Key Perks & Benefits</label>
              <input
                type="text"
                required
                value={benefits}
                onChange={e => setBenefits(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-3)' }}>Offer Letter Message</label>
              <textarea
                rows={6}
                required
                value={letter}
                onChange={e => setLetter(e.target.value)}
                className="w-full p-3 text-xs font-mono rounded-xl outline-none leading-relaxed"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 press-scale shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}
            >
              <Send size={15} /> Confirm & Send Official Job Offer
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}
