import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Plus } from 'lucide-react'
import { EASE_CINEMATIC, EASE_OUT_EXPO } from '@/animations/easings'
import Logo from '@/components/common/Logo'
import { useSiteReady } from '@/context/SiteReadyContext'
import MenuOverlay from './MenuOverlay'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Fixed minimal navbar: logo left, MENU + right.
 * - Slides away on scroll down, returns on scroll up (always visible while the menu is open).
 * - Menu: Escape closes, focus moves into the overlay, Tab is trapped, focus returns to the button.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolledAway, setScrolledAway] = useState(false)
  const isReady = useSiteReady()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()

  const scopeRef = useRef(null)
  const toggleRef = useRef(null)
  const wasOpenRef = useRef(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 160) setScrolledAway(true)
    else if (latest < previous) setScrolledAway(false)
  })

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Keyboard handling + focus management while the menu is open.
  useEffect(() => {
    if (!menuOpen) {
      if (wasOpenRef.current) toggleRef.current?.focus()
      wasOpenRef.current = false
      return undefined
    }
    wasOpenRef.current = true

    const focusTimer = setTimeout(() => {
      scopeRef.current?.querySelector('[data-menu-link]')?.focus()
    }, 100)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = [...scopeRef.current.querySelectorAll(FOCUSABLE)]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const hidden = !isReady || (scrolledAway && !menuOpen)

  return (
    <div ref={scopeRef}>
      <motion.header
        initial={{ y: '-100%' }}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
        onFocusCapture={() => setScrolledAway(false)}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(1.25rem,4vw,4rem)] py-4 text-fg mix-blend-difference"
      >
        <Logo onClick={closeMenu} className="py-2" />

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="-mr-3 flex min-h-11 items-center gap-2 px-3 text-sm font-medium uppercase tracking-[0.14em]"
        >
          <span className="relative block h-[1.25em] w-[3.6em] overflow-hidden text-right">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'menu'}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="block"
              >
                {menuOpen ? 'Close' : 'Menu'}
              </motion.span>
            </AnimatePresence>
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: menuOpen ? 45 : 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="flex"
          >
            <Plus size={16} strokeWidth={1.75} />
          </motion.span>
        </button>
      </motion.header>

      <AnimatePresence>{menuOpen && <MenuOverlay onNavigate={closeMenu} />}</AnimatePresence>
    </div>
  )
}
