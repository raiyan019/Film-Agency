import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { siteConfig } from '@/data/siteConfig'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Cinematic preloader (GSAP timeline).
 * - Progress eases to 85% over `minDurationMs`, then completes only when the page
 *   `load` event and web fonts are ready (capped by `maxDurationMs`), so it never waits longer than needed.
 * - Exit: counter fades, the whole panel wipes upward.
 * - Not rendered at all for reduced-motion users (see MainLayout).
 */
export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const wordRef = useRef(null)
  const counterRef = useRef(null)
  const barRef = useRef(null)
  const metaRef = useRef(null)

  useLockBodyScroll(true)

  useLayoutEffect(() => {
    const { minDurationMs, maxDurationMs } = siteConfig.preloader
    let cancelled = false

    const ctx = gsap.context(() => {
      const progress = { value: 0 }

      const render = () => {
        const rounded = Math.round(progress.value)
        counterRef.current.textContent = String(rounded).padStart(3, '0')
        barRef.current.style.transform = `scaleX(${progress.value / 100})`
      }

      gsap.set(wordRef.current, { yPercent: 110 })
      gsap.set(metaRef.current, { opacity: 0 })

      const intro = gsap.timeline()
      intro
        .to(wordRef.current, { yPercent: 0, duration: 1, ease: 'power4.out' })
        .to(metaRef.current, { opacity: 1, duration: 0.6 }, 0.2)
        .to(
          progress,
          { value: 85, duration: minDurationMs / 1000, ease: 'power2.out', onUpdate: render },
          0.1
        )

      const loaded = new Promise((resolve) => {
        if (document.readyState === 'complete') resolve()
        else window.addEventListener('load', resolve, { once: true })
      })
      const fontsReady = document.fonts?.ready ?? Promise.resolve()
      const assetsReady = Promise.race([Promise.all([loaded, fontsReady]), wait(maxDurationMs)])

      Promise.all([intro.then(), assetsReady]).then(() => {
        if (cancelled) return
        // ctx.add keeps tweens created later inside the context, so unmount still cleans them up.
        ctx.add(() => {
          gsap
            .timeline({ onComplete: () => !cancelled && onComplete() })
            .to(progress, { value: 100, duration: 0.45, ease: 'power1.inOut', onUpdate: render })
            .to(metaRef.current, { opacity: 0, duration: 0.3 }, '>-0.1')
            .to(rootRef.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '>0.05')
            .to(wordRef.current, { yPercent: -35, duration: 1, ease: 'power4.inOut' }, '<')
        })
      })
    }, rootRef)

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      role="status"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-base px-[clamp(1.25rem,4vw,4rem)] py-6 text-fg"
    >
      <span className="sr-only">Loading</span>

      <div ref={metaRef} aria-hidden="true" className="eyebrow flex justify-between">
        <span>{siteConfig.descriptor}</span>
        <span className="hidden sm:inline">Loading</span>
      </div>

      <div className="overflow-hidden pb-[0.08em]" aria-hidden="true">
        <p ref={wordRef} className="text-hero uppercase will-change-transform">
          {siteConfig.name}
          <span className="text-accent">{siteConfig.trademark}</span>
        </p>
      </div>

      <div aria-hidden="true">
        <div ref={counterRef} className="text-title mb-4 tabular-nums">000</div>
        <div className="h-px w-full bg-line">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  )
}
