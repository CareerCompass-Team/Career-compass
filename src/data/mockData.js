export const profile = {
  name: 'Gladys Wanjiku',
  email: 'gladys@example.com',
  location: 'Nairobi, Kenya',
  avatar: 'GW',
  targetRoles: ['Frontend Developer', 'Software Engineer', 'AI Intern'],
  skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Python', 'Git', 'TypeScript'],
  experienceLevel: 'Student',
  jobTypes: ['Internship', 'Entry level'],
  preferredLocations: ['Kenya', 'Remote'],
  careerGoal: 'Frontend Developer',
  bio: 'Computer Science student passionate about building accessible, performant web applications.',
}

export const jobs = [
  {
    id: 'j1',
    company: 'Andela',
    title: 'Frontend Developer Intern',
    location: 'Nairobi / Remote',
    type: 'Internship',
    description: 'Join our engineering team to build beautiful, performant web interfaces using React. You will collaborate with senior engineers and product designers to ship real features used by thousands of developers across Africa.',
    responsibilities: [
      'Build reusable React components and maintain the design system',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Write clean, well-tested JavaScript/TypeScript code',
      'Participate in code reviews and engineering discussions',
    ],
    requirements: ['React', 'JavaScript', 'Git', 'CSS'],
    preferred: ['TypeScript', 'Testing', 'Next.js'],
    skills: ['React', 'JavaScript', 'Git', 'CSS', 'TypeScript'],
    salary: 'KES 40,000 – 60,000/mo',
    deadline: 'Aug 25, 2024',
    postedDate: 'Aug 3, 2024',
    matchScore: 92,
    saved: false,
  },
  {
    id: 'j2',
    company: 'Safaricom',
    title: 'Software Engineering Intern',
    location: 'Nairobi',
    type: 'Internship',
    description: 'Work alongside our M-Pesa engineering team to develop and maintain scalable payment infrastructure. You will gain hands-on experience with large-scale distributed systems.',
    responsibilities: [
      'Develop and maintain backend services using Java and Node.js',
      'Write unit and integration tests',
      'Debug and resolve production issues',
      'Document APIs and system design decisions',
    ],
    requirements: ['JavaScript', 'Node.js', 'SQL', 'Git'],
    preferred: ['Java', 'Docker', 'Redis'],
    skills: ['JavaScript', 'Node.js', 'SQL', 'Git'],
    salary: 'KES 35,000 – 50,000/mo',
    deadline: 'Aug 30, 2024',
    postedDate: 'Aug 1, 2024',
    matchScore: 85,
    saved: true,
  },
  {
    id: 'j3',
    company: 'Twiga Foods',
    title: 'React Developer Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Help us build the next generation of our farmer-to-market digital platform using React and modern web technologies.',
    responsibilities: [
      'Implement new features on the React web application',
      'Optimize performance and loading times',
      'Write Storybook stories for UI components',
      'Contribute to product planning and design reviews',
    ],
    requirements: ['React', 'JavaScript', 'CSS'],
    preferred: ['Redux', 'Storybook', 'Figma'],
    skills: ['React', 'JavaScript', 'CSS'],
    salary: 'KES 30,000 – 45,000/mo',
    deadline: 'Sep 5, 2024',
    postedDate: 'Aug 5, 2024',
    matchScore: 89,
    saved: false,
  },
  {
    id: 'j4',
    company: 'Microsoft',
    title: 'AI Research Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Join the Microsoft Research AI team to work on cutting-edge machine learning projects. You will apply ML techniques to real problems and publish your work.',
    responsibilities: [
      'Run experiments on large language models',
      'Implement and evaluate new ML algorithms',
      'Analyze results and write research reports',
      'Collaborate with researchers globally',
    ],
    requirements: ['Python', 'Machine Learning', 'Statistics'],
    preferred: ['PyTorch', 'TensorFlow', 'Research experience'],
    skills: ['Python', 'Machine Learning', 'Statistics'],
    salary: '$30/hour',
    deadline: 'Sep 15, 2024',
    postedDate: 'Aug 6, 2024',
    matchScore: 78,
    saved: false,
  },
  {
    id: 'j5',
    company: 'Flutterwave',
    title: 'Frontend Engineer Intern',
    location: 'Lagos / Remote',
    type: 'Internship',
    description: 'Build the next generation of fintech interfaces for Africa. You will work on high-impact products used across 34 African countries.',
    responsibilities: [
      'Build responsive UIs using React and TypeScript',
      'Integrate payment APIs and SDKs',
      'Write comprehensive test suites',
      'Collaborate with product and design teams',
    ],
    requirements: ['React', 'TypeScript', 'JavaScript', 'CSS'],
    preferred: ['Testing', 'GraphQL', 'Figma'],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
    salary: '$25/hour',
    deadline: 'Sep 10, 2024',
    postedDate: 'Aug 4, 2024',
    matchScore: 88,
    saved: false,
  },
  {
    id: 'j6',
    company: 'BRCK',
    title: 'Junior Full Stack Developer',
    location: 'Nairobi',
    type: 'Full-time',
    description: 'Join our team building internet connectivity solutions for Africa. Work across our web platform, APIs, and IoT device management systems.',
    responsibilities: [
      'Build and maintain web applications using React and Node.js',
      'Design and implement REST APIs',
      'Manage PostgreSQL databases',
      'Deploy services on AWS',
    ],
    requirements: ['React', 'Node.js', 'SQL', 'JavaScript'],
    preferred: ['AWS', 'Docker', 'TypeScript'],
    skills: ['React', 'Node.js', 'SQL', 'JavaScript'],
    salary: 'KES 80,000 – 120,000/mo',
    deadline: 'Sep 20, 2024',
    postedDate: 'Aug 7, 2024',
    matchScore: 82,
    saved: false,
  },
]

export const applications = [
  {
    id: 'a1',
    jobId: 'j1',
    company: 'Andela',
    role: 'Frontend Developer Intern',
    status: 'Interview',
    appliedDate: 'Aug 3, 2024',
    deadline: 'Aug 25, 2024',
    location: 'Remote',
    source: 'CareerCompass',
    resumeId: 'r1',
    resumeName: 'Frontend_CV_v4.pdf',
    coverLetter: 'CoverLetter_Andela.pdf',
    notes: 'Need to revise React hooks and state management patterns before the interview.',
    nextStep: 'Technical Interview — Aug 12',
    timeline: [
      { date: 'Aug 3', event: 'Application submitted' },
      { date: 'Aug 5', event: 'Recruiter contacted — Naomi from Andela' },
      { date: 'Aug 7', event: 'Technical interview scheduled for Aug 12' },
    ],
  },
  {
    id: 'a2',
    jobId: 'j2',
    company: 'Safaricom',
    role: 'Software Engineering Intern',
    status: 'Applied',
    appliedDate: 'Aug 5, 2024',
    deadline: 'Aug 30, 2024',
    location: 'Nairobi',
    source: 'LinkedIn',
    resumeId: 'r1',
    resumeName: 'General_CV.pdf',
    coverLetter: null,
    notes: 'Strong brand, great learning opportunity. M-Pesa team is legendary.',
    nextStep: 'Awaiting response',
    timeline: [
      { date: 'Aug 5', event: 'Application submitted via LinkedIn' },
    ],
  },
  {
    id: 'a3',
    jobId: 'j3',
    company: 'Twiga Foods',
    role: 'React Developer Intern',
    status: 'Interview',
    appliedDate: 'Jul 28, 2024',
    deadline: 'Sep 5, 2024',
    location: 'Remote',
    source: 'CareerCompass',
    resumeId: 'r2',
    resumeName: 'Frontend_CV_v3.pdf',
    coverLetter: 'CoverLetter_Twiga.pdf',
    notes: 'First round was a culture fit. Second round is a coding challenge.',
    nextStep: 'Coding challenge — Aug 14',
    timeline: [
      { date: 'Jul 28', event: 'Application submitted' },
      { date: 'Aug 1', event: 'Phone screen with HR — 20 min' },
      { date: 'Aug 4', event: 'Coding challenge sent' },
    ],
  },
  {
    id: 'a4',
    jobId: 'j5',
    company: 'Flutterwave',
    role: 'Frontend Engineer Intern',
    status: 'Offer',
    appliedDate: 'Jul 20, 2024',
    deadline: 'Sep 10, 2024',
    location: 'Remote',
    source: 'CareerCompass',
    resumeId: 'r2',
    resumeName: 'Frontend_CV_v4.pdf',
    coverLetter: 'CoverLetter_Flutterwave.pdf',
    notes: 'Incredible team. Offer deadline is Aug 20. Need to decide.',
    nextStep: 'Respond to offer by Aug 20',
    timeline: [
      { date: 'Jul 20', event: 'Application submitted' },
      { date: 'Jul 25', event: 'Technical screen — 45 min' },
      { date: 'Aug 1', event: 'Final round interview' },
      { date: 'Aug 8', event: 'Offer received — $25/hour' },
    ],
  },
  {
    id: 'a5',
    jobId: 'j4',
    company: 'Microsoft',
    role: 'AI Research Intern',
    status: 'Applied',
    appliedDate: 'Aug 7, 2024',
    deadline: 'Sep 15, 2024',
    location: 'Remote',
    source: 'Company website',
    resumeId: 'r1',
    resumeName: 'General_CV.pdf',
    coverLetter: null,
    notes: 'Long shot but worth trying. Strong Python background.',
    nextStep: 'Awaiting response',
    timeline: [
      { date: 'Aug 7', event: 'Application submitted via company portal' },
    ],
  },
  {
    id: 'a6',
    jobId: 'j6',
    company: 'BRCK',
    role: 'Junior Full Stack Developer',
    status: 'Saved',
    appliedDate: null,
    deadline: 'Sep 20, 2024',
    location: 'Nairobi',
    source: 'CareerCompass',
    resumeId: null,
    resumeName: null,
    coverLetter: null,
    notes: 'Interesting role. Need to brush up on Node.js before applying.',
    nextStep: 'Prepare and apply',
    timeline: [],
  },
]

export const interviews = [
  {
    id: 'i1',
    applicationId: 'a1',
    company: 'Andela',
    role: 'Frontend Developer Intern',
    date: 'Aug 12, 2024',
    time: '10:00 AM',
    round: 'Technical',
    type: 'Video',
    status: 'Upcoming',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    interviewers: ['Sarah Chen (Senior Engineer)', 'David Kamau (Tech Lead)'],
    prepNotes: [
      { id: 'p1', text: 'React hooks — useEffect, useCallback, useMemo', checked: false },
      { id: 'p2', text: 'REST API integration patterns', checked: true },
      { id: 'p3', text: 'JavaScript promises and async/await', checked: false },
      { id: 'p4', text: 'CSS Grid and Flexbox', checked: true },
      { id: 'p5', text: 'Build a small component from scratch', checked: false },
    ],
    questions: [],
    notes: '',
    selfAssessment: { technical: 0, communication: 0, confidence: 0 },
    result: 'Waiting',
  },
  {
    id: 'i2',
    applicationId: 'a3',
    company: 'Twiga Foods',
    role: 'React Developer Intern',
    date: 'Aug 14, 2024',
    time: '2:00 PM',
    round: 'Coding Challenge',
    type: 'Take-home',
    status: 'Upcoming',
    meetingLink: null,
    interviewers: ['James Omondi (CTO)'],
    prepNotes: [
      { id: 'p6', text: 'Review array methods — map, filter, reduce', checked: true },
      { id: 'p7', text: 'State management with useState and useReducer', checked: false },
    ],
    questions: [],
    notes: '',
    selfAssessment: { technical: 0, communication: 0, confidence: 0 },
    result: 'Waiting',
  },
  {
    id: 'i3',
    applicationId: 'a4',
    company: 'Flutterwave',
    role: 'Frontend Engineer Intern',
    date: 'Aug 1, 2024',
    time: '3:00 PM',
    round: 'Final',
    type: 'Video',
    status: 'Completed',
    meetingLink: null,
    interviewers: ['Aisha Bello (Engineering Manager)', 'Emeka Obi (Senior Engineer)'],
    prepNotes: [],
    questions: [
      'Explain how React reconciliation works.',
      'Build a debounced search input component.',
      'How would you optimize a slow React application?',
      'Tell us about a project you are most proud of.',
    ],
    notes: 'Went really well. The debounce component question was tricky but I explained my thought process clearly. Aisha was very warm and encouraging.',
    selfAssessment: { technical: 4, communication: 4, confidence: 4 },
    result: 'Offer',
  },
  {
    id: 'i4',
    applicationId: 'a2',
    company: 'Safaricom',
    role: 'Software Engineering Intern',
    date: 'Jul 15, 2024',
    time: '11:00 AM',
    round: 'Recruiter Screen',
    type: 'Phone',
    status: 'Completed',
    meetingLink: null,
    interviewers: ['Grace Mwangi (HR)'],
    prepNotes: [],
    questions: [
      'Walk me through your background.',
      'Why Safaricom?',
      'What do you know about M-Pesa?',
    ],
    notes: 'Straightforward screen. Grace was friendly. They said they would be in touch within 2 weeks.',
    selfAssessment: { technical: 3, communication: 4, confidence: 3 },
    result: 'Waiting',
  },
]

export const resumes = [
  {
    id: 'r1',
    name: 'General CV',
    isDefault: true,
    updatedDate: 'Aug 5, 2024',
    createdDate: 'Jun 1, 2024',
    applications: 12,
    targetRole: 'Software Engineering',
    size: '284 KB',
    format: 'PDF',
    content: `GLADYS WANJIKU
gladys.wanjiku@email.com | +254 712 345 678 | Nairobi, Kenya
linkedin.com/in/gladyswanjiku | github.com/gladyswanjiku

PROFESSIONAL SUMMARY
Motivated Software Engineer with 2+ years of experience building responsive web applications and RESTful APIs. Proficient in React, Node.js, and Python. Passionate about clean code, user-centric design, and delivering measurable impact.

TECHNICAL SKILLS
Languages: JavaScript (ES2022), Python, TypeScript, SQL
Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS
Backend: Node.js, Express.js, FastAPI, REST APIs
Database: PostgreSQL, MongoDB, Firebase
Tools: Git, Docker, Postman, Figma, VS Code, Linux

WORK EXPERIENCE

Software Engineering Intern — Andela, Nairobi
Feb 2024 – Aug 2024
• Built and maintained 12 React components for the internal recruiter dashboard, reducing page load time by 40%.
• Developed REST API endpoints in Node.js/Express that handled 50k+ daily requests.
• Collaborated in Agile sprints using Jira and GitHub to ship bi-weekly feature releases.
• Wrote unit and integration tests (Jest) achieving 85% code coverage on assigned modules.

Junior Web Developer — Freelance, Remote
Jul 2023 – Jan 2024
• Delivered 5 end-to-end projects for SME clients across e-commerce and fintech sectors.
• Integrated M-Pesa Daraja API for a local retail client, processing KES 2M+ monthly.
• Built a React + Firebase progressive web app, reducing client's phone query volume by 30%.

EDUCATION

BSc. Computer Science — University of Nairobi
Sep 2020 – Jun 2024 | Second Class Upper (GPA: 3.6/4.0)

Relevant Coursework: Data Structures & Algorithms, Operating Systems, Software Engineering, Database Systems, Machine Learning Fundamentals.

PROJECTS

CareerCompass (Capstone, 2024)
Full-stack career management platform built with React + Vite, Node.js, and PostgreSQL. Features AI-powered ATS resume scoring and job matching.

SafariPay (Hackathon Winner, 2023)
Mobile-first React PWA integrating M-Pesa and Equity APIs for peer-to-peer micro-lending. Won 1st place at NaiHacks 2023.

CERTIFICATIONS
• Meta Front-End Developer Professional Certificate (Coursera, 2023)
• AWS Certified Cloud Practitioner (2024)

LANGUAGES
English (Fluent) | Swahili (Native)`,
  },
  {
    id: 'r2',
    name: 'Frontend CV',
    isDefault: false,
    updatedDate: 'Aug 3, 2024',
    createdDate: 'Jul 10, 2024',
    applications: 7,
    targetRole: 'Frontend Development',
    size: '312 KB',
    format: 'PDF',
    content: `GLADYS WANJIKU — FRONTEND ENGINEER
gladys.wanjiku@email.com | +254 712 345 678 | Nairobi, Kenya
Portfolio: gladyscode.dev | GitHub: @gladyswanjiku

CORE FRONTEND SKILLS
React.js • Next.js • TypeScript • JavaScript (ES2022)
Tailwind CSS • CSS-in-JS • Framer Motion • GSAP
Vite • Webpack • ESLint • Prettier
Storybook • Jest • React Testing Library
Figma → Code (Design handoff) • WCAG Accessibility

PROFESSIONAL EXPERIENCE

Frontend Engineer Intern — Andela, Nairobi
Feb 2024 – Aug 2024
• Led UI rebuild of recruiter analytics dashboard using React + TypeScript — delivered 3 weeks ahead of schedule.
• Implemented skeleton loading states and optimistic UI updates, improving perceived performance score (Lighthouse) from 62 → 91.
• Created a reusable component library (24 components) in Storybook; adopted across 3 teams.
• Mentored 2 junior interns in React best practices and code review etiquette.

Frontend Developer — Freelance
Jul 2023 – Jan 2024
• Designed and built 5 responsive marketing sites and web apps for local businesses using React and Next.js.
• Achieved Core Web Vitals "green" status (LCP < 2.5s, CLS < 0.1) across all client projects.

KEY PROJECTS

CompassUI Design System (2024)
Open-source React component library with 40+ accessible components, theming support, and full TypeScript definitions. 120+ GitHub stars.

Nairobi Jobs Board (2023)
Next.js + Supabase job aggregator, Server-Side Rendered for SEO, with real-time job alerts via WebSockets.

EDUCATION
BSc. Computer Science — University of Nairobi | 2020 – 2024 | Second Class Upper

CERTIFICATIONS
Meta Front-End Developer Certificate | Google UX Design Certificate`,
  },
  {
    id: 'r3',
    name: 'AI Internship CV',
    isDefault: false,
    updatedDate: 'Jul 29, 2024',
    createdDate: 'Jul 25, 2024',
    applications: 3,
    targetRole: 'AI / Machine Learning',
    size: '298 KB',
    format: 'PDF',
    content: `GLADYS WANJIKU
AI / Machine Learning Enthusiast
gladys.wanjiku@email.com | +254 712 345 678 | Nairobi, Kenya
github.com/gladyswanjiku | kaggle.com/gladyswanjiku

OBJECTIVE
Aspiring ML Engineer seeking an AI internship to apply hands-on machine learning and NLP skills in a product-focused team. Strong foundation in Python, scikit-learn, and TensorFlow, with a drive to build AI systems that solve real-world African market challenges.

ML / AI SKILLS
Python (NumPy, Pandas, Matplotlib, Seaborn)
Scikit-learn | TensorFlow | Keras | Hugging Face Transformers
Natural Language Processing (NLP) | Text Classification | Sentiment Analysis
Computer Vision (OpenCV, CNNs) | Feature Engineering
Jupyter Notebook | Google Colab | MLflow (experiment tracking)

ACADEMIC ML PROJECTS

Swahili News Classifier (Final Year Project, 2024)
• Fine-tuned mBERT on a custom 15,000-article Swahili corpus to classify news into 8 categories.
• Achieved 91.4% validation accuracy, outperforming baseline Naive Bayes by 18%.
• Deployed as a FastAPI endpoint on Google Cloud Run.

Crop Disease Detection (2023)
• Built a CNN (EfficientNetB3) to detect 7 maize diseases from leaf images for Kenyan smallholder farmers.
• Trained on augmented PlantVillage dataset; 94% F1-score on test set.
• Packaged as a mobile-friendly PWA for offline use.

M-Pesa Fraud Detection (2023)
• Developed an XGBoost fraud detection model on simulated M-Pesa transaction data.
• Reduced false positive rate to 2.1% while maintaining 96% recall on fraud cases.

RELEVANT COURSEWORK
Machine Learning Fundamentals | Deep Learning | Data Structures | Probability & Statistics | Linear Algebra

EDUCATION
BSc. Computer Science — University of Nairobi | 2020 – 2024
GPA: 3.7/4.0 (Distinction in ML course unit)

CERTIFICATIONS
DeepLearning.AI TensorFlow Developer Certificate (2024)
Kaggle: Machine Learning & Pandas Certifications (2023)

LANGUAGES
Python | R | SQL | Swahili (Native) | English (Fluent)`,
  },
]

export const stats = {
  applications: 24,
  interviews: 5,
  pending: 8,
  offers: 1,
}
