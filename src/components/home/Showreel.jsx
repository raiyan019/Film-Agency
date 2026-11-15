import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import MediaImage from '@/components/common/MediaImage'
import { ViewfinderFrame } from '@/components/common/FilmSymbols'
import { homeContent } from '@/data/home'
import ShowreelModal from './ShowreelModal'

export default function Showreel() {
  const { showreel } = homeContent
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  return (
    <section aria-label="Showreel" className="relative">
      <div className="relative h-[75svh] min-h-[28rem] w-full overflow-hidden bg-card" data-mask>
        <div data-mask-inner className="absolute inset-0">
          <MediaImage src={showreel.poster} seed="showreel" alt="" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-base/45" />
        <ViewfinderFrame inset="1.25rem" crosshair />

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          data-cursor="Play"
          className="group absolute inset-0 flex flex-col items-center justify-center gap-6"
        >
          <span className="flex size-24 items-center justify-center rounded-full border border-fg/70 transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-base group-focus-visible:bg-accent group-focus-visible:text-base sm:size-28">
            <Play size={30} aria-hidden="true" fill="currentColor" className="translate-x-0.5" />
          </span>
          <span className="eyebrow !text-fg">
            Play {showreel.title} <span className="text-fg/60">· {showreel.duration}</span>
          </span>
        </button>

        <p aria-hidden="true" className="eyebrow absolute bottom-6 left-6 hidden text-fg/70 sm:block sm:left-10">
          Reel / 2026
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <ShowreelModal
            title={showreel.title}
            video={showreel.video}
            poster={showreel.poster}
            returnFocusRef={triggerRef}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
