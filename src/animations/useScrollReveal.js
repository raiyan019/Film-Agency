import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Scroll-triggered reveals for everything inside `scopeRef`. Add these attributes in markup:
 *
 *   data-lines            on a <HeadingLines> container → its [data-line] children slide up out of a mask
 *   data-reveal           element fades + rises (batched: one ScrollTrigger batch for the whole page)
 *   data-mask             clip-path "curtain" reveal for an image wrapper
 *   data-mask-inner       (optional, inside data-mask) child that settles from a slight zoom
 *
 * Every trigger fires once. Nothing is animated for reduced-motion users.
 */
export function useScrollReveal(scopeRef) {
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope || reducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-lines]', scope).forEach((container) => {
        gsap.from(container.querySelectorAll('[data-line]'), {
          yPercent: 110,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.09,
          scrollTrigger: { trigger: container, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('[data-mask]', scope).forEach((wrapper) => {
        const inner = wrapper.querySelector('[data-mask-inner]')
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: wrapper, start: 'top 86%', once: true },
        })
        timeline.fromTo(
          wrapper,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }
        )
        if (inner) {
          timeline.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0)
        }
      })

      const items = gsap.utils.toArray('[data-reveal]', scope)
      if (items.length > 0) {
        gsap.set(items, { opacity: 0, y: 36 })
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, overwrite: true }),
        })
      }
    }, scope)

    return () => ctx.revert()
  }, [scopeRef, reducedMotion])
}
