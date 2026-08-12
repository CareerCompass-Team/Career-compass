export default function CompassLogo({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="55%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="10" y1="22" x2="23" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
      <path
        d="M23 11C21 8.5 18.2 7 15 7C9.5 7 5 11.5 5 17C5 22.5 9.5 27 15 27C18.2 27 21 25.5 23 23"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.92"
      />
      <line x1="15" y1="20" x2="22" y2="13" stroke="url(#arrowGrad)" strokeWidth="2" strokeLinecap="round" />
      <polyline points="17.5,13 22,13 22,17.5" stroke="url(#arrowGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="26" cy="7" r="1.2" fill="white" opacity="0.6" />
    </svg>
  )
}
