import { useEffect, useId, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * FRAME® film symbols: inline SVG/CSS, no image files, all colours via currentColor / design tokens.
 *
 *   <ClapperIcon size={20} />          clapperboard
 *   <ReelIcon size={28} spin />        film reel (spin = slow rotation)
 *   <FilmStrip drift />                sprocket-hole film strip (divider / band)
 *   <RecIndicator label="REC" />       blinking record light
 *   <Timecode fps={24} />              running 00:00:00:00 timecode
 *   <ViewfinderFrame />                camera viewfinder corner marks (put inside a `relative` parent)
 *   <SceneLabel scene={3}>Services</SceneLabel>   slate-style section label
 */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

export function ClapperIcon({ size = 24, className = '' }) {
  return (
    <svg {...iconProps} width={size} height={size} className={className}>
      <path d="M3 10 20.7 6.9 21.3 3.45 3.6 6.55z" />
      <path d="M6.54 9.38 8.91 5.62M10.97 8.6 13.34 4.85M15.39 7.83 17.76 4.07" />
      <path d="M3 10h18v10.5a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5z" />
      <path d="M7 15.5h10M7 18.2h5" />
    </svg>
  )
}

export function ReelIcon({ size = 24, spin = false, className = '' }) {
  return (
    <svg
      {...iconProps}
      width={size}
      height={size}
      className={`${spin ? 'animate-[spin_12s_linear_infinite]' : ''} ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="6.4" r="2.1" />
      <circle cx="17.33" cy="10.27" r="2.1" />
      <circle cx="15.3" cy="16.53" r="2.1" />
      <circle cx="8.7" cy="16.53" r="2.1" />
      <circle cx="6.67" cy="10.27" r="2.1" />
    </svg>
  )
}

/** A strip of 35mm sprocket holes. `drift` makes the film slowly slide like it is running through a projector. */
export function FilmStrip({ drift = false, className = '' }) {
  const patternId = `sprockets-${useId().replace(/:/g, '')}`

  return (
    <div
      aria-hidden="true"
      className={`h-5 w-full overflow-hidden border-y border-line bg-surface ${className}`}
    >
      <svg
        className={`block h-full ${drift ? 'animate-[filmdrift_2s_linear_infinite]' : ''}`}
        style={{ width: 'calc(100% + 28px)' }}
      >
        <defs>
          <pattern id={patternId} width="28" height="20" patternUnits="userSpaceOnUse">
            <rect x="8" y="5" width="12" height="10" rx="2" fill="var(--color-base)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

/** Blinking record light. Uses the accent colour; swap `bg-accent` for `bg-red-500` if you prefer classic red. */
export function RecIndicator({ label = 'REC', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] ${className}`}
    >
      <span
        aria-hidden="true"
        className="size-2 rounded-full bg-accent animate-[recblink_1.6s_linear_infinite]"
      />
      {label}
    </span>
  )
}

/** Running timecode HH:MM:SS:FF. Updates the DOM directly (no React re-renders) and is static for reduced motion. */
export function Timecode({ fps = 24, className = '' }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const pad = (n) => String(n).padStart(2, '0')
    const format = (frames) =>
      [
        Math.floor(frames / (fps * 3600)),
        Math.floor(frames / (fps * 60)) % 60,
        Math.floor(frames / fps) % 60,
        frames % fps,
      ]
        .map(pad)
        .join(':')

    if (reducedMotion) {
      el.textContent = format(0)
      return undefined
    }

    let visible = true
    let lastFrame = -1
    let rafId
    const start = performance.now()

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(el)

    const tick = (now) => {
      if (visible) {
        const frame = Math.floor(((now - start) / 1000) * fps)
        if (frame !== lastFrame) {
          lastFrame = frame
          el.textContent = format(frame)
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [fps, reducedMotion])

  return (
    <span ref={ref} aria-hidden="true" className={`tabular-nums tracking-[0.1em] ${className}`}>
      00:00:00:00
    </span>
  )
}

/** Camera viewfinder corner marks (+ optional centre cross). The parent must be `relative`. */
export function ViewfinderFrame({ inset = '1.25rem', size = 18, crosshair = false, className = '' }) {
  const corner = 'absolute border-fg/70'
  const box = { width: size, height: size }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ inset }}
    >
      <span className={`${corner} left-0 top-0 border-l border-t`} style={box} />
      <span className={`${corner} right-0 top-0 border-r border-t`} style={box} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} style={box} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} style={box} />
      {crosshair && (
        <>
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-fg/60" />
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-y-1/2 bg-fg/60" />
        </>
      )}
    </div>
  )
}

/** Slate-style section label, e.g. [SC 03] Services */
export function SceneLabel({ scene, children, className = '' }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="border border-line px-1.5 py-1 text-fg">
        SC {String(scene).padStart(2, '0')}
      </span>
      <span>{children}</span>
    </p>
  )
}
