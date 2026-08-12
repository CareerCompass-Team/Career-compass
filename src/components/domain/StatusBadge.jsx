// Knows about application statuses specifically (Saved/Applied/Interview/
// Offer/Not Selected) — that's what makes this "domain" instead of "ui".
// Colors come from lib/status.js, so there's exactly one place to change
// a color, not one per page.

import { applicationStatusColor, applicationStatusBg } from '../../lib/status'

export default function StatusBadge({ status, showDot = false }) {
  const color = applicationStatusColor[status]
  const bg = applicationStatusBg[status]

  return (
    <span
      className="inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium"
      style={{ background: bg, color }}
    >
      {showDot && <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: color }} />}
      {status}
    </span>
  )
}
