import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/animations/gsap'
import MediaImage from '@/components/common/MediaImage'
import { FilmStrip } from '@/components/common/FilmSymbols'
import { projects } from '@/data/projects'

const pad = (number) => String(number).padStart(2, '0')

/**
 * A strip of film frames (one still per project).
 *  - Desktop (≥1024px, motion allowed): the section pins and the strip travels sideways 1:1 with your scroll.
 *    Travel distance equals scroll distance, so it never feels hijacked. Tabbing to an off-screen frame scrolls to it.
 *  - Mobile / tablet / reduced motion: a normal swipeable horizontal scroller.
 */
export default function FilmStripBand() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      { canPin: '(min-width: 1024px) and (min-height: 600px)', reduceMotion: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { canPin, reduceMotion } = context.conditions
        if (!canPin || reduceMotion) return undefined

        const viewport = viewportRef.current
        const track = trackRef.current
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

        // Native overflow would fight the transform, so hide it only while the pinned mode is active.
        viewport.style.overflow = 'hidden'

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        timeline.to(track, { x: () => -getDistance() }, 0).to(progressRef.current, { scaleX: 1 }, 0)

        // Keyboard access: focusing an off-screen frame scrolls the page to the matching position.
        const onFocusIn = (event) => {
          viewport.scrollLeft = 0
          const frame = event.target.closest('[data-frame]')
          const trigger = timeline.scrollTrigger
          const distance = getDistance()
          if (!frame || !trigger || distance === 0) return
          const target = Math.min(distance, Math.max(0, frame.offsetLeft - viewport.clientWidth * 0.1))
          window.scrollTo({ top: trigger.start + (target / distance) * (trigger.end - trigger.start) })
        }
        track.addEventListener('focusin', onFocusIn)

        return () => {
          track.removeEventListener('focusin', onFocusIn)
          viewport.style.overflow = ''
        }
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Recent frames"
      className="relative overflow-hidden border-y border-line bg-surface py-20 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-frame mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">Frames / 2026</p>
          <h2 className="text-title uppercase">Recent frames</h2>
        </div>
        <p className="eyebrow hidden tabular-nums sm:block">{pad(projects.length)} stills</p>
      </div>

      <div ref={viewportRef} className="overflow-x-auto overscroll-x-contain lg:overflow-hidden">
        <div ref={trackRef} className="relative w-max will-change-transform">
          <FilmStrip />
          <ul className="flex gap-4 px-[4vw] py-5">
            {projects.map((project, index) => {
              const still = project.gallery[0]
              return (
                <li key={project.id} className="shrink-0">
                  <Link
                    to={`/work/${project.slug}`}
                    data-frame
                    data-cursor="View"
                    className="group block w-[72vw] sm:w-[44vw] lg:w-[28vw]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-card">
                      <div className="h-full w-full transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]">
                        <MediaImage src={still.src} seed={`${project.slug}-0`} alt={`${project.title}: ${still.alt}`} />
                      </div>
                    </div>
                    <div className="eyebrow mt-3 flex items-center justify-between gap-4">
                      <span className="tabular-nums">{pad(index + 1)}</span>
                      <span className="truncate text-fg">{project.title}</span>
                      <span className="tabular-nums">{project.year}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
          <FilmStrip />
        </div>
      </div>

      <div className="container-frame mt-10 hidden lg:block" aria-hidden="true">
        <div className="h-px bg-line">
          <div ref={progressRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  )
}
