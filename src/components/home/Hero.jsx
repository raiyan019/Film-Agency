import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import { RecIndicator, Timecode, ViewfinderFrame } from '@/components/common/FilmSymbols'
import { useSiteReady } from '@/context/SiteReadyContext'
import { homeContent } from '@/data/home'
import { siteConfig } from '@/data/siteConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Cinematic full-screen hero.
 * Background = generated placeholder (always underneath) + <video> on top once real media is enabled.
 * The entrance timeline waits for the preloader (useSiteReady) and is skipped for reduced motion.
 */
export default function Hero() {
  const { hero } = homeContent
  const rootRef = useRef(null)
  const backgroundRef = useRef(null)
  const isReady = useSiteReady()
  const reducedMotion = useReducedMotion()
  const showVideo = !siteConfig.media.usePlaceholders && !reducedMotion

  // 1. Hide everything before first paint (no flash of unstyled content).
  useLayoutEffect(() => {
    if (reducedMotion) return undefined
    const ctx = gsap.context(() => {
      gsap.set('[data-line]', { yPercent: 110 })
      gsap.set('[data-hero-fade]', { opacity: 0, y: 24 })
      gsap.set(backgroundRef.current, { scale: 1.18 })
    }, rootRef)
    return () => ctx.revert()
  }, [reducedMotion])

  // 2. Play the entrance once the preloader has finished.
  useEffect(() => {
    if (reducedMotion || !isReady) return undefined
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(backgroundRef.current, { scale: 1, duration: 2.6, ease: 'power3.out' }, 0)
        .to('[data-line]', { yPercent: 0, duration: 1.3, stagger: 0.12 }, 0.15)
        .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, 0.9)
    }, rootRef)
    return () => ctx.revert()
  }, [isReady, reducedMotion])

  const scrollToNext = (event) => {
    event.preventDefault()
    const target = document.getElementById('studio')
    if (!target) return
    if (reducedMotion) {
      target.scrollIntoView()
      return
    }
    gsap.to(window, { scrollTo: { y: target, autoKill: true }, duration: 1.4, ease: 'power3.inOut' })
  }

  return (
    <section ref={rootRef} aria-label="Introduction" className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
      <div ref={backgroundRef} aria-hidden="true" className="absolute inset-0 -z-20">
        <MediaImage src={hero.poster} seed="hero" loading="eager" fetchPriority="high" />
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={hero.video}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        )}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-base/50" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-base to-transparent" />

      <ViewfinderFrame inset="1.25rem" />

      <div className="container-frame relative pb-20 pt-32 sm:pb-24">
        <div data-hero-fade className="eyebrow mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-fg/80">
          <RecIndicator className="text-fg" />
          <Timecode />
          <span className="hidden sm:inline">2.39:1</span>
          <span className="hidden md:inline">{siteConfig.descriptor}</span>
        </div>

        <HeadingLines as="h1" lines={hero.lines} scrollReveal={false} accentPunctuation className="text-hero uppercase" />

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p data-hero-fade className="max-w-md text-base text-fg/80 sm:text-lg">
            {hero.descriptor}
          </p>
          <a
            href="#studio"
            onClick={scrollToNext}
            data-hero-fade
            className="group flex w-fit items-center gap-4 text-xs font-medium uppercase tracking-[0.18em]"
          >
            Scroll
            <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-fg/30">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-accent" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
