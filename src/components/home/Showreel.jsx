import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { gsap } from '@/animations/gsap'
import MediaImage from '@/components/common/MediaImage'
import { ViewfinderFrame } from '@/components/common/FilmSymbols'
import { homeContent } from '@/data/home'
import ShowreelModal from './ShowreelModal'

/**
 * Showreel. On desktop (motion allowed) the section pins briefly while the framed picture expands
 * to fill the screen (clip-path), like a projector opening up. On mobile and for reduced-motion
 * visitors it's a simple full-width banner. The modal is portalled to <body> so the pin's
 * transform can never break its position: fixed.
 */
export default function Showreel() {
  const { showreel } = homeContent
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const posterRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      { canPin: '(min-width: 1024px) and (min-height: 600px)', reduceMotion: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { canPin, reduceMotion } = context.conditions
        if (!canPin || reduceMotion) return

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=90%',
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
            },
          })
          .fromTo(frameRef.current, { clipPath: 'inset(16% 14% 16% 14%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
          .fromTo(posterRef.current, { scale: 1.3 }, { scale: 1 }, 0)
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} aria-label="Showreel" className="relative h-[75svh] min-h-[28rem] w-full lg:h-svh">
      <div ref={frameRef} className="absolute inset-0 overflow-hidden bg-card">
        <div ref={posterRef} className="absolute inset-0">
          <MediaImage src={showreel.poster} seed="showreel" alt="" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-base/45" />
        <ViewfinderFrame inset="1.25rem" crosshair />

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          data-cursor="Play"
          className="group absolute inset-0 flex flex-col items-center justify-center gap-6"
        >
          <span className="flex size-24 items-center justify-center rounded-full border border-fg/70 transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-base group-focus-visible:bg-accent group-focus-visible:text-base sm:size-28">
            <Play size={30} aria-hidden="true" fill="currentColor" className="translate-x-0.5" />
          </span>
          <span className="eyebrow !text-fg">
            Play {showreel.title} <span className="text-fg/60">· {showreel.duration}</span>
          </span>
        </button>

        <p aria-hidden="true" className="eyebrow absolute bottom-6 left-6 hidden text-fg/70 sm:block sm:left-10">
          Reel / 2026
        </p>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <ShowreelModal
              title={showreel.title}
              video={showreel.video}
              poster={showreel.poster}
              returnFocusRef={triggerRef}
              onClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
