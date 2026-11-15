import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EASE_CINEMATIC, EASE_OUT_EXPO } from '@/animations/easings'
import { siteConfig } from '@/data/siteConfig'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const overlayVariants = {
  closed: {
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: { duration: 0.7, ease: EASE_CINEMATIC, when: 'afterChildren' },
  },
  open: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.8, ease: EASE_CINEMATIC },
  },
}

const reducedOverlayVariants = {
  closed: { opacity: 0, transition: { duration: 0.15 } },
  open: { opacity: 1, transition: { duration: 0.15 } },
}

const listVariants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
}

const lineVariants = {
  closed: { y: '110%', transition: { duration: 0.4, ease: EASE_CINEMATIC } },
  open: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
}

const asideVariants = {
  closed: { opacity: 0, y: 24, transition: { duration: 0.25 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.7, ease: EASE_OUT_EXPO } },
}

const isActivePath = (pathname, path) =>
  path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)

/** Fullscreen navigation overlay. Mount/unmount is controlled by <AnimatePresence> in Navbar. */
export default function MenuOverlay({ onNavigate }) {
  const { pathname } = useLocation()
  const reducedMotion = useReducedMotion()
  const { navigation, contact, social, name, trademark } = siteConfig

  useLockBodyScroll(true)

  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      variants={reducedMotion ? reducedOverlayVariants : overlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto overflow-x-hidden bg-base text-fg"
    >
      {/* Background treatment: hairline column grid + ghost outlined wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid grid-cols-4 px-[clamp(1.25rem,4vw,4rem)]"
      >
        {[0, 1, 2, 3].map((column) => (
          <span key={column} className="border-l border-line/50 last:border-r" />
        ))}
      </div>
      <p
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -bottom-[0.12em] left-0 select-none whitespace-nowrap font-display text-[26vw] font-bold uppercase leading-none tracking-[-0.06em]"
      >
        {name}
        {trademark}
      </p>

      <div className="container-frame relative flex flex-1 flex-col justify-between gap-12 pb-10 pt-28 lg:flex-row lg:items-end">
        <motion.nav aria-label="Primary" variants={listVariants} className="group/menu">
          <ul>
            {navigation.map((item, index) => {
              const active = isActivePath(pathname, item.path)
              return (
                <li key={item.path} className="overflow-hidden py-[0.03em]">
                  <motion.div variants={lineVariants}>
                    <Link
                      to={item.path}
                      data-menu-link
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className="group/link flex items-baseline gap-4 font-display text-menu uppercase transition-opacity duration-300 group-hover/menu:opacity-30 hover:opacity-100 focus-visible:opacity-100"
                    >
                      <span
                        className={`eyebrow w-8 shrink-0 tabular-nums ${active ? '!text-accent' : ''}`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="transition-transform duration-500 ease-out-expo group-hover/link:translate-x-3">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                </li>
              )
            })}
          </ul>
        </motion.nav>

        <motion.aside
          variants={asideVariants}
          aria-label="Contact and social"
          className="grid w-full max-w-sm gap-10 sm:grid-cols-2 lg:block lg:w-72 lg:space-y-10"
        >
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <address className="space-y-1 text-sm not-italic leading-relaxed">
              <a href={`mailto:${contact.email}`} className="link-underline block w-fit">
                {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="block w-fit text-muted">
                {contact.phone}
              </a>
              <p className="pt-3 text-muted">{contact.location}</p>
            </address>
          </div>

          <div>
            <p className="eyebrow mb-4">Follow</p>
            <ul className="space-y-1 text-sm">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social inline-flex items-center gap-1"
                  >
                    <span className="link-underline">{item.label}</span>
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  )
}
