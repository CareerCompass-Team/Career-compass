import { useState } from 'react'
import { ShieldCheck, Building2, Globe, FileText, CheckCircle2, X, AlertTriangle } from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

export default function VerificationModal({ isOpen, onClose }) {
  const { verifyEmployer, user } = useAppData()
  const [workEmail, setWorkEmail] = useState(user.email || '')
  const [companyRegistration, setCompanyRegistration] = useState('')
  const [website, setWebsite] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleVerify = (e) => {
    e.preventDefault()
    setVerifying(true)

    // Simulate AI & Registry anti-scam check
    setTimeout(() => {
      verifyEmployer({ companyRegistration, workEmail, website })
      setVerifying(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 1500)
    }, 1200)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] my-auto rounded-2xl overflow-hidden shadow-2xl transition-all border p-6 relative shrink-0 overflow-y-auto flex flex-col"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:opacity-80 transition-opacity"
          style={{ color: 'var(--text-4)' }}
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text-1)' }}>
              Employer Anti-Scam Verification
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>
              Earn the Verified Employer Badge to post job listings and build candidate trust.
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center animate-celebrate">
            <CheckCircle2 size={48} className="mx-auto mb-3 text-emerald-500" />
            <h4 className="font-display text-lg font-semibold text-emerald-500 mb-1">Organization Verified!</h4>
            <p className="text-xs" style={{ color: 'var(--text-4)' }}>
              Your company has been granted the Verified Employer Badge. You can now post jobs freely.
            </p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="p-3 rounded-xl flex items-start gap-2.5 text-xs" style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.2)', color: 'var(--text-2)' }}>
              <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong>Why verification matters:</strong> To protect job seekers from scam postings or fraudulent fee requests, CareerCompass verifies official work emails and company registration details.
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Company Work Email</label>
              <div className="relative">
                <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
                <input
                  type="email"
                  required
                  value={workEmail}
                  onChange={e => setWorkEmail(e.target.value)}
                  placeholder="hr@companydomain.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Company Registration / Tax ID (e.g. KRA PIN / Registration No.)</label>
              <div className="relative">
                <FileText size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
                <input
                  type="text"
                  required
                  value={companyRegistration}
                  onChange={e => setCompanyRegistration(e.target.value)}
                  placeholder="e.g. CPR/2024/98412 or P051948271X"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Official Website or LinkedIn Company Page</label>
              <div className="relative">
                <Globe size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-5)' }} />
                <input
                  type="url"
                  required
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://company.com or https://linkedin.com/company/tech"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 press-scale"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', opacity: verifying ? 0.7 : 1 }}
            >
              {verifying ? (
                <>Verifying Company Details...</>
              ) : (
                <>Submit for Anti-Scam Verification</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
