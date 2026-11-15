import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import MediaImage from '@/components/common/MediaImage'

/** Previous / all-work bar plus a large "next project" banner. Both come from getAdjacentProjects(). */
export default function NextProject({ next, previous }) {
  if (!next) return null

  return (
    <nav aria-label="Project navigation" className="border-t border-line">
      <div className="container-frame flex items-center justify-between gap-6 border-b border-line py-2 text-xs font-medium uppercase tracking-[0.14em]">
        {previous && previous.slug !== next.slug ? (
          <Link to={`/work/${previous.slug}`} className="group flex min-h-11 items-center gap-2 text-muted hover:text-fg">
            <ArrowLeft size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="sr-only">Previous project: </span>
            <span className="truncate">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link to="/work" className="flex min-h-11 items-center text-muted hover:text-fg">
          All work
        </Link>
      </div>

      <Link to={`/work/${next.slug}`} data-cursor="Next" className="group relative block overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-30 group-focus-visible:opacity-30"
        >
          <MediaImage src={next.thumbnail} seed={next.slug} alt="" />
        </div>

        <div className="container-frame relative py-20 sm:py-28 lg:py-36">
          <p className="eyebrow mb-6 flex flex-wrap items-center gap-x-4">
            <span>Next project</span>
            <span className="text-fg">
              {next.category} · {next.year}
            </span>
          </p>
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-display uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-3 sm:group-hover:translate-x-6">
              {next.title}
            </h2>
            <ArrowRight
              aria-hidden="true"
              className="mb-2 hidden size-10 shrink-0 text-accent opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-2 group-hover:opacity-100 sm:block lg:size-16"
            />
          </div>
        </div>
      </Link>
    </nav>
  )
}
