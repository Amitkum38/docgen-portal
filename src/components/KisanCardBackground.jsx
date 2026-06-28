const W = 360
const H = 228

/** Full-card background layer — sepia plowing scene + corner leaves (SVG only) */
export default function KisanCardBackground() {
  const s = '#8a7560'
  const sLight = '#a8927a'

  return (
    <g aria-hidden="true">
      <defs>
        <clipPath id="mkBgClip">
          <rect x="0" y="28" width={W} height="172" />
        </clipPath>
        <linearGradient id="mkBgFade" x1="0" y1="28" x2="0" y2="200">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* cream base tint */}
      <rect x="0" y="28" width={W} height="172" fill="#faf8f2" />

      <g clipPath="url(#mkBgClip)" opacity="0.28">
        {/* perspective field furrows → vanishing point left */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line
            key={`v${i}`}
            x1="-30"
            y1="118"
            x2={30 + i * 42}
            y2={H}
            stroke={sLight}
            strokeWidth="0.65"
            fill="none"
          />
        ))}
        {[148, 162, 176, 190, 204].map((y, i) => (
          <path
            key={`h${i}`}
            fill="none"
            stroke={s}
            strokeWidth="0.7"
            d={`M0 ${y} Q120 ${y - 8} 240 ${y - 4} T360 ${y + 2}`}
          />
        ))}

        {/* distant hills / horizon */}
        <path
          fill="none"
          stroke={sLight}
          strokeWidth="0.8"
          d="M0 132 Q80 120 160 125 Q240 130 360 122"
        />

        {/* palm trees — back */}
        <g stroke={s} strokeWidth="0.9" fill="none">
          <path d="M278 108 v32" />
          <path d="M278 115 l-12 -10 M278 112 l10 -8 M278 118 l-14 2 M278 114 l12 -4" />
          <path d="M302 114 v28" />
          <path d="M302 120 l-9 -7 M302 118 l8 -6" />
          <path d="M318 120 v22" />
          <path d="M318 124 l-7 -6 M318 122 l6 -5" />
        </g>

        {/* birds */}
        <g stroke={s} strokeWidth="0.7" fill="none">
          <path d="M232 88 q4 3 8 0" />
          <path d="M248 82 q3 2 6 0" />
          <path d="M262 90 q3 2 5 0" />
        </g>

        {/* oxen team + plow — center-right */}
        <g fill={s} stroke={s} strokeWidth="0.5">
          {/* yoke */}
          <path fill="none" strokeWidth="1" d="M155 168 h58" />
          {/* ox 1 */}
          <ellipse cx="168" cy="176" rx="15" ry="9" />
          <rect x="161" y="160" width="5" height="16" rx="1" />
          <circle cx="168" cy="156" r="5.5" />
          <path fill="none" d="M163 168 l-6 8 M171 168 l4 8" strokeWidth="0.8" />
          {/* ox 2 */}
          <ellipse cx="198" cy="176" rx="15" ry="9" />
          <rect x="191" y="160" width="5" height="16" rx="1" />
          <circle cx="198" cy="156" r="5.5" />
          <path fill="none" d="M193 168 l-4 8 M201 168 l6 8" strokeWidth="0.8" />
          {/* farmer */}
          <circle cx="228" cy="146" r="5" />
          <rect x="225" y="150" width="5" height="14" rx="1" />
          <path d="M233 148 l18 5 v11 l-18 -4 z" />
          <path d="M220 141 l10 -12 4 2 -8 11z" />
          {/* plow blade */}
          <path fill="none" strokeWidth="1.1" d="M142 180 l28 -6" />
          <path d="M138 182 l8 4 l-2 -8 z" opacity="0.8" />
        </g>

        {/* subtle ground shadow under team */}
        <ellipse cx="195" cy="188" rx="70" ry="6" fill={sLight} opacity="0.35" stroke="none" />
      </g>

      {/* soft fade so text stays readable */}
      <rect x="0" y="28" width={W} height="172" fill="url(#mkBgFade)" pointerEvents="none" />

      {/* corner leaf clusters (reference template) */}
      <g opacity="0.4" fill="#5d8a45">
        <g transform="translate(348, 4) rotate(25)">
          <ellipse cx="0" cy="0" rx="11" ry="6" />
          <ellipse cx="-8" cy="4" rx="8" ry="5" transform="rotate(-30)" />
        </g>
        <g transform="translate(6, 108) rotate(-15)">
          <ellipse cx="0" cy="0" rx="10" ry="5" />
          <ellipse cx="8" cy="3" rx="7" ry="4" transform="rotate(20)" />
        </g>
      </g>

      {/* bottom-left wave accent (reference) */}
      <g opacity="0.12">
        <path d={`M0 ${H} L0 178 Q90 158 200 168 Q280 175 0 ${H}`} fill="#1b5e20" />
        <path
          fill="none"
          stroke="#f9a825"
          strokeWidth="1.2"
          d="M0 178 Q90 158 200 168"
          opacity="0.55"
        />
      </g>
    </g>
  )
}

export { W, H }
