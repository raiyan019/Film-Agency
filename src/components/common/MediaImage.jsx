import { useId, useState } from 'react'
import { siteConfig } from '@/data/siteConfig'

/*
 * MediaImage: shows your real image, or a generated cinematic placeholder.
 *  - siteConfig.media.usePlaceholders === true  → placeholder only, NO image requests (clean console on a fresh install)
 *  - false                                      → real <img>; if a file is missing it falls back to the placeholder
 * The placeholder is deterministic: the same `seed` always produces the same "film still".
 */

const PALETTES = [
  ['#15120d', '#4a3f2c', '#d9b36c'], // amber
  ['#0d1316', '#2a4048', '#7fb2c4'], // steel blue
  ['#131313', '#3d3b37', '#e9e6df'], // neutral
  ['#0e1411', '#2d4237', '#9fd4a8'], // sage
  ['#161013', '#4a2f3d', '#d98fb0'], // dusk rose
  ['#150f0b', '#4d3320', '#ff9a5c'], // sunset
]

const hashString = (text) => {
  let hash = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const seededRandom = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function Ridgeline({ rand }) {
  const phaseA = rand() * 6
  const phaseB = rand() * 6
  const base = 760 + rand() * 90
  const points = []
  for (let x = 0; x <= 1600; x += 40) {
    const y = base - 70 * Math.sin(x / 260 + phaseA) - 38 * Math.sin(x / 97 + phaseB)
    points.push(`${x} ${y.toFixed(1)}`)
  }
  return <path d={`M0 1000 L${points.join(' L')} L1600 1000Z`} fill="#050505" opacity="0.92" />
}

function Skyline({ rand, light }) {
  const buildings = []
  const lights = []
  let x = -20
  while (x < 1620) {
    const width = 50 + rand() * 90
    const height = 110 + rand() * 280
    buildings.push(<rect key={`b${x}`} x={x} y={1000 - height} width={width} height={height} />)
    if (rand() > 0.55) {
      lights.push(
        <rect key={`l${x}`} x={x + width * 0.3} y={1000 - height + 30 + rand() * 60} width="7" height="9" fill={light} opacity="0.55" />
      )
    }
    x += width + 4
  }
  return (
    <g>
      <g fill="#050505" opacity="0.94">{buildings}</g>
      {lights}
    </g>
  )
}

function Silhouette() {
  return (
    <g>
      <circle cx="800" cy="410" r="175" fill="#050505" opacity="0.88" />
      <path d="M280 1000C280 770 510 655 800 655s520 115 520 345Z" fill="#050505" opacity="0.88" />
    </g>
  )
}

function Placeholder({ seed, variant, alt, className, ...rest }) {
  const uid = useId().replace(/:/g, '')
  const rand = seededRandom(hashString(seed || 'frame'))
  const [dark, mid, light] = PALETTES[Math.floor(rand() * PALETTES.length)]
  const glowX = 200 + rand() * 1200
  const glowY = 130 + rand() * 420
  const glowRadius = 520 + rand() * 420
  const scene = Math.floor(rand() * 3)

  return (
    <div
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`relative h-full w-full overflow-hidden bg-surface ${className}`}
      {...rest}
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor={mid} />
            <stop offset="1" stopColor={dark} />
          </linearGradient>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0" stopColor={light} stopOpacity="0.5" />
            <stop offset="1" stopColor={light} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-streak`}>
            <stop offset="0" stopColor={light} stopOpacity="0.9" />
            <stop offset="1" stopColor={light} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-vig`} cx="0.5" cy="0.5" r="0.75">
            <stop offset="0.4" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.78" />
          </radialGradient>
        </defs>
        <rect width="1600" height="1000" fill={`url(#${uid}-bg)`} />
        <circle cx={glowX} cy={glowY} r={glowRadius} fill={`url(#${uid}-glow)`} />
        {/* anamorphic lens streak */}
        <ellipse cx={glowX} cy={glowY} rx="950" ry="14" fill={`url(#${uid}-streak)`} opacity="0.65" />
        {variant === 'portrait' ? (
          <Silhouette />
        ) : (
          <>
            {scene === 0 && <Ridgeline rand={rand} />}
            {scene === 1 && <Skyline rand={rand} light={light} />}
          </>
        )}
        <rect width="1600" height="1000" fill={`url(#${uid}-vig)`} />
      </svg>
      <div className="film-grain pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  )
}

export default function MediaImage({ src, alt = '', seed, variant = 'still', className = '', ...rest }) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = siteConfig.media.usePlaceholders || !src || failed

  if (showPlaceholder) {
    // loading / fetchPriority only make sense on <img>, so don't forward them to the placeholder <div>.
    // eslint-disable-next-line no-unused-vars
    const { loading, fetchPriority, decoding, ...divProps } = rest
    return <Placeholder seed={seed || src} variant={variant} alt={alt} className={className} {...divProps} />
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
      {...rest}
    />
  )
}
