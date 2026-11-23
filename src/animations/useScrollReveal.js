import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/animations/gsap'

// Images shorter than this don't get parallax (keeps the number of ScrollTriggers low).
const MIN_PARALLAX_HEIGHT = 380

/**
 * Scroll-driven animation for everything inside `scopeRef`. Markup contract (data attributes):
 *
 *   data-lines        <HeadingLines> container: [data-line] children rise out of a mask with a slight tilt
 *   data-reveal       fades + rises (batched into one ScrollTrigger batch)
 *   data-mask         image wrapper: clip-path curtain reveal; add data-mask-inner (absolute inset-0) for zoom-settle
 *                     + subtle parallax on desktop for tall images. Opt out with data-no-parallax.
 *   data-scrub        <ScrubText>: words light up as you scroll through the paragraph
 *   data-bg-parallax  hero-style background: drifts slower than the page (desktop)
 *   data-scroll-fade  hero-style content: fades and lifts as the section scrolls away (desktop)
 *
 * Built on gsap.matchMedia(): reduced-motion visitors get NO animation (everything stays visible),
 * and mobile skips parallax and scroll-fades. Everything is reverted automatically on unmount.
 */
export function useScrollReveal(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const mm = gsap.matchMedia()

    mm.add(
      { isDesktop: '(min-width: 768px)', reduceMotion: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions
        if (reduceMotion) return

        // 1. Cinematic line reveals
        gsap.utils.toArray('[data-lines]', scope).forEach((container) => {
          gsap.from(container.querySelectorAll('[data-line]'), {
            yPercent: 110,
            rotate: 2.5,
            transformOrigin: '0% 100%',
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.09,
            scrollTrigger: { trigger: container, start: 'top 88%', once: true },
          })
        })

        // 2. Image masks (+ parallax for large images on desktop)
        gsap.utils.toArray('[data-mask]', scope).forEach((wrapper) => {
          const inner = wrapper.querySelector('[data-mask-inner]')
          const parallax =
            Boolean(inner) &&
            isDesktop &&
            !wrapper.hasAttribute('data-no-parallax') &&
            wrapper.offsetHeight >= MIN_PARALLAX_HEIGHT

          const reveal = gsap.timeline({
            scrollTrigger: { trigger: wrapper, start: 'top 86%', once: true },
          })
          reveal.fromTo(
            wrapper,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }
          )
          if (inner) {
            // With parallax the image rests slightly zoomed, so the ±5% drift never exposes an edge.
            reveal.fromTo(inner, { scale: 1.3 }, { scale: parallax ? 1.12 : 1, duration: 1.6, ease: 'power3.out' }, 0)
          }

          if (parallax) {
            gsap.fromTo(
              inner,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
              }
            )
          }
        })

        // 3. Word-by-word scroll-lit paragraphs
        gsap.utils.toArray('[data-scrub]', scope).forEach((paragraph) => {
          gsap.fromTo(
            paragraph.querySelectorAll('[data-word]'),
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.12,
              scrollTrigger: { trigger: paragraph, start: 'top 82%', end: 'bottom 40%', scrub: true },
            }
          )
        })

        // 4. Hero-style background drift + content fade (desktop only)
        if (isDesktop) {
          gsap.utils.toArray('[data-bg-parallax]', scope).forEach((element) => {
            gsap.to(element, {
              yPercent: 18,
              ease: 'none',
              scrollTrigger: { trigger: element.parentElement, start: 'top top', end: 'bottom top', scrub: true },
            })
          })
          gsap.utils.toArray('[data-scroll-fade]', scope).forEach((element) => {
            gsap.to(element, {
              opacity: 0,
              y: -60,
              ease: 'none',
              scrollTrigger: { trigger: element.parentElement, start: 'top top', end: '70% top', scrub: true },
            })
          })
        }

        // 5. Simple fade-up reveals (batched)
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
      },
      scope
    )

    return () => mm.revert()
  }, [scopeRef])
}
