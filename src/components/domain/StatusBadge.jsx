// Renders a status pill for either an application or an interview.
// All the actual color logic lives in lib/status.js — this component
// just picks the right map based on `kind`.

import {
  applicationStatusColor, applicationStatusBg,
  interviewStatusColor, interviewStatusBg,
  interviewResultColor, interviewResultBg,
} from '../../lib/status'

const MAPS = {
  application: [applicationStatusColor, applicationStatusBg],
  interview: [interviewStatusColor, interviewStatusBg],
  result: [interviewResultColor, interviewResultBg],
}

export default function StatusBadge({ status, kind = 'application', showDot = false }) {
  const [colorMap, bgMap] = MAPS[kind]
  const color = colorMap[status]
  const bg = bgMap[status]

  return (
    <span
      className="inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
      style={{ background: bg, color }}
    >
      {showDot && <span className="w-1.5 h-1.5 rounded-full mr-2 shrink-0" style={{ background: color }} />}
      {status}
    </span>
  )
}
