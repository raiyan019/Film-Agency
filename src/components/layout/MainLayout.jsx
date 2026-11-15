import { Suspense, useCallback, useState } from 'react'
import { useOutlet } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { SiteReadyProvider } from '@/context/SiteReadyContext'
import { siteConfig } from '@/data/siteConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Cursor from './Cursor'
import Footer from './Footer'
import Navbar from './Navbar'
import PageTransition from './PageTransition'
import Preloader from './Preloader'

const SEEN_KEY = 'frame:preloader-seen'

const hasSeenPreloader = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

const markPreloaderSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* storage unavailable (private mode): the preloader simply shows again next time */
  }
}

/** Shared shell for every route: preloader, navbar/menu, animated page content, footer, cursor. */
export default function MainLayout() {
  const outlet = useOutlet()
  const reducedMotion = useReducedMotion()
  const { enabled, oncePerSession } = siteConfig.preloader

  const [preloaderActive, setPreloaderActive] = useState(
    () => enabled && !reducedMotion && !(oncePerSession && hasSeenPreloader())
  )

  const handlePreloaderComplete = useCallback(() => {
    markPreloaderSeen()
    setPreloaderActive(false)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <SiteReadyProvider value={{ isReady: !preloaderActive }}>
        <a href="#main" className="sr-only-focusable">
          Skip to content
        </a>

        <Navbar />

        <PageTransition>
          <main id="main" tabIndex={-1} className="outline-none">
            {/* Suspense lives here (not in App) so the navbar never unmounts while a lazy page loads. */}
            <Suspense fallback={<div className="min-h-svh" aria-hidden="true" />}>{outlet}</Suspense>
          </main>
          <Footer />
        </PageTransition>

        <Cursor />
        {preloaderActive && <Preloader onComplete={handlePreloaderComplete} />}
      </SiteReadyProvider>
    </MotionConfig>
  )
}
