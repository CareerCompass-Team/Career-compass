// Single source of truth for status → color/background, for BOTH
// application statuses and interview statuses. One file, so a color
// only ever needs to change in one place.

export const APPLICATION_STATUSES = [
  'Saved',
  'Applied',
  'Screening',
  'Interview',
  'Final Stage',
  'Offer',
  'Accepted',
  'Not Selected',
]

// "Not Selected" (not "Rejected") is intentionally neutral gray, not red —
// a rejection already feels bad enough without the UI agreeing with it.
// "Accepted" gets its own celebratory treatment, distinct from "Offer"
// (received, undecided) — accepting is the one moment worth celebrating.
export const applicationStatusColor = {
  Saved: 'var(--text-5)',
  Applied: '#3b82f6',
  Screening: '#8b5cf6',
  Interview: '#f59e0b',
  'Final Stage': '#8b5cf6',
  Offer: '#10b981',
  Accepted: '#10b981',
  'Not Selected': 'var(--text-5)',
}

export const applicationStatusBg = {
  Saved: 'var(--accent-bg-faint)',
  Applied: 'rgba(59,130,246,0.1)',
  Screening: 'rgba(139,92,246,0.1)',
  Interview: 'rgba(245,158,11,0.1)',
  'Final Stage': 'rgba(139,92,246,0.1)',
  Offer: 'rgba(16,185,129,0.1)',
  Accepted: 'rgba(16,185,129,0.16)',
  'Not Selected': 'var(--surface-very-faint)',
}

export const INTERVIEW_STATUSES = ['Upcoming', 'Completed']

export const interviewStatusColor = {
  Upcoming: '#f59e0b',
  Completed: '#3b82f6',
}

export const interviewStatusBg = {
  Upcoming: 'rgba(245,158,11,0.1)',
  Completed: 'rgba(59,130,246,0.1)',
}

export const INTERVIEW_RESULTS = ['Waiting', 'Offer', 'Not Selected']

export const interviewResultColor = {
  Waiting: 'var(--text-5)',
  Offer: '#10b981',
  'Not Selected': 'var(--text-5)',
}

export const interviewResultBg = {
  Waiting: 'var(--surface-very-faint)',
  Offer: 'rgba(16,185,129,0.1)',
  'Not Selected': 'var(--surface-very-faint)',
}
