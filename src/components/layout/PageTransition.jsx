import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from '@/animations/gsap'
import { EASE_CINEMATIC } from '@/animations/easings'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/*
 * Route transition (Framer Motion):
 *   exit  → content fades while a curtain rises from the bottom
 *   swap  → scroll resets to top while the curtain fully covers the screen
 *   enter → curtain retracts upward, new content fades in
 * The outer wrapper has no visual styles; it only propagates the variant names.
 * The curtain is a sibling of the content so it doesn't fade out with it.
 */
const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, delay: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
}

const curtainVariants = {
  initial: { scaleY: 1, originY: 0 },
  animate: {
    scaleY: 0,
    originY: 0,
    transition: { duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC },
  },
  exit: {
    scaleY: 1,
    originY: 1,
    // Origin must jump instantly (while scaleY is 0 and invisible), only scale is tweened.
    transition: { originY: { duration: 0 }, scaleY: { duration: 0.55, ease: EASE_CINEMATIC } },
  },
}

export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const reducedMotion = useReducedMotion()

  // Reduced motion: no animation, just reset scroll on navigation.
  useEffect(() => {
    if (reducedMotion) window.scrollTo(0, 0)
  }, [pathname, reducedMotion])

  if (reducedMotion) return <div>{children}</div>

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div key={pathname} initial="initial" animate="animate" exit="exit">
        <motion.div
          variants={contentVariants}
          onAnimationComplete={(definition) => {
            // Layout is final once the page has faded in: re-measure scroll-driven animations.
            if (definition === 'animate') ScrollTrigger.refresh()
          }}
        >
          {children}
        </motion.div>
        <motion.div
          aria-hidden="true"
          variants={curtainVariants}
          className="pointer-events-none fixed inset-0 z-[90] bg-surface"
        />
      </motion.div>
    </AnimatePresence>
  )
}
