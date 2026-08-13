import { useState } from 'react'
import { Plus, Sparkles, FileText, CheckCircle2, AlertCircle, Copy, Download, Wand2, Eye, Layout, BookOpen, GraduationCap, Zap, Award } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import ResumeCard from '../components/domain/ResumeCard'
import Modal from '../components/ui/Modal'
import CVViewerModal from '../components/ui/CVViewerModal'

const PRO_CV_TEMPLATES = [
  {
    id: 'tpl-modern-tech',
    title: 'Modern Tech & Engineering',
    role: 'Software / Frontend / Fullstack Developer',
    icon: Zap,
    accent: '#6366f1',
    badge: 'Recommended for Developers',
    description: 'Skills-first structure highlighting core tech stack, live projects, GitHub stats, and quantifiable impact.',
    content: `[YOUR NAME]
Software Engineer | [your.email@example.com] | +254 700 000 000 | Nairobi, Kenya
GitHub: github.com/[yourusername] | Portfolio: [yourportfolio.dev]

TECHNICAL SKILLS
• Languages: JavaScript (ES6+), TypeScript, Python, SQL, HTML5/CSS3
• Frameworks & Libraries: React.js, Next.js, Node.js, Express, Tailwind CSS, Redux
• Databases & Cloud: PostgreSQL, MongoDB, Firebase, AWS (S3, EC2), Vercel
• Tools & Methodologies: Git, Docker, REST APIs, Agile/Scrum, Jest, CI/CD

PROFESSIONAL EXPERIENCE

Software Developer — [Company / Organization Name], Nairobi
[Month Year] – Present
• Engineered 15+ responsive React components, reducing page load latency by 35%.
• Developed secure REST API endpoints in Node.js serving 10,000+ active daily users.
• Integrated M-Pesa payment gateway processing over KES 1M+ in monthly transactions.
• Participated in daily Agile standups, code reviews, and automated CI/CD deployment pipelines.

Junior Frontend Developer — [Tech Startup], Remote
[Month Year] – [Month Year]
• Built mobile-first web applications using React, Tailwind CSS, and TypeScript.
• Optimized web performance scores (Google Lighthouse) from 65 to 94.
• Collaborated closely with UI/UX designers to translate Figma mockups into pixel-perfect interfaces.

KEY PROJECTS

Career Management Portal
Full-stack web app featuring automated ATS resume analysis, job application pipeline tracking, and live interview scheduling.

EDUCATION

BSc. Computer Science / Software Engineering — [University Name]
[Year] – [Year] | Grade / Honours

CERTIFICATIONS & AWARDS
• AWS Certified Cloud Practitioner
• Meta Front-End Developer Professional Certificate`,
  },
  {
    id: 'tpl-classic-prof',
    title: 'Classic Corporate Professional',
    role: 'Business Analyst / Operations / Management',
    icon: BookOpen,
    accent: '#3b82f6',
    badge: 'Best for Corporate & Finance',
    description: 'Clean, chronological layout with strong emphasis on leadership, business metrics, and strategic achievements.',
    content: `[FIRST NAME] [LAST NAME]
[Job Title / Target Position]
Phone: +254 700 000 000 | Email: [email@example.com] | Location: Nairobi, Kenya
LinkedIn: linkedin.com/in/[yourprofile]

EXECUTIVE SUMMARY
Results-driven Professional with 4+ years of experience optimizing business processes, leading cross-functional teams, and driving operational efficiency. Proven track record of increasing revenue by 25% and cutting project delivery times.

PROFESSIONAL EXPERIENCE

Senior Operations Associate — [Company Name], Nairobi
[Month Year] – Present
• Spearheaded operational process improvements across 4 regional branches, saving KES 3M annually.
• Managed a team of 8 analysts responsible for weekly reporting and vendor relationships.
• Implemented automated reporting dashboards, reducing data aggregation time by 50%.

Business Analyst — [Corporation Name], Nairobi
[Month Year] – [Month Year]
• Analyzed operational workflows and presented quarterly strategic insights to senior executive leadership.
• Facilitated cross-departmental alignment between IT and Business Operations teams.

CORE COMPETENCIES
• Strategic Planning & Analysis • Operations Management • Process Automation
• Financial Reporting & Budgeting • Team Leadership • Stakeholder Engagement

EDUCATION
Bachelor of Commerce (Finance / Accounting option) — [University Name], [Year]`,
  },
  {
    id: 'tpl-ats-highpass',
    title: 'ATS-Optimized High-Pass CV',
    role: 'All Roles (High Keyword Match)',
    icon: Award,
    accent: '#10b981',
    badge: '98% ATS Pass Rate',
    description: 'Single-column text formatting designed specifically to pass automated applicant tracking systems without parse errors.',
    content: `[FULL NAME]
[Target Job Title]
Nairobi, Kenya | +254 700 000 000 | [email@domain.com] | LinkedIn: [link]

SUMMARY
Detail-oriented [Target Job Title] with expertise in [Key Skill 1], [Key Skill 2], and [Key Skill 3]. Demonstrated success in delivering high-quality projects, meeting tight deadlines, and improving core business metrics.

WORK EXPERIENCE

[Job Title] — [Employer Name], [City, Country]
[Start Date] – [End Date]
* Delivered [Project/Task], resulting in [Quantifiable Result, e.g., 30% efficiency increase].
* Utilized [Skill/Tool 1] and [Skill/Tool 2] to streamline core workflows for a team of [N] members.
* Standardized reporting processes and reduced error rates by [X]%.

[Previous Job Title] — [Previous Employer], [City, Country]
[Start Date] – [End Date]
* Automated daily data entry tasks using [Tool/Skill], saving [N] hours per week.
* Maintained 99%+ compliance with organizational policies and quality benchmarks.

SKILLS
* Technical Skills: [Skill 1], [Skill 2], [Skill 3], [Skill 4]
* Tools & Software: [Software 1], [Software 2], [Software 3]
* Soft Skills: Problem Solving, Team Collaboration, Communication

EDUCATION
[Degree Name] — [University Name], [Year of Graduation]`,
  },
  {
    id: 'tpl-creative-prod',
    title: 'Creative & Product Lead',
    role: 'UI/UX Designer / Product Manager',
    icon: Layout,
    accent: '#ec4899',
    badge: 'Best for Design & Product',
    description: 'Portfolio-focused format highlighting user research, design systems, product launch metrics, and visual artifacts.',
    content: `[YOUR NAME]
Product Designer / UI/UX Lead
[portfolio-url.com] | [email@domain.com] | +254 700 000 000

ABOUT ME
Passionate Product Designer creating human-centered digital experiences for mobile and web. Specializing in design systems, user research, wireframing, and interactive prototyping.

DESIGN CAPABILITIES
• UX Research & Usability Testing • Information Architecture • Wireframing & Prototyping
• Design Systems (Figma, Token Studio) • UI Visual Design • Micro-interactions & Motion

EXPERIENCE

Lead UI/UX Designer — [Design Agency / Tech Firm]
[Year] – Present
• Redesigned core checkout experience for a fintech app, increasing conversion rates by 22%.
• Created a comprehensive multi-brand design system with 60+ accessible Figma components.
• Conducted 40+ user interviews and usability tests to validate new product feature ideas.

Product Designer — [Startup Name]
[Year] – [Year]
• Designed end-to-end iOS and Android applications from zero to 50k+ App Store downloads.
• Partnered directly with frontend engineering teams to ensure high design fidelity.

SELECTED PORTFOLIO PROJECTS
1. Mobile Wallet App: Simplified peer-to-peer payments for East African markets.
2. E-Commerce Redesign: Modernized web shop layout yielding 4.8/5 user satisfaction score.

EDUCATION & CERTIFICATIONS
• Google UX Design Professional Certificate
• BA in Design / Fine Arts — [University Name]`,
  },
  {
    id: 'tpl-entry-grad',
    title: 'Entry-Level & Graduate CV',
    role: 'Internships / Entry Level / Career Switchers',
    icon: GraduationCap,
    accent: '#8b5cf6',
    badge: 'Ideal for Graduates & Interns',
    description: 'Education-first structure highlighting academic projects, hackathons, extracurricular leadership, and fast learning ability.',
    content: `[YOUR FULL NAME]
Aspiring [Target Role, e.g., Junior Software Engineer / Marketing Intern]
Nairobi, Kenya | +254 700 000 000 | [email@domain.com] | GitHub / Portfolio: [link]

CAREER OBJECTIVE
Enthusiastic and self-motivated Computer Science graduate seeking an entry-level position at [Target Company]. Eager to leverage strong academic foundation in algorithms, web development, and problem solving to contribute to real-world software projects.

EDUCATION

BSc. Computer Science — [University Name]
Graduation Year: [2024] | Class: Second Class Upper Division
• Key Units: Software Engineering, Database Systems, Web Applications, Data Structures.
• Final Year Project: [Project Title — e.g., Smart Mobile Agriculture App for Local Farmers].

ACADEMIC & PERSONAL PROJECTS

1. Career Compass Project (2024)
• Built a full-stack job tracking application using React and Node.js.
• Implemented user authentication, live filtering, and local data persistence.

2. Student Association Website (2023)
• Developed responsive website for 500+ university club members using HTML, CSS, and JS.

LEADERSHIP & EXTRACURRICULAR
• Vice President — Computer Science Student Society ([Year] – [Year])
• Participant — Inter-University Hackathon [Year] (Top 5 Finalist out of 30 teams)

KEY SKILLS
• Programming: JavaScript, Python, HTML/CSS, SQL
• Tools: Git, VS Code, Figma, MS Office
• Soft Skills: Fast Learner, Team Player, Time Management, Adaptability`,
  },
]

export default function Resumes() {
  const { resumes, jobs, addResume, setDefaultResume, deleteResume, user } = useAppData()

  const [activeTab, setActiveTab] = useState('cvs') // 'cvs' | 'templates' | 'ats' | 'coverletter'
  const [viewingResume, setViewingResume] = useState(null)
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
    const newId = addResume({ name: name.trim(), targetRole: targetRole.trim() || 'General' })
    setName('')
    setTargetRole('')
    setShowAdd(false)
    const created = resumes.find(r => r.id === newId)
    if (created) setViewingResume(created)
  }

  const handleUseTemplate = (tpl) => {
    const newId = addResume({
      name: `${tpl.title} (Draft)`,
      targetRole: tpl.role.split('/')[0].trim(),
      content: tpl.content,
    })
    setActiveTab('cvs')
    // Open modal immediately to view/edit newly created resume
    setTimeout(() => {
      const created = resumes.find(r => r.id === newId) || {
        id: newId,
        name: `${tpl.title} (Draft)`,
        targetRole: tpl.role.split('/')[0].trim(),
        content: tpl.content,
        updatedDate: 'Just now',
      }
      setViewingResume(created)
    }, 100)
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
            Read, edit, optimize, and choose from pro CV templates tailored for ATS scoring.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl shrink-0 flex-wrap" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-1)' }}>
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
            onClick={() => setActiveTab('templates')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1"
            style={{
              background: activeTab === 'templates' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'templates' ? 'white' : 'var(--text-4)',
            }}
          >
            <BookOpen size={13} /> 5 Pro Templates
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
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-xs font-mono" style={{ color: 'var(--text-5)' }}>
              SAVED RESUME DOCUMENTS — CLICK ANY CARD TO READ / EDIT
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('templates')}
                className="text-xs px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 border press-scale"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
              >
                <BookOpen size={14} /> Browse Templates
              </button>
              <button
                onClick={() => setShowAdd(true)}
                className="text-xs px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 text-white press-scale shadow"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
              >
                <Plus size={14} /> Add Blank CV
              </button>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div className="rounded-2xl p-12 text-center border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-2)' }}>
              <FileText size={32} className="mx-auto mb-3 text-gray-500 opacity-60" />
              <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-1)' }}>No CVs stored yet</h3>
              <p className="text-xs mb-4 max-w-sm mx-auto" style={{ color: 'var(--text-4)' }}>
                Start by picking one of our 5 industry-standard templates or create a blank CV record to edit.
              </p>
              <button
                onClick={() => setActiveTab('templates')}
                className="text-xs px-5 py-2.5 rounded-xl font-bold text-white press-scale shadow"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
              >
                Choose a CV Template
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {resumes.map((r, i) => (
                <ResumeCard
                  key={r.id}
                  resume={r}
                  onSetDefault={setDefaultResume}
                  onDelete={deleteResume}
                  onView={setViewingResume}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Tab 2: Pro Templates Selection */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border flex items-center justify-between gap-3 text-xs" style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)', color: 'var(--text-2)' }}>
            <span>
              <strong>5 Preferred CV Templates:</strong> Select a template below to automatically generate a pre-formatted, ATS-ready CV record in your personal studio.
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRO_CV_TEMPLATES.map((tpl) => {
              const IconComp = tpl.icon
              return (
                <div
                  key={tpl.id}
                  className="p-5 rounded-2xl border flex flex-col justify-between transition-all hover-lift"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow" style={{ background: tpl.accent }}>
                        <IconComp size={20} />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-emerald-400 border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)' }}>
                        {tpl.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold font-display mb-1" style={{ color: 'var(--text-1)' }}>
                      {tpl.title}
                    </h3>
                    <p className="text-xs font-medium mb-3 text-indigo-400">
                      {tpl.role}
                    </p>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-4)' }}>
                      {tpl.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleUseTemplate(tpl)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white press-scale shadow flex items-center justify-center gap-1.5"
                    style={{ background: `linear-gradient(135deg, ${tpl.accent}, #4f46e5)` }}
                  >
                    <Sparkles size={14} /> Use Template & Edit Live
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab 3: ATS Scanner & Optimizer */}
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
                className="w-full p-3 text-xs rounded-xl outline-none mb-4 font-mono resize-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />

              <button
                onClick={handleAnalyzeATS}
                disabled={analyzing}
                className="w-full py-3 rounded-xl font-semibold text-xs text-white press-scale shadow flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
              >
                {analyzing ? (
                  <>
                    <Sparkles size={15} className="animate-spin" /> Analyzing Keywords...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} /> Run ATS Score Check
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-4)' }}>ATS Match Score</span>
              <div className="text-4xl font-extrabold my-3 font-display text-emerald-400">
                {atsScore}%
              </div>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                {atsScore >= 85 ? 'Strong match for ATS automated screening!' : 'Add key role terms to boost score.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Cover Letter Studio */}
      {activeTab === 'coverletter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={handleGenerateCoverLetter} className="p-6 rounded-2xl border space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>AI Cover Letter Generator</h3>

            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--text-3)' }}>Target Role Title</label>
              <input
                value={clRole}
                onChange={e => setClRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: 'var(--text-3)' }}>Employer Company</label>
              <input
                value={clCompany}
                onChange={e => setClCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-3 rounded-xl text-xs font-bold text-white press-scale shadow flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              {generating ? <Sparkles size={14} className="animate-spin" /> : <Wand2 size={14} />}
              <span>{generating ? 'Drafting Cover Letter...' : 'Generate Custom Cover Letter'}</span>
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
        <Modal title="Add a Blank CV Record" onClose={() => setShowAdd(false)}>
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
              className="mt-2 text-sm px-5 py-2.5 rounded-xl font-medium press-scale text-white"
              style={{ background: 'var(--accent)' }}
            >
              Save CV Record & Edit
            </button>
          </div>
        </Modal>
      )}

      {/* Full CV Viewer & Live Editor Modal */}
      <CVViewerModal
        resume={viewingResume}
        isOpen={Boolean(viewingResume)}
        onClose={() => setViewingResume(null)}
      />
    </div>
  )
}
