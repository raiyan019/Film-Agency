import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import MediaImage from '@/components/common/MediaImage'
import { ViewfinderFrame } from '@/components/common/FilmSymbols'
import { siteConfig } from '@/data/siteConfig'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/** Optional looping video preview, only loaded on desktop hover (preload="none"). */
function HoverPreview({ src, active }) {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [active])

  if (failed) return null

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

/**
 * Portfolio card used on the homepage and the Work page.
 * `aspect` is a Tailwind aspect class, so layouts can crop cards differently for an asymmetric grid.
 */
export default function ProjectCard({ project, aspect = 'aspect-[4/5]', className = '' }) {
  const [hovered, setHovered] = useState(false)
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const showPreview = canHover && project.video && !siteConfig.media.usePlaceholders

  return (
    <article className={className}>
      <Link
        to={`/work/${project.slug}`}
        data-cursor="View"
        className="group block"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div data-mask className={`relative overflow-hidden bg-card ${aspect}`}>
          <div data-mask-inner className="absolute inset-0">
            <div className="h-full w-full transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]">
              <MediaImage
                src={project.thumbnail}
                seed={project.slug}
                alt={`${project.title}: ${project.category} for ${project.client}`}
              />
            </div>
          </div>
          {showPreview && <HoverPreview src={project.video} active={hovered} />}
          <ViewfinderFrame
            inset="1rem"
            className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        </div>

        <div data-reveal className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
          <div>
            <h3 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
              <ArrowUpRight
                size={22}
                aria-hidden="true"
                className="-translate-x-2 text-accent opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              />
            </h3>
            <p className="eyebrow mt-2">
              {project.category} — {project.client}
            </p>
          </div>
          <p className="eyebrow pt-2 tabular-nums">{project.year}</p>
        </div>
      </Link>
    </article>
  )
}
