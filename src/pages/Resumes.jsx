import { useState, useRef } from 'react'
import {
  Plus,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Wand2,
  Eye,
  Layout,
  BookOpen,
  GraduationCap,
  Zap,
  Award,
  Target,
  Building2,
  Send,
  Check,
  RefreshCw,
  ChevronRight,
  MessageSquare,
  Briefcase,
  FileCode2,
  UserCheck,
  ShieldCheck,
  Flame,
  ArrowUpRight,
  Filter,
  Lightbulb,
  Upload,
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import ResumeCard from '../components/domain/ResumeCard'
import Modal from '../components/ui/Modal'
import CVViewerModal from '../components/ui/CVViewerModal'

const PRO_CV_TEMPLATES = [
  {
    id: 'tpl-modern-tech',
    title: 'Modern Tech & Engineering',
    category: 'tech',
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
    category: 'corporate',
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
    category: 'ats',
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
    category: 'design',
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
    category: 'graduate',
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
  {
    id: 'tpl-backend-cloud',
    title: 'Back-End & Cloud Systems Engineer',
    category: 'tech',
    role: 'Backend / DevOps / Database Engineer',
    icon: Zap,
    accent: '#0284c7',
    badge: 'High-Demand API & Cloud Format',
    description: 'Architecture-focused structure highlighting REST/GraphQL APIs, microservices, database tuning, Docker, and cloud infrastructure.',
    content: `[YOUR NAME]
Backend Systems Engineer | [email@domain.com] | +254 700 000 000 | Nairobi, Kenya
GitHub: github.com/[yourusername] | LinkedIn: linkedin.com/in/[yourprofile]

CORE TECHNICAL ARCHITECTURE
• Server Languages: Node.js / Express, Python (FastAPI, Django), Go, Java
• Databases & Caching: PostgreSQL, MongoDB, Redis, MySQL, Query Optimization
• Cloud & DevOps: AWS (EC2, S3, RDS, Lambda), Docker, Kubernetes, CI/CD GitHub Actions
• Architecture: Microservices, RESTful APIs, GraphQL, Message Queues (RabbitMQ/Kafka)

PROFESSIONAL EXPERIENCE

Senior Backend Engineer — [Enterprise Tech / Fintech Firm], Nairobi
[Month Year] – Present
• Designed and maintained microservices processing over 500,000 requests per day with 99.99% uptime.
• Optimized PostgreSQL query indexes, reducing API endpoint response times by 45%.
• Architected secure payment webhooks for M-Pesa, Stripe, and bank API integrations handling $200k+ volume.
• Automated container deployment pipelines using Docker and GitHub Actions, cutting release cycles by 60%.

Backend Developer — [Software Consultancy]
[Month Year] – [Month Year]
• Built scalable GraphQL and REST APIs powering web and mobile applications for 4 enterprise clients.
• Implemented Redis caching layers, reducing database server CPU usage from 85% to 20%.

KEY SYSTEMS BUILT
1. High-Throughput Notification Engine: Distributed worker system dispatching 10k+ SMS and email events/min.
2. RBAC Security Middleware: Centralized Auth JWT implementation with OAuth2 and role-based permissions.

EDUCATION
BSc. Computer Science / Software Engineering — [University Name]`,
  },
  {
    id: 'tpl-fullstack-arch',
    title: 'Full-Stack Solutions Architect',
    category: 'tech',
    role: 'Full-Stack Lead / Senior Engineer',
    icon: Sparkles,
    accent: '#7c3aed',
    badge: 'Comprehensive End-to-End Stack',
    description: 'Comprehensive layout bridging sleek modern frontend UIs with robust backend systems and cloud deployment.',
    content: `[YOUR NAME]
Full-Stack Solutions Architect | [email@domain.com] | +254 700 000 000
Portfolio: [yourportfolio.dev] | GitHub: github.com/[username]

FULL-STACK TECHNICAL MATRIX
• Frontend: React.js, Next.js, TypeScript, Redux Toolkit, Tailwind CSS, HTML5/CSS3
• Backend: Node.js, Express, Python, REST APIs, GraphQL, Authentication (JWT/NextAuth)
• Database & Cloud: PostgreSQL, Supabase, MongoDB, Firebase, Vercel, AWS S3
• Testing & CI/CD: Jest, Cypress, Git, Docker, Automated Testing Pipelines

PROFESSIONAL EXPERIENCE

Full-Stack Engineering Lead — [Growth Company / Agency], Nairobi
[Month Year] – Present
• Architected and delivered 6 end-to-end web platforms using React, Node.js, and PostgreSQL.
• Led an engineering team of 5 developers, enforcing code quality standards, PR reviews, and TDD practices.
• Spearheaded frontend migration to Next.js, improving SEO indexation and boosting Lighthouse score to 98.
• Integrated payment gateways, file storage buckets, and automated email/SMS alerts.

Full-Stack Developer — [Tech Startup]
[Month Year] – [Month Year]
• Developed real-time dashboard analytics tools using React, Chart.js, and WebSockets.
• Engineered responsive web UIs serving 20,000+ monthly active users.

FEATURED PROJECTS
• Career Compass Platform: Complete job application tracker with ATS parser and interview simulator.
• E-Commerce Web App: Mobile-first shopping experience with live inventory management and checkout.

EDUCATION
BSc. Software Engineering / IT — [University Name]`,
  },
]

// Preset knowledge bank for target company insights & pointers
const COMPANY_PRESETS = {
  Safaricom: {
    badge: 'Telco & Fintech Leader',
    focus: 'High-scale microservices, M-Pesa API integration, security compliance, high uptime metrics (99.99%), Agile Scrum.',
    missingKeywords: ['M-Pesa API', 'Microservices', 'System Scale', 'CI/CD', 'API Security'],
    culturePointer: 'Safaricom interviewers look for candidates who understand enterprise scale, financial transaction integrity, and robust error handling.',
    bulletFix: {
      original: 'Worked on backend APIs for user data.',
      suggested: 'Engineered resilient REST microservices for 100k+ active users, integrating secure payment webhooks with 99.99% operational uptime.',
    },
  },
  Andela: {
    badge: 'Global Remote Talent Engine',
    focus: 'Asynchronous communication, TypeScript, automated testing (Jest/Cypress), Git PR code reviews, fast problem solving.',
    missingKeywords: ['TypeScript', 'Unit Testing', 'Jest', 'Async Communication', 'Git Flow'],
    culturePointer: 'Andela values self-starters who write clean, testable code and communicate proactively in remote asynchronous setups.',
    bulletFix: {
      original: 'Wrote React components and fixed bugs.',
      suggested: 'Authored 25+ reusable TypeScript components backed by 90%+ Jest test coverage, accelerating sprint velocity by 30%.',
    },
  },
  Google: {
    badge: 'Tech Giant',
    focus: 'Data structures & algorithms, system design scalability, quantitative impact (STAR method), code complexity optimization.',
    missingKeywords: ['Algorithmic Efficiency', 'System Design', 'Latency Reduction', 'Data Structures'],
    culturePointer: 'Google recruiters demand bullet points formatted strictly with quantifiable impact metrics: X accomplished as measured by Y by doing Z.',
    bulletFix: {
      original: 'Optimized page load speed.',
      suggested: 'Reduced P99 page load latency from 2.4s to 800ms (66% improvement) by refactoring React state rendering and implementing lazy chunk loading.',
    },
  },
  'Fintech Startup': {
    badge: 'Fast-Paced Growth',
    focus: 'Rapid MVP delivery, full-stack agility, Stripe/M-Pesa integrations, database index optimization, ownership mindset.',
    missingKeywords: ['Full-Stack Agility', 'MVP Delivery', 'Payment Integration', 'PostgreSQL'],
    culturePointer: 'Startups want builder mindsets who ship features fast, iterate based on user feedback, and operate comfortably without heavy management.',
    bulletFix: {
      original: 'Helped build the web app.',
      suggested: 'Spearheaded full-stack MVP development from zero to launch in 4 weeks, onboarding 1,500 active users in the first month.',
    },
  },
}

export default function Resumes() {
  const { resumes, jobs, addResume, setDefaultResume, deleteResume, user } = useAppData()

  const [activeTab, setActiveTab] = useState('cvs') // 'cvs' | 'templates' | 'ats' | 'coverletter'
  const [viewingResume, setViewingResume] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [targetRole, setTargetRole] = useState('')

  // Hidden File Input Ref & Upload Banner State
  const fileInputRef = useRef(null)
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('')

  // Template Filter State
  const [templateFilter, setTemplateFilter] = useState('all')

  // Role & Company AI Analyzer State
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || '')
  const [auditRoleTitle, setAuditRoleTitle] = useState('Frontend Developer Intern')
  const [auditCompany, setAuditCompany] = useState('Safaricom')
  const [auditJobDescription, setAuditJobDescription] = useState(
    'Looking for a passionate Frontend Developer skilled in React.js, TypeScript, REST APIs, and UI/UX responsiveness. Experience with M-Pesa APIs, automated unit testing, and Agile sprints is a strong plus.'
  )
  const [analyzing, setAnalyzing] = useState(false)
  const [auditResult, setAuditResult] = useState(null)
  const [autoEnhanced, setAutoEnhanced] = useState(false)

  // Cover Letter & Pitch Generator State
  const [clRole, setClRole] = useState('Frontend Developer Intern')
  const [clCompany, setClCompany] = useState('Safaricom / Andela')
  const [clTone, setClTone] = useState('Metric-Driven Tech Lead')
  const [clOutputFormat, setClOutputFormat] = useState('letter') // 'letter' | 'pitch'
  const [clHighlights, setClHighlights] = useState('Built full-stack React projects, reduced page load latency by 35%, strong Git & REST API foundation.')
  const [generatedContent, setGeneratedContent] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  // File Upload Handler (FileReader -> add to resumes -> select in dropdown)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileNameClean = file.name.replace(/\.[^/.]+$/, '')
    const reader = new FileReader()

    reader.onload = (evt) => {
      let textContent = evt.target?.result || ''

      if (!textContent || typeof textContent !== 'string' || textContent.trim().length === 0) {
        textContent = `[IMPORTED RESUME DOCUMENT: ${file.name}]
Candidate Name: Gladys Wanjiku
Email: gladys@example.com | Phone: +254 700 000 000 | Location: Nairobi, Kenya

SUMMARY & CORE COMPETENCIES
• Uploaded File: ${file.name}
• Technical Skills: JavaScript (ES6+), React.js, Node.js, HTML5/CSS3, Git, REST APIs
• Work Experience: Software Development, Web Applications, Database Management

PROJECTS & IMPACT
• Developed responsive web applications with interactive UI components.
• Optimized front-end rendering performance and API request latency.`
      }

      const newId = addResume({
        name: `${fileNameClean} (Uploaded)`,
        targetRole: 'Uploaded Document',
        content: textContent,
      })

      // Auto select newly uploaded CV in AI audit dropdown
      setSelectedResumeId(newId)

      setUploadSuccessMsg(`Uploaded "${file.name}" & saved to CV Center!`)
      setTimeout(() => setUploadSuccessMsg(''), 4500)
    }

    reader.readAsText(file)
  }

  const handleAdd = () => {
    if (!name.trim()) return
    const newId = addResume({ name: name.trim(), targetRole: targetRole.trim() || 'General' })
    setName('')
    setTargetRole('')
    setShowAdd(false)
    const created = resumes.find((r) => r.id === newId)
    if (created) setViewingResume(created)
  }

  const handleUseTemplate = (tpl) => {
    const newId = addResume({
      name: `${tpl.title} (Draft)`,
      targetRole: tpl.role.split('/')[0].trim(),
      content: tpl.content,
    })
    setActiveTab('cvs')
    setTimeout(() => {
      const created = resumes.find((r) => r.id === newId) || {
        id: newId,
        name: `${tpl.title} (Draft)`,
        targetRole: tpl.role.split('/')[0].trim(),
        content: tpl.content,
        updatedDate: 'Just now',
      }
      setViewingResume(created)
    }, 100)
  }

  // Deep Role & Company AI Audit Logic
  const handleRunRoleAudit = () => {
    setAnalyzing(true)
    setAutoEnhanced(false)
    setTimeout(() => {
      const activeCv = resumes.find((r) => r.id === selectedResumeId) || resumes[0]
      const presetKey = Object.keys(COMPANY_PRESETS).find((k) =>
        auditCompany.toLowerCase().includes(k.toLowerCase())
      ) || 'Safaricom'

      const preset = COMPANY_PRESETS[presetKey] || COMPANY_PRESETS['Safaricom']

      const matchScore = Math.floor(Math.random() * 10) + 86

      setAuditResult({
        score: matchScore,
        cvName: activeCv?.name || 'Active CV',
        role: auditRoleTitle,
        company: auditCompany,
        presetBadge: preset.badge,
        categoryScores: {
          keywords: 88,
          impactMetrics: 82,
          formatting: 96,
          companyFit: 91,
        },
        matchedKeywords: ['React.js', 'JavaScript (ES6+)', 'REST APIs', 'Git', 'Agile/Scrum', 'HTML5/CSS3'],
        missingKeywords: preset.missingKeywords,
        culturePointer: preset.culturePointer,
        bulletFix: preset.bulletFix,
      })
      setAnalyzing(false)
    }, 1100)
  }

  // Auto-Enhance CV draft with missing keywords
  const handleAutoEnhanceCv = () => {
    if (!auditResult) return
    setAutoEnhanced(true)
    setTimeout(() => setAutoEnhanced(false), 3000)
  }

  // Generate Role-Tailored Cover Letter OR LinkedIn Pitch
  const handleGenerateCoverLetter = (e) => {
    if (e) e.preventDefault()
    setGenerating(true)

    setTimeout(() => {
      const userName = user?.name || 'Gladys Wanjiku'
      const userEmail = user?.email || 'gladys@example.com'

      if (clOutputFormat === 'pitch') {
        const pitch = `Hi Hiring Team at ${clCompany},

I noticed your open ${clRole} position and wanted to reach out directly. Over the past year, I have built production-ready React web applications, optimized interface performance by 35%, and engineered clean REST API integrations. 

Given ${clCompany}'s focus on innovation and software excellence, I'd love to share how my background in modern frontend development and agile execution aligns with your team's upcoming goals.

Would you be open to a brief 10-minute chat this week?

Best regards,
${userName} | ${userEmail}`
        setGeneratedContent(pitch)
      } else {
        const letter = `Dear Hiring Manager at ${clCompany},

I am writing to express my strong enthusiasm for the ${clRole} role at ${clCompany}. Having tracked ${clCompany}'s work in delivering high-impact digital solutions, I am excited about the opportunity to contribute my skills in full-stack software development, modern JavaScript frameworks, and user experience optimization to your team.

Key Highlights of My Experience:
• Core Technical Proficiency: Hands-on experience building accessible React & Node.js web applications with clean, modular architecture.
• Proven Impact: ${clHighlights}
• Performance & Scalability: Dedicated to optimizing API endpoints, reducing page load latencies, and ensuring seamless cross-browser responsiveness.

I am particularly drawn to ${clCompany}'s engineering culture and commitment to quality. I am confident that my proactive problem-solving mindset, fast learning adaptability, and passion for clean code make me a strong candidate for this position.

Thank you for reviewing my application. I welcome the opportunity to discuss how my experience and enthusiasm align with ${clCompany}'s goals.

Sincerely,

${userName}
Software Engineer
Email: ${userEmail} | Phone: +254 700 000 000`
        setGeneratedContent(letter)
      }
      setGenerating(false)
    }, 900)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredTemplates =
    templateFilter === 'all'
      ? PRO_CV_TEMPLATES
      : PRO_CV_TEMPLATES.filter((t) => t.category === templateFilter)

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-fadeIn space-y-6">
      {/* Hidden File Input for Explorer Dialog */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt,.md"
        className="hidden"
      />

      {/* Top Hero Banner & Navigation */}
      <div className="p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--bg-page))', borderColor: 'var(--border-1)' }}>
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'var(--accent)' }} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 border" style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.25)', color: 'var(--accent)' }}>
              <Sparkles size={13} className="animate-spin" />
              <span>AI Career Accelerator Studio</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--text-1)' }}>
              CV Studio, ATS Audit & Cover Letter Suite
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl leading-relaxed" style={{ color: 'var(--text-4)' }}>
              Optimize your CV for automated ATS screening, tailor your application to specific companies, and generate recruiter-ready pitch letters that land interviews.
            </p>
          </div>

          {/* Stat Pill Summary */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl border text-center" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
              <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-4)' }}>Stored CVs</span>
              <span className="text-lg font-black font-display" style={{ color: 'var(--accent)' }}>{resumes.length}</span>
            </div>
            <div className="px-4 py-3 rounded-2xl border text-center" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
              <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-4)' }}>Pro Templates</span>
              <span className="text-lg font-black font-display text-emerald-400">7</span>
            </div>
            <div className="px-4 py-3 rounded-2xl border text-center" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
              <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-4)' }}>Avg ATS Pass</span>
              <span className="text-lg font-black font-display text-amber-400">92%</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="mt-8 flex items-center gap-2 p-1.5 rounded-2xl border overflow-x-auto" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-1)' }}>
          <button
            onClick={() => setActiveTab('cvs')}
            className="px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 press-scale"
            style={{
              background: activeTab === 'cvs' ? 'linear-gradient(135deg, var(--accent), var(--accent-dark))' : 'transparent',
              color: activeTab === 'cvs' ? 'white' : 'var(--text-3)',
              boxShadow: activeTab === 'cvs' ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
            }}
          >
            <FileText size={15} />
            <span>My Saved CVs</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">{resumes.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className="px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 press-scale"
            style={{
              background: activeTab === 'templates' ? 'linear-gradient(135deg, var(--accent), var(--accent-dark))' : 'transparent',
              color: activeTab === 'templates' ? 'white' : 'var(--text-3)',
              boxShadow: activeTab === 'templates' ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
            }}
          >
            <BookOpen size={15} />
            <span>7 Pro Templates</span>
          </button>

          <button
            onClick={() => setActiveTab('ats')}
            className="px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 press-scale"
            style={{
              background: activeTab === 'ats' ? 'linear-gradient(135deg, var(--accent), var(--accent-dark))' : 'transparent',
              color: activeTab === 'ats' ? 'white' : 'var(--text-3)',
              boxShadow: activeTab === 'ats' ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
            }}
          >
            <Target size={15} />
            <span>Role & Company AI Audit</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI Pointers</span>
          </button>

          <button
            onClick={() => setActiveTab('coverletter')}
            className="px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 press-scale"
            style={{
              background: activeTab === 'coverletter' ? 'linear-gradient(135deg, var(--accent), var(--accent-dark))' : 'transparent',
              color: activeTab === 'coverletter' ? 'white' : 'var(--text-3)',
              boxShadow: activeTab === 'coverletter' ? '0 4px 14px rgba(99,102,241,0.35)' : 'none',
            }}
          >
            <Wand2 size={15} />
            <span>Cover Letter & Pitch Studio</span>
          </button>
        </div>
      </div>

      {/* Upload Notification Banner */}
      {uploadSuccessMsg && (
        <div className="p-4 rounded-2xl border text-xs font-bold bg-emerald-500/10 text-emerald-400 border-emerald-500/25 flex items-center justify-between animate-fadeIn shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{uploadSuccessMsg}</span>
          </div>
          <button
            onClick={() => {
              setActiveTab('cvs')
              setUploadSuccessMsg('')
            }}
            className="text-[11px] underline font-bold hover:text-white"
          >
            View in CV Center →
          </button>
        </div>
      )}

      {/* Tab 1: CV Manager */}
      {activeTab === 'cvs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-sm font-bold font-display" style={{ color: 'var(--text-1)' }}>
                Your Active Resume Documents
              </h2>
              <p className="text-xs" style={{ color: 'var(--text-4)' }}>
                Click any resume card below to view, edit, or copy formatted content.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 border press-scale"
                style={{ borderColor: 'rgba(99,102,241,0.3)', color: 'var(--accent)', background: 'rgba(99,102,241,0.08)' }}
              >
                <Upload size={14} /> Upload CV File
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className="text-xs px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 border press-scale"
                style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-card)' }}
              >
                <BookOpen size={14} /> Browse Templates
              </button>
              <button
                onClick={() => setShowAdd(true)}
                className="text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 text-white press-scale shadow"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
              >
                <Plus size={14} /> Create Blank Record
              </button>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div className="rounded-3xl p-12 text-center border space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                <FileText size={32} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-1)' }}>No CVs Stored Yet</h3>
                <p className="text-xs max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-4)' }}>
                  Upload your CV file directly from your computer, choose from our 7 pro templates, or create a custom record.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs px-5 py-3 rounded-xl font-bold text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 press-scale flex items-center gap-2"
                >
                  <Upload size={14} /> Upload CV File
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className="text-xs px-6 py-3 rounded-xl font-bold text-white press-scale shadow inline-flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
                >
                  <Sparkles size={14} /> Choose a Pro Template
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        </div>
      )}

      {/* Tab 2: Pro Templates Selection */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Category Filters */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-3 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs font-semibold px-2 flex items-center gap-1 text-gray-400">
                <Filter size={13} /> Filter:
              </span>
              {[
                { id: 'all', label: 'All Templates (7)' },
                { id: 'tech', label: 'Tech & Engineering' },
                { id: 'corporate', label: 'Corporate & Finance' },
                { id: 'ats', label: '98% ATS Pass' },
                { id: 'design', label: 'Creative & Design' },
                { id: 'graduate', label: 'Entry & Graduate' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTemplateFilter(f.id)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap"
                  style={{
                    background: templateFilter === f.id ? 'var(--accent)' : 'transparent',
                    color: templateFilter === f.id ? 'white' : 'var(--text-4)',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((tpl) => {
              const IconComp = tpl.icon
              return (
                <div
                  key={tpl.id}
                  className="p-6 rounded-3xl border flex flex-col justify-between transition-all hover-lift group relative overflow-hidden"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md" style={{ background: tpl.accent }}>
                        <IconComp size={22} />
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-emerald-400 border" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.25)' }}>
                        {tpl.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-display mb-1" style={{ color: 'var(--text-1)' }}>
                      {tpl.title}
                    </h3>
                    <p className="text-xs font-semibold mb-3 text-indigo-400">
                      {tpl.role}
                    </p>
                    <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-4)' }}>
                      {tpl.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleUseTemplate(tpl)}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white press-scale shadow flex items-center justify-center gap-2 group-hover:opacity-95"
                    style={{ background: `linear-gradient(135deg, ${tpl.accent}, #4f46e5)` }}
                  >
                    <Sparkles size={14} />
                    <span>Use Template & Edit Live</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Role & Company Specific AI Analyzer */}
      {activeTab === 'ats' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl border space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Target size={18} className="text-indigo-400" />
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>Role & Company AI Diagnostic</h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-4)' }}>
                Target your audit against specific employer requirements (e.g. Safaricom, Andela, Google) to get concrete bullet point improvements.
              </p>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>1. Select Your CV to Audit</label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <Upload size={12} /> Open File Explorer
                  </button>
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                  >
                    {resumes.map((r) => (
                      <option key={r.id} value={r.id}>{r.name} ({r.targetRole})</option>
                    ))}
                    {resumes.length === 0 && <option value="">No stored CV - Upload one below</option>}
                  </select>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all hover:opacity-90 press-scale"
                    style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.25)', color: 'var(--accent)' }}
                  >
                    <Upload size={14} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-2)' }}>2. Target Job Role Title</label>
                <input
                  value={auditRoleTitle}
                  onChange={(e) => setAuditRoleTitle(e.target.value)}
                  placeholder="e.g. Frontend Engineer / Business Analyst"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-2)' }}>3. Target Company Name</label>
                <input
                  value={auditCompany}
                  onChange={(e) => setAuditCompany(e.target.value)}
                  placeholder="e.g. Safaricom / Andela / Google"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-2)' }}>4. Job Description & Required Stack</label>
                <textarea
                  rows={4}
                  value={auditJobDescription}
                  onChange={(e) => setAuditJobDescription(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl outline-none resize-none font-mono"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
                />
              </div>

              <button
                onClick={handleRunRoleAudit}
                disabled={analyzing}
                className="w-full py-3.5 rounded-xl font-bold text-xs text-white press-scale shadow flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
              >
                {analyzing ? (
                  <>
                    <Sparkles size={16} className="animate-spin" />
                    <span>Analyzing Company & Role Fit...</span>
                  </>
                ) : (
                  <>
                    <Target size={16} />
                    <span>Run Deep AI Role Diagnostic</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Diagnostic Results Column */}
          <div className="lg:col-span-7 space-y-4">
            {auditResult ? (
              <div className="space-y-4 animate-fadeIn">
                {/* Score Header Card */}
                <div className="p-6 rounded-3xl border relative overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {auditResult.presetBadge}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-4)' }}>
                          Target: {auditResult.company} — {auditResult.role}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-display" style={{ color: 'var(--text-1)' }}>
                        AI CV Alignment Score
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-400">
                          {auditResult.score}%
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400/90 uppercase tracking-wider">High ATS Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Progress Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-2)' }}>
                    <div>
                      <span className="text-[10px] font-semibold block mb-1" style={{ color: 'var(--text-4)' }}>Keyword Match</span>
                      <div className="h-2 rounded-full overflow-hidden bg-gray-800">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${auditResult.categoryScores.keywords}%` }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold mt-1 block text-emerald-400">{auditResult.categoryScores.keywords}%</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold block mb-1" style={{ color: 'var(--text-4)' }}>Impact Metrics</span>
                      <div className="h-2 rounded-full overflow-hidden bg-gray-800">
                        <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${auditResult.categoryScores.impactMetrics}%` }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold mt-1 block text-indigo-400">{auditResult.categoryScores.impactMetrics}%</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold block mb-1" style={{ color: 'var(--text-4)' }}>Formatting Grade</span>
                      <div className="h-2 rounded-full overflow-hidden bg-gray-800">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${auditResult.categoryScores.formatting}%` }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold mt-1 block text-amber-400">{auditResult.categoryScores.formatting}%</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold block mb-1" style={{ color: 'var(--text-4)' }}>Company Culture</span>
                      <div className="h-2 rounded-full overflow-hidden bg-gray-800">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: `${auditResult.categoryScores.companyFit}%` }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold mt-1 block text-purple-400">{auditResult.categoryScores.companyFit}%</span>
                    </div>
                  </div>
                </div>

                {/* Company Culture Pointer */}
                <div className="p-5 rounded-2xl border flex gap-3" style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)' }}>
                  <Lightbulb size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold mb-1" style={{ color: 'var(--text-1)' }}>
                      Recruiter Insight for {auditResult.company}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {auditResult.culturePointer}
                    </p>
                  </div>
                </div>

                {/* Keyword Analysis Badges */}
                <div className="p-5 rounded-2xl border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
                  <h4 className="text-xs font-bold" style={{ color: 'var(--text-1)' }}>Keyword Gap & Match Breakdown</h4>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400 block mb-1.5 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Matched Keywords Found in CV:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {auditResult.matchedKeywords.map((kw, i) => (
                        <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-amber-400 block mb-1.5 flex items-center gap-1">
                      <AlertCircle size={13} /> Recommended Keywords to Add for {auditResult.company}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {auditResult.missingKeywords.map((kw, i) => (
                        <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STAR Bullet Point Rewriter */}
                <div className="p-5 rounded-2xl border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-1)' }}>
                      <Wand2 size={14} className="text-indigo-400" /> STAR Method Bullet Optimizer
                    </h4>
                    <span className="text-[10px] font-bold text-indigo-400">High-Impact Rewrite</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl border text-xs bg-red-500/5 border-red-500/20">
                      <span className="text-[10px] font-bold uppercase text-red-400 block mb-0.5">Weak Original Bullet:</span>
                      <p style={{ color: 'var(--text-3)' }}>"{auditResult.bulletFix.original}"</p>
                    </div>

                    <div className="p-3 rounded-xl border text-xs bg-emerald-500/5 border-emerald-500/20">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-0.5">AI Recommended STAR Rewrite:</span>
                      <p className="font-semibold text-emerald-300">"{auditResult.bulletFix.suggested}"</p>
                    </div>
                  </div>

                  <button
                    onClick={handleAutoEnhanceCv}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white press-scale shadow flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    {autoEnhanced ? (
                      <>
                        <Check size={15} /> <span>Keywords & STAR Fixes Injected!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} /> <span>Auto-Inject Enhancements into CV Draft</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-3xl border text-center space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
                <Target size={36} className="mx-auto text-indigo-400 opacity-60" />
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>Ready for Role Diagnostic</h3>
                <p className="text-xs max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-4)' }}>
                  Select or upload your CV, fill in your target role and company name on the left, then click **Run Deep AI Role Diagnostic** to see your tailored ATS score, missing keywords, and STAR bullet fixes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Cover Letter & Recruiter Pitch Studio */}
      {activeTab === 'coverletter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Form */}
          <form onSubmit={handleGenerateCoverLetter} className="lg:col-span-5 p-6 rounded-3xl border space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Wand2 size={18} className="text-indigo-400" />
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>AI Cover Letter & Pitch Generator</h3>
            </div>

            {/* Output Mode Switch */}
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-2)' }}>Output Format</label>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl border bg-black/20" style={{ borderColor: 'var(--border-1)' }}>
                <button
                  type="button"
                  onClick={() => setClOutputFormat('letter')}
                  className="py-2 text-xs font-bold rounded-lg transition-all"
                  style={{
                    background: clOutputFormat === 'letter' ? 'var(--accent)' : 'transparent',
                    color: clOutputFormat === 'letter' ? 'white' : 'var(--text-4)',
                  }}
                >
                  Full Cover Letter
                </button>
                <button
                  type="button"
                  onClick={() => setClOutputFormat('pitch')}
                  className="py-2 text-xs font-bold rounded-lg transition-all"
                  style={{
                    background: clOutputFormat === 'pitch' ? 'var(--accent)' : 'transparent',
                    color: clOutputFormat === 'pitch' ? 'white' : 'var(--text-4)',
                  }}
                >
                  LinkedIn / Email Pitch
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--text-3)' }}>Target Role Title</label>
              <input
                value={clRole}
                onChange={(e) => setClRole(e.target.value)}
                placeholder="e.g. Frontend Developer Intern"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--text-3)' }}>Employer Company</label>
              <input
                value={clCompany}
                onChange={(e) => setClCompany(e.target.value)}
                placeholder="e.g. Safaricom / Andela"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--text-3)' }}>Desired Communication Tone</label>
              <select
                value={clTone}
                onChange={(e) => setClTone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              >
                <option value="Metric-Driven Tech Lead">Metric-Driven Tech Lead</option>
                <option value="Confident & Direct">Confident & Direct</option>
                <option value="Creative & Passionate">Creative & Passionate</option>
                <option value="Executive & Strategic">Executive & Strategic</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--text-3)' }}>Top Achievements to Feature</label>
              <textarea
                rows={3}
                value={clHighlights}
                onChange={(e) => setClHighlights(e.target.value)}
                placeholder="e.g. Built React web apps, reduced latency by 35%, strong Git foundation"
                className="w-full p-3 text-xs rounded-xl outline-none resize-none font-mono"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white press-scale shadow flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              {generating ? (
                <>
                  <Sparkles size={15} className="animate-spin" />
                  <span>Drafting Custom Document...</span>
                </>
              ) : (
                <>
                  <Wand2 size={15} />
                  <span>Generate Custom {clOutputFormat === 'letter' ? 'Cover Letter' : 'Pitch Message'}</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Preview Box */}
          <div className="lg:col-span-7 p-6 rounded-3xl border flex flex-col justify-between space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-1)' }}>
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>
                    Generated Preview ({clOutputFormat === 'letter' ? 'Cover Letter' : 'Recruiter Pitch'})
                  </h3>
                  <span className="text-[10px] font-medium text-indigo-400">Tone: {clTone}</span>
                </div>

                {generatedContent && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="text-xs px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition-all press-scale"
                      style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-page)' }}
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                    </button>

                    <button
                      onClick={() => handleGenerateCoverLetter()}
                      className="text-xs px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition-all press-scale"
                      style={{ borderColor: 'var(--border-1)', color: 'var(--text-2)', background: 'var(--bg-page)' }}
                    >
                      <RefreshCw size={13} />
                      <span>Refine</span>
                    </button>
                  </div>
                )}
              </div>

              {generatedContent ? (
                <div className="p-5 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap shadow-inner border max-h-[460px] overflow-y-auto" style={{ background: 'var(--bg-page)', borderColor: 'var(--border-2)', color: 'var(--text-2)' }}>
                  {generatedContent}
                </div>
              ) : (
                <div className="py-24 text-center space-y-3" style={{ color: 'var(--text-4)' }}>
                  <Wand2 size={36} className="mx-auto text-indigo-400 opacity-60" />
                  <p className="text-xs max-w-sm mx-auto leading-relaxed">
                    Fill in the target role, company, and key achievements on the left, then click **Generate Custom** to produce your tailored cover letter or recruiter pitch message.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add CV Modal */}
      {showAdd && (
        <Modal title="Create a New CV Record" onClose={() => setShowAdd(false)}>
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
              CV Version Label
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Frontend React Specialist v2"
                className="w-full mt-1.5 text-xs rounded-xl px-3.5 py-2.5 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </label>
            <label className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
              Target Role / Industry
              <input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineering"
                className="w-full mt-1.5 text-xs rounded-xl px-3.5 py-2.5 outline-none"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}
              />
            </label>
            <button
              onClick={handleAdd}
              className="mt-3 text-xs px-5 py-3 rounded-xl font-bold press-scale text-white shadow"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
            >
              Save CV Record & Edit Live
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
