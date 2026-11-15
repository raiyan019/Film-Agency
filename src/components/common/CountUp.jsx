import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Number that counts up once when scrolled into view (GSAP + ScrollTrigger). Static for reduced motion. */
export default function CountUp({ value, prefix = '', suffix = '', duration = 2, className = '' }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const render = (number) => {
      element.textContent = `${prefix}${number}${suffix}`
    }

    if (reducedMotion) {
      render(value)
      return undefined
    }

    render(0)
    const counter = { number: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        number: value,
        duration,
        ease: 'power2.out',
        snap: { number: 1 },
        onUpdate: () => render(counter.number),
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
      })
    })

    return () => ctx.revert()
  }, [value, prefix, suffix, duration, reducedMotion])

  return <span ref={ref} className={`tabular-nums ${className}`} aria-label={`${prefix}${value}${suffix}`} />
}
