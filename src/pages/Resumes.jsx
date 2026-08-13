import { useState } from 'react'
import { Plus, Sparkles, FileText, CheckCircle2, AlertCircle, Copy, Download, Wand2 } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import ResumeCard from '../components/domain/ResumeCard'
import Modal from '../components/ui/Modal'

export default function Resumes() {
  const { resumes, jobs, addResume, setDefaultResume, deleteResume, user } = useAppData()

  const [activeTab, setActiveTab] = useState('cvs') // 'cvs' | 'ats' | 'coverletter'
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [targetRole, setTargetRole] = useState('')

  // ATS Matcher State
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '')
  const [jobDescription, setJobDescription] = useState(jobs[0]?.description || '')
  const [atsScore, setAtsScore] = useState(88)
  const [analyzing, setAnalyzing] = useState(false)

  // Cover Letter Generator State
  const [clRole, setClRole] = useState('Frontend Developer Intern')
  const [clCompany, setClCompany] = useState('Andela / Safaricom')
  const [clTone, setClTone] = useState('Professional & Enthusiastic')
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAdd = () => {
    if (!name.trim()) return
    addResume({ name: name.trim(), targetRole: targetRole.trim() || 'General' })
    setName('')
    setTargetRole('')
    setShowAdd(false)
  }

  const handleAnalyzeATS = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAtsScore(Math.floor(Math.random() * 15) + 82)
      setAnalyzing(false)
    }, 800)
  }

  const handleGenerateCoverLetter = (e) => {
    e.preventDefault()
    setGenerating(true)
    setTimeout(() => {
      const letter = `Dear Hiring Manager at ${clCompany},

I am writing to express my strong enthusiasm for the ${clRole} position. With a solid foundation in software development, React, JavaScript, and modern web architectures, I am eager to contribute to ${clCompany}'s mission and engineering excellence.

During my recent projects, I built accessible, performant web applications and collaborated across teams to deliver high-impact user interfaces. I am particularly impressed by ${clCompany}'s commitment to digital innovation and scalability.

I would welcome the opportunity to discuss how my technical skills and enthusiasm align with your team's goals. Thank you for your time and consideration.

Sincerely,
${user?.name || 'Gladys Wanjiku'}
${user?.email || 'gladys@example.com'}`

      setGeneratedLetter(letter)
      setGenerating(false)
    }, 1000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>
            AI CV Studio & ATS Optimizer
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-4)' }}>
            Optimize your CV for ATS scanners and generate tailored cover letters in seconds.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl shrink-0" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
          <button
            onClick={() => setActiveTab('cvs')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
            style={{
              background: activeTab === 'cvs' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'cvs' ? 'white' : 'var(--text-4)',
            }}
          >
            My CVs ({resumes.length})
          </button>
          <button
            onClick={() => setActiveTab('ats')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1"
            style={{
              background: activeTab === 'ats' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'ats' ? 'white' : 'var(--text-4)',
            }}
          >
            <Sparkles size={13} /> ATS Analyzer
          </button>
          <button
            onClick={() => setActiveTab('coverletter')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1"
            style={{
              background: activeTab === 'coverletter' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'coverletter' ? 'white' : 'var(--text-4)',
            }}
          >
            <Wand2 size={13} /> Cover Letter Studio
          </button>
        </div>
      </div>

      {/* Tab 1: CV Manager */}
      {activeTab === 'cvs' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono" style={{ color: 'var(--text-5)' }}>SAVED RESUME DOCUMENTS</span>
            <button
              onClick={() => setShowAdd(true)}
              className="text-xs px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 text-white press-scale"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              <Plus size={14} /> Add New CV
            </button>
          </div>

          {resumes.length === 0 ? (
            <div className="rounded-xl p-12 text-center" style={{ background: 'var(--bg-card)', border: '1px dashed var(--border-2)' }}>
              <p className="text-sm" style={{ color: 'var(--text-4)' }}>No CVs yet. Add one to start applying.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {resumes.map((r, i) => (
                <ResumeCard
                  key={r.id}
                  resume={r}
                  onSetDefault={setDefaultResume}
                  onDelete={deleteResume}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Tab 2: ATS Scanner & Optimizer */}
      {activeTab === 'ats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-2)' }}>
                1. Select Target Job Position
              </label>
              <select
                value={selectedJobId}
                onChange={e => {
                  setSelectedJobId(e.target.value)
                  const j = jobs.find(x => x.id === e.target.value)
                  if (j) setJobDescription(j.description)
                }}
                className="w-full px-3 py-2 text-sm rounded-xl outline-none mb-4"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              >
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.company} — {j.title}</option>
                ))}
              </select>

              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-2)' }}>
                2. Job Description & Keyword Requirements
              </label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl outline-none resize-none mb-3"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />

              <button
                onClick={handleAnalyzeATS}
                disabled={analyzing}
                className="w-full py-2.5 rounded-xl font-medium text-xs text-white flex items-center justify-center gap-2 press-scale"
                style={{ background: 'var(--accent)' }}
              >
                {analyzing ? 'Scanning ATS Keywords...' : 'Calculate ATS Compatibility Score'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Score Card */}
            <div className="p-6 rounded-2xl border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <div className="text-xs font-mono mb-2" style={{ color: 'var(--text-5)' }}>ATS COMPATIBILITY SCORE</div>
              <div className="text-4xl font-extrabold font-display my-2 text-emerald-500">
                {atsScore}%
              </div>
              <p className="text-xs" style={{ color: 'var(--text-4)' }}>
                High compatibility! Your CV matches most required keywords.
              </p>
            </div>

            {/* Keyword breakdown */}
            <div className="p-5 rounded-2xl border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <div className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>Keyword Breakdown</div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-500 font-medium">
                  <CheckCircle2 size={14} /> Matched Skills:
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {['React', 'JavaScript', 'Git', 'CSS', 'REST API'].map(k => (
                    <span key={k} className="px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-xs pt-2">
                <div className="flex items-center gap-1.5 text-amber-500 font-medium">
                  <AlertCircle size={14} /> Missing High-Impact Keywords:
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {['TypeScript', 'Unit Testing', 'CI/CD Pipelines'].map(k => (
                    <span key={k} className="px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>
                      + Add {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Cover Letter Studio */}
      {activeTab === 'coverletter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={handleGenerateCoverLetter} className="p-6 rounded-2xl border space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <h3 className="font-display font-bold text-base" style={{ color: 'var(--text-1)' }}>1-Click Tailored Cover Letter Generator</h3>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Target Company Name</label>
              <input
                type="text"
                required
                value={clCompany}
                onChange={e => setClCompany(e.target.value)}
                placeholder="e.g. Safaricom / Andela"
                className="w-full px-3 py-2 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Target Role Title</label>
              <input
                type="text"
                required
                value={clRole}
                onChange={e => setClRole(e.target.value)}
                placeholder="e.g. Frontend Developer Intern"
                className="w-full px-3 py-2 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-3)' }}>Letter Tone & Style</label>
              <select
                value={clTone}
                onChange={e => setClTone(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              >
                <option value="Professional & Enthusiastic">Professional & Enthusiastic</option>
                <option value="Executive & Direct">Executive & Direct</option>
                <option value="Creative & Energetic">Creative & Energetic</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-3 rounded-xl font-medium text-xs text-white flex items-center justify-center gap-2 press-scale"
              style={{ background: 'linear-gradient(135deg, var(--accent), #7c3aed)' }}
            >
              <Sparkles size={14} />
              {generating ? 'Drafting Cover Letter...' : 'Generate Tailored Cover Letter'}
            </button>
          </form>

          {/* Generated Letter Preview */}
          <div className="p-6 rounded-2xl border flex flex-col justify-between" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>Generated Preview</span>
                {generatedLetter && (
                  <button
                    onClick={handleCopy}
                    className="text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors hover:opacity-80"
                    style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)' }}
                  >
                    <Copy size={13} /> {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                )}
              </div>

              {generatedLetter ? (
                <div className="p-4 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap" style={{ background: 'var(--bg-page)', border: '1px solid var(--border-2)', color: 'var(--text-2)' }}>
                  {generatedLetter}
                </div>
              ) : (
                <div className="py-16 text-center text-xs" style={{ color: 'var(--text-4)' }}>
                  Fill in the role & company above and click generate to create your cover letter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add CV Modal */}
      {showAdd && (
        <Modal title="Add a CV Record" onClose={() => setShowAdd(false)}>
          <div className="flex flex-col gap-3">
            <label className="text-xs" style={{ color: 'var(--text-5)' }}>
              CV Label / Version Name
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Frontend React CV v2"
                className="w-full mt-1 text-sm rounded-lg px-3 py-2 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />
            </label>
            <label className="text-xs" style={{ color: 'var(--text-5)' }}>
              Target Industry Role
              <input
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineering"
                className="w-full mt-1 text-sm rounded-lg px-3 py-2 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />
            </label>
            <button
              onClick={handleAdd}
              className="mt-2 text-sm px-5 py-2.5 rounded-xl font-medium press-scale"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              Save CV Record
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

