import { useState, useEffect } from 'react'
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
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
                Target: <strong>{resume.targetRole}</strong> • Last modified {resume.updatedDate} • {wordCount} words
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-xl border text-xs" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              >
                <Eye size={14} /> Preview & Read
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'edit' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              >
                <Edit3 size={14} /> Live Editor
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border press-scale"
              style={{ borderColor: 'var(--border-1)', color: 'var(--text-4)', background: 'var(--bg-card)' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="px-5 py-2.5 border-b flex items-center justify-between text-xs flex-wrap gap-2" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border-1)' }}>
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-3)' }}>
            <span>Stats: <strong>{wordCount}</strong> words | <strong>{charCount}</strong> characters</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border press-scale"
              style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            {!resume.isDefault && (
              <button
                onClick={handleSetDefault}
                className="px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border press-scale"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
              >
                <Star size={14} className="text-amber-400" />
                <span>Make Default</span>
              </button>
            )}

            {activeTab === 'edit' && (
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-lg font-bold flex items-center gap-1.5 text-white press-scale shadow"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                {savedSuccess ? <Check size={14} /> : <Save size={14} />}
                <span>{savedSuccess ? 'Saved!' : 'Save CV Changes'}</span>
              </button>
            )}

            <button
              onClick={handleDelete}
              className="px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 text-rose-400 border press-scale"
              style={{ borderColor: 'rgba(244,63,94,0.2)', background: 'rgba(244,63,94,0.06)' }}
              title="Delete Resume"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'preview' ? (
            <div
              className="max-w-3xl mx-auto p-8 rounded-2xl border shadow-sm font-sans whitespace-pre-wrap leading-relaxed text-sm select-text"
              style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)', color: 'var(--text-1)' }}
            >
              {editableContent}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="p-3 rounded-xl border flex items-center justify-between text-xs" style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)', color: 'var(--text-2)' }}>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={15} className="text-indigo-400" />
                  <strong>Live Editor:</strong> Make edits below. Changes persist to your personal CareerCompass account.
                </span>
              </div>
              <textarea
                value={editableContent}
                onChange={e => setEditableContent(e.target.value)}
                rows={22}
                className="w-full p-5 rounded-2xl border text-xs font-mono leading-relaxed outline-none focus:border-indigo-500 transition-all resize-y"
                style={{ background: 'var(--input-bg)', borderColor: 'var(--border-1)', color: 'var(--text-1)' }}
                placeholder="Type or paste your CV content here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
