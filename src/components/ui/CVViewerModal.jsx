import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Edit3, Eye, Copy, Check, Star, Trash2, FileText, Save, Sparkles, Download } from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

export default function CVViewerModal({ resume, isOpen, onClose }) {
  const { updateResumeContent, setDefaultResume, deleteResume } = useAppData()
  const [activeTab, setActiveTab] = useState('preview') // 'preview' | 'edit'
  const [editableContent, setEditableContent] = useState('')
  const [copied, setCopied] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    if (resume) {
      setEditableContent(resume.content || `[No detailed text stored for ${resume.name}]\nTarget Role: ${resume.targetRole}\nUpdated: ${resume.updatedDate}`)
    }
  }, [resume])

  if (!isOpen || !resume) return null

  const wordCount = editableContent.trim() ? editableContent.trim().split(/\s+/).length : 0
  const charCount = editableContent.length

  const handleSave = () => {
    updateResumeContent(resume.id, editableContent)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSetDefault = () => {
    setDefaultResume(resume.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${resume.name}"?`)) {
      deleteResume(resume.id)
      onClose()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      style={{
        background: 'rgba(8, 14, 31, 0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[85vh] my-auto rounded-2xl border shadow-2xl flex flex-col relative animate-scaleUp overflow-hidden shrink-0"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)', color: 'var(--text-1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b flex items-center justify-between gap-4 shrink-0 flex-wrap" style={{ borderColor: 'var(--border-1)', background: 'var(--bg-card)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-indigo-400 border shrink-0" style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.2)' }}>
              <FileText size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display" style={{ color: 'var(--text-1)' }}>
                  {resume.name}
                </h2>
                {resume.isDefault && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-amber-400 border" style={{ background: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)' }}>
                    Default CV
                  </span>
                )}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-4)' }}>
                Target: <strong>{resume.targetRole}</strong> • Match Score: <strong className="text-emerald-400">{resume.matchScore}%</strong> • {wordCount} words
              </p>
            </div>
          </div>

          {/* Controls & Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex p-1 rounded-xl border text-xs" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)' }}>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                <Eye size={14} /> Preview
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${activeTab === 'edit' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                <Edit3 size={14} /> Edit Content
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border hover:bg-white/10 press-scale transition-colors ml-1"
              style={{ borderColor: 'var(--border-1)', color: 'var(--text-4)' }}
              title="Close modal"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'preview' ? (
            <div className="space-y-4">
              {/* Document Paper Container */}
              <div className="p-6 sm:p-8 rounded-xl border shadow-inner font-sans text-xs leading-relaxed space-y-4 whitespace-pre-wrap font-mono" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)', color: 'var(--text-2)' }}>
                {editableContent}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-4)' }}>
                <span className="flex items-center gap-1">
                  <Sparkles size={14} className="text-indigo-400" /> Live Editor Mode — Changes auto-save to your CareerCompass profile
                </span>
                <span>{charCount} characters | {wordCount} words</span>
              </div>
              <textarea
                value={editableContent}
                onChange={e => setEditableContent(e.target.value)}
                rows={16}
                className="w-full p-4 rounded-xl border text-xs font-mono outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all leading-relaxed"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--border-1)', color: 'var(--text-1)' }}
                placeholder="Paste or type your resume content here..."
              />
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t flex items-center justify-between gap-3 shrink-0 flex-wrap" style={{ borderColor: 'var(--border-1)', background: 'var(--bg-card)' }}>
          <div className="flex items-center gap-2">
            {!resume.isDefault && (
              <button
                onClick={handleSetDefault}
                className="px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 press-scale"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
              >
                <Star size={13} className="text-amber-400" /> Make Default
              </button>
            )}
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 text-rose-400 hover:bg-rose-500/10 press-scale"
              style={{ borderColor: 'rgba(244,63,94,0.3)' }}
            >
              <Trash2 size={13} /> Delete CV
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 press-scale"
              style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 press-scale shadow-md"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              {savedSuccess ? <Check size={14} /> : <Save size={14} />}
              <span>{savedSuccess ? 'Saved to Profile!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
