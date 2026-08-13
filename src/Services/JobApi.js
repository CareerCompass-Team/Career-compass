/**
 * CareerCompass · Job API Service
 *
 * Strategy (cascading fallback):
 * 1. Remotive  — remote tech jobs, no key, CORS-OK
 * 2. Arbeitnow — EU + remote jobs, no key, CORS-OK
 * 3. Jobicy    — remote-only, no key, CORS-OK
 * 4. The Muse  — US/global tech jobs, no key, CORS-OK
 *
 * If every API fails, returns null → caller shows local mock data.
 * All fetched jobs are tagged source:'external' so the SmartApply
 * modal opens an external link instead of the in-app form.
 */

const REMOTIVE_URL   = 'https://remotive.com/api/remote-jobs?limit=30&category=software-dev'
const ARBEITNOW_URL  = 'https://www.arbeitnow.com/api/job-board-api?page=1'
const JOBICY_URL     = 'https://jobicy.com/api/v2/remote-jobs?count=20&tag=developer'
const THEMUSE_URL    = 'https://www.themuse.com/api/public/jobs?category=Computer+and+IT&page=1&descending=true&api_key=public'

// ─── Normalisers ────────────────────────────────────────────────────────────

function normalizeRemotive(job) {
  return {
    id: `ext-rem-${job.id}`,
    company: job.company_name || 'External Company',
    title: job.title || 'Software Role',
    location: job.candidate_required_location || 'Remote',
    workMode: 'Remote',
    type: job.job_type === 'full_time' ? 'Full-Time'
         : job.job_type === 'contract' ? 'Contract'
         : job.job_type === 'part_time' ? 'Part-Time'
         : 'Full-Time',
    experienceLevel: guessLevel(job.title),
    description: stripHtml(job.description || ''),
    responsibilities: [],
    requirements: extractKeywords(job.tags || []),
    preferred: [],
    skills: extractKeywords(job.tags || []),
    salary: job.salary || 'Competitive',
    deadline: 'Open',
    postedDate: fmtDate(job.publication_date),
    matchScore: randScore(72, 92),
    saved: false,
    isVerified: true,
    sourceTag: 'Global Remote',
    source: 'external',
    applyUrl: job.url || null,
    logoUrl: job.company_logo || null,
  }
}

function normalizeArbeitnow(job) {
  return {
    id: `ext-arb-${job.slug || Math.random().toString(36).slice(2)}`,
    company: job.company_name || 'Global Company',
    title: job.title || 'Engineering Role',
    location: job.location || 'Remote',
    workMode: job.remote ? 'Remote' : 'Onsite',
    type: 'Full-Time',
    experienceLevel: guessLevel(job.title),
    description: stripHtml(job.description || ''),
    responsibilities: [],
    requirements: (job.tags || []).slice(0, 6),
    preferred: [],
    skills: (job.tags || []).slice(0, 6),
    salary: 'Competitive',
    deadline: 'Open',
    postedDate: fmtDate(job.created_at ? new Date(job.created_at * 1000).toISOString() : null),
    matchScore: randScore(70, 90),
    saved: false,
    isVerified: true,
    sourceTag: job.remote ? 'Global Remote' : 'International',
    source: 'external',
    applyUrl: job.url || null,
    logoUrl: null,
  }
}

function normalizeJobicy(job) {
  return {
    id: `ext-jcy-${job.id}`,
    company: job.companyName || 'Global Company',
    title: job.jobTitle || 'Engineering Role',
    location: job.jobGeo || 'Worldwide',
    workMode: 'Remote',
    type: 'Full-Time',
    experienceLevel: guessLevel(job.jobTitle),
    description: stripHtml(job.jobDescription || ''),
    responsibilities: [],
    requirements: (job.jobIndustry || []).concat(job.jobType ? [job.jobType] : []),
    preferred: [],
    skills: (job.jobIndustry || []).concat(job.jobLevel ? [job.jobLevel] : []),
    salary: job.annualSalaryMin
      ? `$${Number(job.annualSalaryMin).toLocaleString()} – $${Number(job.annualSalaryMax).toLocaleString()}/yr`
      : 'Competitive',
    deadline: 'Open',
    postedDate: fmtDate(job.pubDate),
    matchScore: randScore(70, 88),
    saved: false,
    isVerified: true,
    sourceTag: 'Global Remote',
    source: 'external',
    applyUrl: job.url || null,
    logoUrl: null,
  }
}

function normalizeTheMuse(job) {
  const loc = (job.locations || []).map(l => l.name).join(', ') || 'Remote'
  const isRemote = loc.toLowerCase().includes('remote') || loc.toLowerCase().includes('flexible')
  return {
    id: `ext-muse-${job.id}`,
    company: job.company?.name || 'Tech Company',
    title: job.name || 'Software Role',
    location: loc,
    workMode: isRemote ? 'Remote' : 'Onsite',
    type: 'Full-Time',
    experienceLevel: (job.levels || []).map(l => l.name).join(', ') || 'Mid Level',
    description: stripHtml(job.contents || ''),
    responsibilities: [],
    requirements: (job.categories || []).map(c => c.name),
    preferred: [],
    skills: (job.categories || []).map(c => c.name),
    salary: 'Competitive',
    deadline: 'Open',
    postedDate: fmtDate(job.publication_date),
    matchScore: randScore(68, 88),
    saved: false,
    isVerified: true,
    sourceTag: 'Global',
    source: 'external',
    applyUrl: job.refs?.landing_page || null,
    logoUrl: null,
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Strip HTML tags and decode common entities */
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, 700)
}

function extractKeywords(tags) {
  if (!Array.isArray(tags)) return []
  return tags.slice(0, 6).map(t => String(t).trim())
}

function fmtDate(raw) {
  if (!raw) return 'Recently'
  try {
    return new Date(raw).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return 'Recently'
  }
}

function randScore(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function guessLevel(title = '') {
  const t = title.toLowerCase()
  if (t.includes('senior') || t.includes('lead') || t.includes('principal') || t.includes('staff')) return 'Senior'
  if (t.includes('junior') || t.includes('entry') || t.includes('intern') || t.includes('graduate')) return 'Entry Level'
  return 'Mid Level'
}

/** Fetch with a hard timeout */
async function fetchWithTimeout(url, timeoutMs = 7000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

// ─── Public Export ───────────────────────────────────────────────────────────

/**
 * Fetch live jobs from multiple public APIs.
 * Returns a merged, de-duplicated array of CareerCompass-shaped jobs,
 * or null if all APIs fail.
 */
export async function fetchLiveJobs() {
  const results = []

  // Fire all requests in parallel for speed
  const [remotive, arbeitnow, jobicy, themuse] = await Promise.allSettled([
    fetchWithTimeout(REMOTIVE_URL),
    fetchWithTimeout(ARBEITNOW_URL),
    fetchWithTimeout(JOBICY_URL),
    fetchWithTimeout(THEMUSE_URL),
  ])

  if (remotive.status === 'fulfilled' && Array.isArray(remotive.value?.jobs)) {
    console.info(`[JobAPI] Remotive: ${remotive.value.jobs.length} jobs`)
    results.push(...remotive.value.jobs.map(normalizeRemotive))
  } else {
    console.warn('[JobAPI] Remotive failed:', remotive.reason?.message)
  }

  if (arbeitnow.status === 'fulfilled' && Array.isArray(arbeitnow.value?.data)) {
    console.info(`[JobAPI] Arbeitnow: ${arbeitnow.value.data.length} jobs`)
    results.push(...arbeitnow.value.data.slice(0, 30).map(normalizeArbeitnow))
  } else {
    console.warn('[JobAPI] Arbeitnow failed:', arbeitnow.reason?.message)
  }

  if (jobicy.status === 'fulfilled' && Array.isArray(jobicy.value?.jobs)) {
    console.info(`[JobAPI] Jobicy: ${jobicy.value.jobs.length} jobs`)
    results.push(...jobicy.value.jobs.map(normalizeJobicy))
  } else {
    console.warn('[JobAPI] Jobicy failed:', jobicy.reason?.message)
  }

  if (themuse.status === 'fulfilled' && Array.isArray(themuse.value?.results)) {
    console.info(`[JobAPI] The Muse: ${themuse.value.results.length} jobs`)
    results.push(...themuse.value.results.map(normalizeTheMuse))
  } else {
    console.warn('[JobAPI] The Muse failed:', themuse.reason?.message)
  }

  if (results.length === 0) {
    console.warn('[JobAPI] All APIs failed. Falling back to local mock data.')
    return null
  }

  // De-duplicate by id (safety measure)
  const seen = new Set()
  const unique = results.filter(j => {
    if (seen.has(j.id)) return false
    seen.add(j.id)
    return true
  })

  console.info(`[JobAPI] Total unique live jobs loaded: ${unique.length}`)
  return unique
}
