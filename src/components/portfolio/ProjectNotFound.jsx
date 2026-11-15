import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'
import { ClapperIcon, ViewfinderFrame } from '@/components/common/FilmSymbols'
import { projects } from '@/data/projects'

/** Shown by /work/:slug when the slug doesn't match any project. */
export default function ProjectNotFound({ slug }) {
  return (
    <section className="relative flex min-h-svh flex-col justify-end pb-16 pt-40">
      <ViewfinderFrame inset="1.25rem" />
      <div className="container-frame">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <ClapperIcon size={18} className="text-accent" />
          Error 404 / Project
        </p>
        <h1 className="text-display uppercase">
          Cut.
          <br />
          Not in the archive.
        </h1>
        <p className="mt-8 max-w-lg text-muted">
          We couldn’t find a project at <code className="text-fg">/work/{slug}</code>. It may have been renamed or removed.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button to="/work">Browse all work</Button>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {projects.slice(0, 3).map((project) => (
              <li key={project.id}>
                <Link to={`/work/${project.slug}`} className="link-underline hover:text-fg">
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
