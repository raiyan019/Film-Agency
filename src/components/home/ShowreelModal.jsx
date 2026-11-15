import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { EASE_CINEMATIC } from '@/animations/easings'
import MediaImage from '@/components/common/MediaImage'
import { siteConfig } from '@/data/siteConfig'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'

/**
 * Accessible modal video player (Framer Motion for the transitions).
 * Escape / backdrop / close button all close it, focus is trapped while open and returned to the trigger on close.
 * It never pretends to play a video that isn't there: if the file is missing it says so.
 */
export default function ShowreelModal({ title, video, poster, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const unavailable = siteConfig.media.usePlaceholders || failed

  useLockBodyScroll(true)

  useEffect(() => {
    const returnTarget = returnFocusRef?.current
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
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
      document.removeEventListener('keydown', onKeyDown)
      returnTarget?.focus()
    }
  }, [onClose, returnFocusRef])

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-base/95 p-4 sm:p-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close showreel"
          className="mb-4 ml-auto flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-[0.14em]"
        >
          Close <X size={18} aria-hidden="true" />
        </button>

        <div className="relative aspect-video overflow-hidden bg-card">
          {unavailable ? (
            <>
              <MediaImage src={poster} seed="showreel" alt="" />
              <div className="absolute inset-0 flex items-center justify-center bg-base/70 p-6 text-center">
                <p className="max-w-md text-sm text-fg/90 sm:text-base">
                  Demo mode: no showreel file is connected yet. Add your video at{' '}
                  <code className="text-accent">public{video}</code> and set{' '}
                  <code className="text-accent">media.usePlaceholders</code> to <code>false</code> in siteConfig.js.
                </p>
              </div>
            </>
          ) : (
            <video
              className="h-full w-full"
              src={video}
              poster={poster}
              controls
              autoPlay
              playsInline
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
