import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the element matching the URL hash (e.g. /services#documentary) after the page mounts.
 * Runs slightly after the page transition resets scroll. Give targets `scroll-mt-24` so the fixed navbar doesn't cover them.
 */
export function useHashScroll() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return undefined
    const id = decodeURIComponent(hash.slice(1))
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    }, 300)
    return () => clearTimeout(timer)
  }, [hash, pathname])
}
