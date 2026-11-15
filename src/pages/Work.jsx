import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/animations/easings'
import { ScrollTrigger } from '@/animations/gsap'
import { useScrollReveal } from '@/animations/useScrollReveal'
import CategoryFilter from '@/components/common/CategoryFilter'
import HeadingLines from '@/components/common/HeadingLines'
import { SceneLabel } from '@/components/common/FilmSymbols'
import ContactCTA from '@/components/home/ContactCTA'
import ProjectCard from '@/components/portfolio/ProjectCard'
import { projectCategories, projects } from '@/data/projects'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

// Asymmetric rhythm that repeats every four cards, whatever the current filter shows.
const LAYOUT = [
  { column: 'md:col-span-7', aspect: 'aspect-[16/10]' },
  { column: 'md:col-span-5 md:mt-32', aspect: 'aspect-[4/5]' },
  { column: 'md:col-span-5', aspect: 'aspect-[4/5]' },
  { column: 'md:col-span-7 md:mt-24', aspect: 'aspect-[16/10]' },
]

const toSlug = (text) => text.toLowerCase().replace(/\s+/g, '-')
const pad = (number) => String(number).padStart(2, '0')

export default function Work() {
  const rootRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useDocumentMeta({
    title: 'Work',
    description: 'Selected films, commercials, documentaries and music videos from the studio.',
  })
  useScrollReveal(rootRef)

  // The active filter lives in the URL (?category=documentary) so filtered views can be shared and survive refresh.
  const categoryParam = searchParams.get('category')
  const active = projectCategories.find((category) => category !== 'All' && toSlug(category) === categoryParam) ?? 'All'

  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectCategories.map((category) => [
          category,
          category === 'All' ? projects.length : projects.filter((project) => project.category === category).length,
        ])
      ),
    []
  )

  const visibleProjects = useMemo(
    () => (active === 'All' ? projects : projects.filter((project) => project.category === active)),
    [active]
  )

  const handleFilterChange = (category) => {
    const next = new URLSearchParams(searchParams)
    if (category === 'All') next.delete('category')
    else next.set('category', toSlug(category))
    setSearchParams(next, { replace: true, preventScrollReset: true })
  }

  // Cards move when the filter changes, so re-measure scroll-triggered reveals once the layout animation settles.
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 900)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <div ref={rootRef}>
      <section className="container-frame pb-12 pt-36 sm:pt-44">
        <SceneLabel scene={1}>Portfolio</SceneLabel>
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <HeadingLines as="h1" lines={['Our', 'Work']} className="text-hero uppercase" accentPunctuation />
          <p data-reveal className="max-w-sm text-muted lg:pb-4">
            Commercials, documentaries, music videos and brand films, shot and finished in-house.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter
            categories={projectCategories}
            active={active}
            counts={counts}
            onChange={handleFilterChange}
            label="Filter projects by category"
          />
          <p className="eyebrow tabular-nums" aria-hidden="true">
            {pad(visibleProjects.length)} / {pad(projects.length)} projects
          </p>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visibleProjects.length} {active === 'All' ? '' : `${active} `}
          {visibleProjects.length === 1 ? 'project' : 'projects'}
        </p>
      </section>

      <section className="container-frame pb-24 sm:pb-32" aria-label="Projects">
        {visibleProjects.length === 0 ? (
          <p className="py-24 text-muted">No projects in this category yet.</p>
        ) : (
          <ul className="relative grid gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-12">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => {
                const slot = LAYOUT[index % LAYOUT.length]
                return (
                  <motion.li
                    key={project.id}
                    layout="position"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.05 }}
                    className={slot.column}
                  >
                    <ProjectCard project={project} aspect={slot.aspect} />
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>
        )}
      </section>

      <ContactCTA />
    </div>
  )
}
