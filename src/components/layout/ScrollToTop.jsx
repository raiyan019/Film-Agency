import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets scroll position on route change (ignores hash links). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
