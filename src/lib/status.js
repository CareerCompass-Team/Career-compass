// Single source of truth for application status → color/background.
// Import this anywhere a status needs to be shown (Applications page,
// Dashboard, Application Details) instead of re-typing the colors.
// If a teammate needs a new status, add it here once — every page
// that imports this will pick it up automatically.

export const APPLICATION_STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Accepted', 'Not Selected']

// "Not Selected" is intentionally calm and neutral. "Accepted" is a positive
// final state that is distinct from offer stage.
export const applicationStatusColor = {
  Saved: 'var(--text-5)',
  Applied: '#3b82f6',
  Interview: '#f59e0b',
  Offer: '#10b981',
  Accepted: '#0ea5e9',
  'Not Selected': 'var(--text-5)',
}

export const applicationStatusBg = {
  Saved: 'var(--accent-bg-faint)',
  Applied: 'rgba(59,130,246,0.1)',
  Interview: 'rgba(245,158,11,0.1)',
  Offer: 'rgba(16,185,129,0.1)',
  Accepted: 'rgba(14,165,233,0.12)',
  'Not Selected': 'var(--surface-very-faint)',
}
