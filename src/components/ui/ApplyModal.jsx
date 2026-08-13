import { useState, useEffect } from 'react'
import {
  FileText, Sparkles, CheckCircle2, ShieldCheck, ArrowRight,
  ArrowLeft, Edit3, Eye, FileCode, RefreshCw, Layers, Check,
} from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'
import Modal from './Modal'

export default function ApplyModal({ isOpen, onClose, job, existingApp, onSuccess }) {
  const { resumes, applyToJob, updateApplicationStatus, user } = useAppData()

  const defaultResume = resumes.find(r => r.isDefault) || resumes[0] || null

  const [step, setStep] = useState(1) // 1: CV, 2: Cover Letter, 3: Review
  const [selectedResumeId, setSelectedResumeId] = useState(defaultResume?.id || null)
  const [editingCvSummary, setEditingCvSummary] = useState(false)
  const [cvSummaryText, setCvSummaryText] = useState('')
  const [coverLetterText, setCoverLetterText] = useState('')
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)

  const selectedResume = resumes.find(r => r.id === selectedResumeId) || defaultResume

  // Initialize pre-filled data when modal opens
  useEffect(() => {
    if (job) {
      const company = job.company || 'the Hiring Team'
      const role = job.title || 'the open role'
      const name = user?.name || 'Applicant'

      // Pre-fill initial Cover Letter draft
      const defaultLetter = `Dear ${company} Hiring Team,\n\nI am writing to express my strong enthusiasm for the ${role} position at ${company}. With my background in ${job.skills ? job.skills.join(', ') : 'modern technology & software development'}, I am confident in my ability to contribute effectively to your engineering goals.\n\nThank you for considering my application. I look forward to discussing how my skills align with your team's vision.\n\nSincerely,\n${name}`

      setCoverLetterText(existingApp?.coverLetter || defaultLetter)
      setCvSummaryText(
        `Tailored for ${role} at ${company}: Focused on ${job.skills ? job.skills.slice(0, 3).join(', ') : 'full-stack engineering'}.`
      )
    }
  }, [job, user, existingApp])

  if (!isOpen || !job) return null

  const handleAiTailorCoverLetter = () => {
    setIsGeneratingAi(true)
    setTimeout(() => {
      const skillsList = job.skills && job.skills.length > 0 ? job.skills.join(', ') : 'software engineering'
      const company = job.company || 'your organization'
      const role = job.title || 'this role'
      const name = user?.name || 'Applicant'

      const aiTailored = `Dear ${company} Recruitment Team,\n\nI am thrilled to submit my application for the ${role} role at ${company}. Having reviewed your core requirements for expertise in ${skillsList}, I am confident that my technical proficiency and problem-solving approach make me an ideal fit.\n\nAt ${company}, I aim to leverage my hands-on experience in building scalable components and user-centric features. I am particularly excited about ${job.description ? job.description.slice(0, 90) + '...' : 'your current product expansion'}.\n\nI welcome the opportunity for an interview to demonstrate how my background can drive value for ${company}.\n\nBest regards,\n${name}`

      setCoverLetterText(aiTailored)
      setIsGeneratingAi(false)
    }, 600)
  }

  const handleSubmit = () => {
    let appId = null
    if (existingApp && existingApp.status === 'Saved') {
      appId = applyToJob(job.id, {
        resumeId: selectedResume?.id || null,
        resumeName: selectedResume?.name || 'Submitted_CV.pdf',
        coverLetter: coverLetterText,
      })
    } else {
      appId = applyToJob(job.id, {
        resumeId: selectedResume?.id || null,
        resumeName: selectedResume?.name || 'Submitted_CV.pdf',
        coverLetter: coverLetterText,
      })
    }

    if (onSuccess) {
      onSuccess(appId || existingApp?.id)
    }
    onClose()
  }

  return (
    <Modal title={`Application Submission — ${job.company}`} onClose={onClose}>
      <div className="space-y-4">
        {/* Verified badge header */}
        <div
          className="flex items-center gap-2 p-3 rounded-xl text-xs border"
          style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.25)', color: 'var(--text-3)' }}
        >
          <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
          <span>
            <strong style={{ color: '#34d399' }}>Verified Employer Portal.</strong> You can review, edit, and tailor both your CV summary & cover letter before final delivery.
          </span>
        </div>

        {/* Step Indicator Stepper */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl border text-xs" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
          {[
            { id: 1, label: '1. Select & Tailor CV' },
            { id: 2, label: '2. Review Cover Letter' },
            { id: 3, label: '3. Final Submission' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`font-semibold px-2 py-1 rounded-lg transition-colors ${
                step === s.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{ background: step === s.id ? 'var(--accent)' : 'transparent' }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* ── STEP 1: CV SELECTION & CUSTOMIZATION ── */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-4)' }}>
                Select Active Resume / CV File
              </label>
              <div className="space-y-2">
                {resumes.length === 0 && (
                  <div className="p-3 text-xs rounded-xl border" style={{ borderColor: 'var(--border-2)', color: 'var(--text-4)' }}>
                    No uploaded CVs found. Default application profile will be submitted.
                  </div>
                )}
                {resumes.map(r => (
                  <label
                    key={r.id}
                    className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border"
                    style={{
                      background: selectedResumeId === r.id ? 'var(--accent-bg-subtle)' : 'var(--bg-page)',
                      borderColor: selectedResumeId === r.id ? 'var(--accent)' : 'var(--border-2)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="selectedResume"
                        checked={selectedResumeId === r.id}
                        onChange={() => setSelectedResumeId(r.id)}
                        className="accent-purple-600 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-1)' }}>
                          <FileText size={14} className="text-violet-400" /> {r.name}
                          {r.isDefault && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ background: 'var(--accent-bg)', color: 'var(--accent-text)' }}>
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-4)' }}>
                          Target Role: {r.targetRole || 'Software Engineer'} · {r.size || 'PDF'}
                        </div>
                      </div>
                    </div>
                    {selectedResumeId === r.id && <CheckCircle2 size={16} className="text-emerald-400" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Live CV Customization Preview */}
            {selectedResume && (
              <div className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-1)' }}>
                    <Edit3 size={13} className="text-amber-400" /> Customized CV Application Summary
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingCvSummary(!editingCvSummary)}
                    className="text-[11px] font-semibold text-violet-400 hover:underline"
                  >
                    {editingCvSummary ? 'Done Editing' : 'Edit Summary'}
                  </button>
                </div>

                {editingCvSummary ? (
                  <textarea
                    rows={3}
                    value={cvSummaryText}
                    onChange={e => setCvSummaryText(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg outline-none resize-none"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                  />
                ) : (
                  <p className="text-xs italic p-2.5 rounded-lg border leading-relaxed" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
                    "{cvSummaryText}"
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs px-5 py-2.5 rounded-xl font-bold text-white press-scale flex items-center gap-1.5"
                style={{ background: 'var(--accent)' }}
              >
                Next: Review Cover Letter <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: COVER LETTER REVIEW & EDITOR ── */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-4)' }}>
                Cover Letter Draft
              </label>
              <button
                type="button"
                onClick={handleAiTailorCoverLetter}
                disabled={isGeneratingAi}
                className="text-xs px-3 py-1.5 rounded-xl font-bold press-scale flex items-center gap-1.5 text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
              >
                <Sparkles size={13} className={isGeneratingAi ? 'animate-spin' : ''} />
                {isGeneratingAi ? 'Tailoring with AI...' : '⚡ AI Tailor to Job Requirements'}
              </button>
            </div>

            <textarea
              rows={8}
              value={coverLetterText}
              onChange={e => setCoverLetterText(e.target.value)}
              placeholder="Write or edit your cover letter..."
              className="w-full text-xs p-3.5 rounded-xl outline-none leading-relaxed font-sans resize-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
            />

            <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-5)' }}>
              <span>{coverLetterText.split(/\s+/).filter(Boolean).length} words · {coverLetterText.length} characters</span>
              <span>Fully editable before submitting</span>
            </div>

            {/* ── Collapsible Application Guidelines & Pro Tips ── */}
            <div className="rounded-xl border overflow-hidden text-xs" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
              <div className="p-3 font-semibold flex items-center justify-between cursor-pointer select-none" style={{ color: 'var(--text-2)' }}>
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Sparkles size={14} /> Application Guidelines & Pro Tips (What employers look for)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-amber-400/10 text-amber-300">Tips</span>
              </div>
              <div className="px-3 pb-3 pt-1 space-y-2 border-t text-[11px]" style={{ borderColor: 'var(--border-3)', color: 'var(--text-3)' }}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <span className="font-bold block text-emerald-400 mb-1">✅ What to write (Do's)</span>
                    <ul className="space-y-1 list-disc pl-3">
                      <li>Quantify results: "Improved speed by 35%".</li>
                      <li>Name specific projects relevant to {job.company}.</li>
                      <li>Match key technical skills listed in the JD.</li>
                    </ul>
                  </div>
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)' }}>
                    <span className="font-bold block text-rose-400 mb-1">❌ What to avoid (Don'ts)</span>
                    <ul className="space-y-1 list-disc pl-3">
                      <li>Avoid generic openers ("To whom it may concern").</li>
                      <li>Don't copy your resume line for line.</li>
                      <li>Keep cover letter under 300 words.</li>
                    </ul>
                  </div>
                </div>
                <div className="p-2 rounded-lg font-mono text-[10px]" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-2)' }}>
                  <span className="font-bold text-indigo-400 block mb-0.5">🚀 Power Action Verbs to use:</span>
                  Engineered • Spearheaded • Optimized • Scaled • Delivered • Standardized • Automated
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs px-4 py-2 rounded-xl font-semibold border flex items-center gap-1"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-3)' }}
              >
                <ArrowLeft size={14} /> Back to CV
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs px-5 py-2.5 rounded-xl font-bold text-white press-scale flex items-center gap-1.5"
                style={{ background: 'var(--accent)' }}
              >
                Next: Final Review <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: FINAL REVIEW & CONFIRM ── */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
              <div className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Application Package Summary
              </div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>
                {job.title} — {job.company}
              </div>
              <div className="text-xs flex items-center gap-3" style={{ color: 'var(--text-4)' }}>
                <span>Location: {job.location}</span>
                <span>·</span>
                <span>Salary: {job.salary}</span>
              </div>

              <div className="pt-2 border-t space-y-2 text-xs" style={{ borderColor: 'var(--border-2)' }}>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--text-4)' }}>Attached CV:</span>
                  <strong style={{ color: 'var(--text-1)' }}>{selectedResume?.name || 'Default_CV.pdf'}</strong>
                </div>
                <div className="flex items-start justify-between">
                  <span style={{ color: 'var(--text-4)' }}>Cover Letter:</span>
                  <span className="truncate max-w-[220px] font-mono text-[11px]" style={{ color: 'var(--accent-text)' }}>
                    {coverLetterText.slice(0, 45)}...
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs px-4 py-2 rounded-xl font-semibold border flex items-center gap-1"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-3)' }}
              >
                <ArrowLeft size={14} /> Back to Cover Letter
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-xs px-6 py-3 rounded-xl font-bold text-white press-scale flex items-center gap-2 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                <CheckCircle2 size={16} /> Confirm & Submit Application Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
