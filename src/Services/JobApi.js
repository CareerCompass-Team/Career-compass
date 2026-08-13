/**
 * CareerCompass · Job API Service
 *
 * Strategy:
 * - Primary: Remotive public API (free, no key, CORS-enabled)
 * - Secondary: Jobicy public API (free, no key)
 * - Fallback: Returns null → caller shows local mock data instead
 *
 * All fetched jobs are tagged with `source: 'external'` so the
 * SmartApply modal knows to open an external link instead of the
 * in-app application form.
 */

const REMOTIVE_URL = 'https://remotive.com/api/remote-jobs?limit=20&category=software-dev'
const JOBICY_URL   = 'https://jobicy.com/api/v2/remote-jobs?count=10&tag=developer'

/**
 * Normalize a Remotive job object → CareerCompass job schema
 */
function normalizeRemotive(job) {
  return {
    id: `ext-rem-${job.id}`,
    company: job.company_name || 'External Company',
    title: job.title || 'Software Role',
    location: job.candidate_required_location || 'Remote',
    type: job.job_type === 'full_time'
      ? 'Full-Time'
      : job.job_type === 'contract'
        ? 'Contract'
        : 'Remote',
    description: stripHtml(job.description || ''),
    responsibilities: [],
    requirements: extractKeywords(job.tags || []),
    preferred: [],
    skills: extractKeywords(job.tags || []),
    salary: job.salary || 'Competitive',
    deadline: 'Open',
    postedDate: job.publication_date
      ? new Date(job.publication_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Recently',
    matchScore: Math.floor(Math.random() * 20) + 72,
    saved: false,
    isVerified: true,
    sourceTag: 'Global Remote',
    // Smart Apply fields
    source: 'external',
    applyUrl: job.url || null,
  }
}

/**
 * Normalize a Jobicy job object → CareerCompass job schema
 */
function normalizeJobicy(job) {
  return {
    id: `ext-jcy-${job.id}`,
    company: job.companyName || 'Global Company',
    title: job.jobTitle || 'Engineering Role',
    location: job.jobGeo || 'Remote',
    type: 'Full-Time',
    description: stripHtml(job.jobDescription || ''),
    responsibilities: [],
    requirements: (job.jobIndustry || []).concat(job.jobType ? [job.jobType] : []),
    preferred: [],
    skills: (job.jobIndustry || []).concat(job.jobLevel ? [job.jobLevel] : []),
    salary: job.annualSalaryMin
      ? `$${Number(job.annualSalaryMin).toLocaleString()} - $${Number(job.annualSalaryMax).toLocaleString()}/yr`
      : 'Competitive',
    deadline: 'Open',
    postedDate: job.pubDate
      ? new Date(job.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Recently',
    matchScore: Math.floor(Math.random() * 18) + 70,
    saved: false,
    isVerified: true,
    sourceTag: 'Global Remote',
    // Smart Apply fields
    source: 'external',
    applyUrl: job.url || null,
  }
}

/** Strip HTML tags from API description strings */
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, 600)
}

/** Turn tag strings into a clean array of skill keywords */
function extractKeywords(tags) {
  if (!Array.isArray(tags)) return []
  return tags.slice(0, 6).map(t => String(t).trim())
}

/**
 * Fetch from a URL with a 5-second timeout.
 */
async function fetchWithTimeout(url, timeoutMs = 5000) {
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

/**
 * Fetch live jobs from public APIs.
 * Returns an array of CareerCompass-shaped jobs, or null on failure.
 */
export async function fetchLiveJobs() {
  // 1. Try Remotive
  try {
    const data = await fetchWithTimeout(REMOTIVE_URL)
    if (Array.isArray(data?.jobs) && data.jobs.length > 0) {
      console.info(`[JobAPI] Remotive: loaded ${data.jobs.length} jobs`)
      return data.jobs.map(normalizeRemotive)
    }
  } catch (err) {
    console.warn('[JobAPI] Remotive failed, trying Jobicy...', err.message)
  }

  // 2. Try Jobicy
  try {
    const data = await fetchWithTimeout(JOBICY_URL)
    if (Array.isArray(data?.jobs) && data.jobs.length > 0) {
      console.info(`[JobAPI] Jobicy: loaded ${data.jobs.length} jobs`)
      return data.jobs.map(normalizeJobicy)
    }
  } catch (err) {
    console.warn('[JobAPI] All APIs failed. Using local data only.', err.message)
  }

  return null
}
