import Button from '@/components/common/Button'
import HeadingLines from '@/components/common/HeadingLines'
import { SceneLabel } from '@/components/common/FilmSymbols'
import ProjectCard from '@/components/portfolio/ProjectCard'
import { homeContent } from '@/data/home'
import { featuredProjects } from '@/data/projects'

// Asymmetric 12-column layout. Each entry crops and offsets one card on desktop; mobile is a single column.
const LAYOUT = [
  { column: 'md:col-span-7', aspect: 'aspect-[16/10]' },
  { column: 'md:col-span-5 md:mt-40', aspect: 'aspect-[4/5]' },
  { column: 'md:col-span-5 md:-mt-8', aspect: 'aspect-[4/5]' },
  { column: 'md:col-span-7 md:mt-28', aspect: 'aspect-[16/10]' },
  { column: 'md:col-span-8', aspect: 'aspect-[16/9]' },
  { column: 'md:col-span-4 md:mt-32', aspect: 'aspect-[3/4]' },
]

export default function SelectedWorks() {
  const { works } = homeContent
  const projects = featuredProjects.slice(0, LAYOUT.length)

  return (
    <section id="work" className="section-space bg-surface" aria-label={works.title}>
      <div className="container-frame">
        <div className="mb-16 flex flex-col gap-8 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SceneLabel scene={2}>{works.eyebrow}</SceneLabel>
            <HeadingLines lines={['Selected', 'Works']} className="text-display mt-8 uppercase" />
          </div>
          <div data-reveal>
            <Button to={works.cta.to} variant="outline">{works.cta.label}</Button>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              aspect={LAYOUT[index].aspect}
              className={LAYOUT[index].column}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
