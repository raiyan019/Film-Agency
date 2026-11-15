import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { siteConfig } from '@/data/siteConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const TEXT_FIELDS = 'input, textarea, select'
const INTERACTIVE = 'a[href], button, [role="button"], summary, label[for]'

const RING_SIZE = { default: 40, link: 64, label: 96 }

/**
 * Custom cursor: small accent dot + lagging ring (GSAP quickTo).
 * - Only mounts behaviour on devices with a fine, hovering pointer (never touch).
 * - Disabled for reduced-motion users and via siteConfig.cursor.enabled.
 * - Add data-cursor="View" to any element to show a labelled cursor (used by portfolio cards in Phase 4).
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const enabled = siteConfig.cursor.enabled && !reducedMotion

  useEffect(() => {
    if (!enabled) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    const root = document.documentElement
    const accent = getComputedStyle(root).getPropertyValue('--color-accent').trim() || '#C5FF45'
    const lineColor = getComputedStyle(root).getPropertyValue('--color-fg').trim() || '#E9E6DF'
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current

    let visible = false
    let state = 'default'
    let removeListeners = () => {}

    const ctx = gsap.context(() => {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

      const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' })
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' })

      const setVisible = (show) => {
        if (visible === show) return
        visible = show
        gsap.to([dot, ring], { opacity: show ? 1 : 0, duration: 0.3, overwrite: 'auto' })
      }

      const applyState = (next, text = '') => {
        if (state === next && label.textContent === text) return
        state = next

        if (next === 'field') {
          setVisible(false)
          return
        }
        setVisible(true)

        const size = RING_SIZE[next] ?? RING_SIZE.default
        const isLabel = next === 'label'
        label.textContent = text

        gsap.to(ring, {
          width: size,
          height: size,
          backgroundColor: isLabel ? accent : 'rgba(0,0,0,0)',
          borderColor: isLabel ? accent : lineColor,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        })
        gsap.to(label, { opacity: isLabel ? 1 : 0, duration: 0.25, overwrite: 'auto' })
        gsap.to(dot, { scale: next === 'default' ? 1 : 0, duration: 0.3, overwrite: 'auto' })
      }

      const onMove = (event) => {
        if (event.pointerType && event.pointerType !== 'mouse') return
        dotX(event.clientX)
        dotY(event.clientY)
        ringX(event.clientX)
        ringY(event.clientY)
        if (!visible && state !== 'field') setVisible(true)
      }

      const onOver = (event) => {
        const target = event.target
        if (!(target instanceof Element)) return

        if (target.closest(TEXT_FIELDS)) return applyState('field')

        const labelled = target.closest('[data-cursor]')
        const labelText = labelled?.dataset.cursor
        if (labelText && labelText !== 'link') return applyState('label', labelText)

        if (labelled || target.closest(INTERACTIVE)) return applyState('link')
        return applyState('default')
      }

      const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2, overwrite: 'auto' })
      const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, overwrite: 'auto' })
      const onLeave = () => setVisible(false)
      const onEnter = () => state !== 'field' && setVisible(true)

      root.classList.add('has-custom-cursor')
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      window.addEventListener('pointerup', onUp, { passive: true })
      document.addEventListener('mouseleave', onLeave)
      document.addEventListener('mouseenter', onEnter)

      removeListeners = () => {
        root.classList.remove('has-custom-cursor')
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
        document.removeEventListener('mouseleave', onLeave)
        document.removeEventListener('mouseenter', onEnter)
      }
    })

    return () => {
      removeListeners()
      ctx.revert()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[120]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-fg opacity-0"
      >
        <span
          ref={labelRef}
          className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-base opacity-0"
        />
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 h-2 w-2 rounded-full bg-accent opacity-0" />
    </div>
  )
}
