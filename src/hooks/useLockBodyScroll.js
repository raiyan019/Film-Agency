import { useEffect } from 'react'

// Reference-counted so the preloader and the menu can never unlock each other by accident.
let lockCount = 0

/** Locks page scroll while `locked` is true. (html has scrollbar-gutter: stable, so no layout shift.) */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined

    lockCount += 1
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      lockCount -= 1
      if (lockCount === 0) {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
      }
    }
  }, [locked])
}
