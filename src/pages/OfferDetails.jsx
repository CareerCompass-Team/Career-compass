import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  FileText, PartyPopper, CheckCircle2, ShieldCheck, MapPin,
  Briefcase, ArrowLeft, Download, Printer, Calendar,
  Award, AlertCircle, XCircle, PenTool,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import CompanyAvatar from '../components/ui/CompanyAvatar'
import Celebration from '../components/ui/Celebration'
import StatusBadge from '../components/domain/StatusBadge'

export default function OfferDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, acceptOffer, declineOffer, user } = useAppData()

  const app = applications.find(a => a.id === id)

  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [signatureName, setSignatureName] = useState(user?.name || '')
  const [celebrating, setCelebrating] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [signedDate, setSignedDate] = useState(app?.signedAt || null)

  if (!app) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-4)' }}>
        Application offer record not found.{' '}
        <Link to="/applications" style={{ color: 'var(--accent)' }}>
          Back to Applications
        </Link>
      </div>
    )
  }

  const isAccepted = app.status === 'Accepted' || Boolean(signedDate)
  const isDeclined = app.status === 'Not Selected'

  const handleSignAndAccept = (e) => {
    e.preventDefault()
    if (!acceptedTerms || !signatureName.trim()) return

    const nowStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    setSignedDate(nowStr)
    acceptOffer(app.id)
    setCelebrating(true)
    setTimeout(() => setCelebrating(false), 2000)
  }

  const handleConfirmDecline = () => {
    declineOffer(app.id)
    setShowDeclineModal(false)
    navigate(`/applications/${app.id}`)
  }

  const handlePrint = () => {
    window.print()
  }

  const salaryDisplay = app.salary || 'KES 120,000 – 150,000 / month'

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fadeIn relative">
      {celebrating && <Celebration />}

      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap print:hidden">
        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-5)' }}>
          <Link to="/applications" className="hover:underline" style={{ color: 'var(--accent)' }}>
            Applications
          </Link>
          <span>/</span>
          <Link to={`/applications/${app.id}`} className="hover:underline" style={{ color: 'var(--text-3)' }}>
            {app.company}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-1)' }}>Official Job Offer & Contract</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/applications/${app.id}`}
            className="text-xs px-3.5 py-2 rounded-xl font-semibold border flex items-center gap-1.5 press-scale"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
          >
            <ArrowLeft size={14} /> Application Details
          </Link>
          <button
            onClick={handlePrint}
            className="text-xs px-3.5 py-2 rounded-xl font-semibold border flex items-center gap-1.5 press-scale"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
          >
            <Printer size={14} /> Print / Save Contract PDF
          </button>
        </div>
      </div>

      {/* Status Alert Banner */}
      {isAccepted && (
        <div
          className="mb-6 p-4 rounded-2xl border flex items-center justify-between gap-4 text-xs font-semibold animate-fadeIn"
          style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={20} className="shrink-0" />
            <div>
              <div className="text-sm font-bold">Official Employment Offer Accepted & Contract Executed!</div>
              <div className="font-normal text-[11px] opacity-90">
                Digitally signed by {signatureName || user?.name || 'Candidate'} on {signedDate || 'Today'}. A copy has been transmitted to {app.company} HR.
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
            VERIFIED CONTRACT #CC-{app.id.toUpperCase()}
          </span>
        </div>
      )}

      {isDeclined && (
        <div
          className="mb-6 p-4 rounded-2xl border flex items-center gap-2.5 text-xs font-semibold"
          style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.3)', color: '#ef4444' }}
        >
          <XCircle size={18} />
          <div>Offer Declined — This opportunity has been marked as closed in your dashboard.</div>
        </div>
      )}

      {/* Offer Banner Card */}
      <div
        className="rounded-2xl p-6 mb-6 border shadow-sm relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card), var(--surface-hover))',
          borderColor: 'var(--border-1)',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <CompanyAvatar name={app.company} size="lg" />
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#7c3aed' }}>
                  CONFIDENTIAL OFFER LETTER
                </span>
                <StatusBadge status={app.status} showDot />
              </div>
              <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {app.role}
              </h1>
              <div className="text-sm font-semibold mt-0.5 flex items-center gap-2" style={{ color: 'var(--accent-text)' }}>
                <span>{app.company}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-normal text-xs" style={{ color: 'var(--text-4)' }}>
                  <MapPin size={12} /> {app.location || 'Nairobi, Kenya'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border flex flex-col gap-1 min-w-[200px]" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
            <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-5)' }}>
              Offered Compensation
            </span>
            <div className="text-lg font-bold font-display" style={{ color: '#10b981' }}>
              {salaryDisplay}
            </div>
            <span className="text-[11px]" style={{ color: 'var(--text-4)' }}>
              + Full Benefits & Medical Cover
            </span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t" style={{ borderColor: 'var(--border-3)' }}>
          {[
            { label: 'Role Title', val: app.role, icon: Briefcase },
            { label: 'Start Date', val: 'September 1, 2026', icon: Calendar },
            { label: 'Employment Type', val: 'Full-time / Permanent', icon: Award },
            { label: 'Work Arrangement', val: app.location?.includes('Remote') ? 'Full Remote' : 'Hybrid (3 days office)', icon: ShieldCheck },
          ].map(({ label, val, icon: Icon }) => (
            <div key={label} className="p-3 rounded-xl border" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
              <div className="text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--text-5)' }}>
                <Icon size={12} className="text-violet-400" /> {label}
              </div>
              <div className="text-xs font-bold truncate" style={{ color: 'var(--text-1)' }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Employment Contract Document Container */}
      <div
        className="rounded-2xl p-8 mb-8 border shadow-lg relative print:shadow-none print:border-none print:p-0"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
      >
        {/* Document Header Seal */}
        <div className="flex items-center justify-between border-b pb-6 mb-6" style={{ borderColor: 'var(--border-2)' }}>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-violet-400 mb-1">
              FORMAL EMPLOYMENT AGREEMENT
            </div>
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-1)' }}>
              {app.company} — Employment Contract
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>
              Document Ref: AGREEMENT-2026-{app.id.toUpperCase()} · Confidential & Privileged
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="w-12 h-12 rounded-full border-2 border-violet-500/30 bg-violet-500/10 flex items-center justify-center mx-auto text-violet-400">
              <ShieldCheck size={24} />
            </div>
            <span className="text-[9px] font-mono tracking-wider text-emerald-400 font-bold block mt-1">
              OFFICIALLY VERIFIED
            </span>
          </div>
        </div>

        {/* Contract Text Clauses */}
        <div className="space-y-6 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
          <p>
            This Employment Agreement (the <strong>"Agreement"</strong>) is made effective as of <strong>August 13, 2026</strong>, by and between{' '}
            <strong style={{ color: 'var(--text-1)' }}>{app.company}</strong> (the <strong>"Employer"</strong>) and{' '}
            <strong style={{ color: 'var(--text-1)' }}>{user?.name || 'the Employee Candidate'}</strong> (the <strong>"Employee"</strong>).
          </p>

          <div>
            <h3 className="font-bold text-sm mb-2 uppercase tracking-wide border-b pb-1" style={{ color: 'var(--text-1)', borderColor: 'var(--border-3)' }}>
              1. Position & Duties
            </h3>
            <p>
              The Employer agrees to employ the Employee in the capacity of <strong>{app.role}</strong>. The Employee shall perform all duties, responsibilities, and tasks customary to such position and as assigned by the engineering & product management teams.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-2 uppercase tracking-wide border-b pb-1" style={{ color: 'var(--text-1)', borderColor: 'var(--border-3)' }}>
              2. Remuneration & Benefits
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Monthly Compensation:</strong> The gross monthly salary shall be <strong>{salaryDisplay}</strong>, payable on the 28th day of each calendar month.
              </li>
              <li>
                <strong>Comprehensive Medical Insurance:</strong> Full inpatient & outpatient health cover provided for employee + up to 2 dependents.
              </li>
              <li>
                <strong>Equipment Stipend:</strong> Employer shall supply a modern work laptop (Apple M-series or modern ThinkPad) plus KES 45,000 home office setup budget.
              </li>
              <li>
                <strong>Paid Leave:</strong> 24 working days of paid annual leave plus all Kenyan public holidays.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-2 uppercase tracking-wide border-b pb-1" style={{ color: 'var(--text-1)', borderColor: 'var(--border-3)' }}>
              3. Confidentiality & Non-Disclosure
            </h3>
            <p>
              The Employee agrees that during and after their employment, they will maintain strict confidentiality regarding all proprietary computer code, customer records, technical specifications, and trade secrets belonging to <strong>{app.company}</strong>.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-2 uppercase tracking-wide border-b pb-1" style={{ color: 'var(--text-1)', borderColor: 'var(--border-3)' }}>
              4. Term & Probation Period
            </h3>
            <p>
              Employment commences on <strong>September 1, 2026</strong>. This contract is subject to a standard 3-month probation period, during which performance reviews will take place bi-weekly. Notice of termination during probation shall be 14 days in writing.
            </p>
          </div>
        </div>

        {/* Signature Box Section */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-2)' }}>
          <div className="flex items-center gap-2 mb-4">
            <PenTool size={16} className="text-violet-400" />
            <h3 className="font-display text-sm font-bold" style={{ color: 'var(--text-1)' }}>
              Execution & Digital Signature
            </h3>
          </div>

          {isAccepted ? (
            <div className="p-5 rounded-2xl border bg-emerald-500/5 border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Digitally Executed & Signed
                </div>
                <div className="font-serif italic text-lg text-emerald-300 font-semibold tracking-wide">
                  {signatureName || user?.name || 'Candidate Signature'}
                </div>
                <div className="text-[10px] text-emerald-500/80 font-mono mt-1">
                  Signed timestamp: {signedDate || 'Aug 13, 2026'} · Digital Hash: 0x8f2e9a...{app.id}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="text-xs px-3 py-1.5 rounded-xl font-bold bg-emerald-600 text-white press-scale flex items-center gap-1"
                >
                  <Download size={13} /> Download Contract Copy
                </button>
              </div>
            </div>
          ) : isDeclined ? (
            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400 font-medium">
              This offer was declined and cannot be executed.
            </div>
          ) : (
            <form onSubmit={handleSignAndAccept} className="space-y-4">
              <div className="p-4 rounded-xl border flex items-start gap-3" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
                <input
                  type="checkbox"
                  id="acceptTermsCheck"
                  checked={acceptedTerms}
                  onChange={e => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded accent-purple-600 cursor-pointer"
                />
                <label htmlFor="acceptTermsCheck" className="text-xs leading-normal cursor-pointer" style={{ color: 'var(--text-2)' }}>
                  <strong>I have read, understood, and hereby accept</strong> all terms and conditions outlined in this Employment Agreement with {app.company}.
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>
                    Type Full Legal Name (Digital Signature) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={signatureName}
                    onChange={e => setSignatureName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>
                    Signature Render Preview
                  </label>
                  <div
                    className="w-full px-4 py-2 text-base rounded-xl font-serif italic flex items-center justify-between border"
                    style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--accent-text)' }}
                  >
                    <span>{signatureName.trim() || 'Your Signature Here'}</span>
                    <span className="text-[10px] font-sans non-italic opacity-60">Verified Ink</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <button
                  type="submit"
                  disabled={!acceptedTerms || !signatureName.trim()}
                  className="text-xs px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-white press-scale shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                  <PartyPopper size={16} /> Sign Contract & Accept Offer Now
                </button>

                <button
                  type="button"
                  onClick={() => setShowDeclineModal(true)}
                  className="text-xs px-4 py-3 rounded-xl font-semibold press-scale border"
                  style={{ color: 'var(--text-4)', borderColor: 'var(--border-1)' }}
                >
                  Decline Offer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Decline Confirmation Modal */}
      {showDeclineModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={() => setShowDeclineModal(false)}
        >
          <div
            className="w-full max-w-md max-h-[85vh] my-auto p-6 rounded-2xl border shadow-2xl space-y-4 relative shrink-0 overflow-y-auto"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDeclineModal(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-4)' }}
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-red-400 font-bold text-base pr-6">
              <AlertCircle size={20} /> Decline Employment Offer?
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Are you sure you want to decline the offer from <strong>{app.company}</strong> for <strong>{app.role}</strong>? This action will notify the hiring team and mark this application as closed.
            </p>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-4)' }}>
                Optional feedback / reason:
              </label>
              <textarea
                rows={3}
                value={declineReason}
                onChange={e => setDeclineReason(e.target.value)}
                placeholder="e.g. Accepted another offer, salary expectations, etc."
                className="w-full text-xs rounded-xl p-3 outline-none resize-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowDeclineModal(false)}
                className="text-xs px-4 py-2 rounded-xl font-semibold border"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-3)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecline}
                className="text-xs px-4 py-2 rounded-xl font-bold bg-red-500 text-white press-scale"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
