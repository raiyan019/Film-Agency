import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useScrollReveal } from '@/animations/useScrollReveal'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import { SceneLabel, ViewfinderFrame } from '@/components/common/FilmSymbols'
import NextProject from '@/components/portfolio/NextProject'
import ProjectGallery from '@/components/portfolio/ProjectGallery'
import ProjectNotFound from '@/components/portfolio/ProjectNotFound'
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects'
import { siteConfig } from '@/data/siteConfig'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

/** Full film player, only rendered when real media is enabled and the file actually loads. */
function ProjectVideo({ project }) {
  const [failed, setFailed] = useState(false)
  if (siteConfig.media.usePlaceholders || !project.video || failed) return null

  return (
    <div data-reveal className="mt-14 aspect-video overflow-hidden bg-card">
      <video
        className="h-full w-full"
        src={project.video}
        poster={project.thumbnail}
        controls
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      >
        <track kind="captions" />
      </video>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const rootRef = useRef(null)

  // Hooks run before the early return so their order never changes between renders.
  useDocumentMeta({
    title: project ? project.title : 'Project not found',
    description: project?.description,
  })
  useScrollReveal(rootRef)

  if (!project) return <ProjectNotFound slug={slug} />

  const { previous, next } = getAdjacentProjects(project.slug)
  const facts = [
    { label: 'Client', value: project.client },
    { label: 'Year', value: project.year },
    { label: 'Category', value: project.category },
  ]

  return (
    <div ref={rootRef}>
      {/* Hero */}
      <section className="relative isolate flex min-h-[85svh] flex-col justify-end overflow-hidden pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <MediaImage src={project.thumbnail} seed={project.slug} alt="" loading="eager" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-base/50" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-base to-transparent" />
        <ViewfinderFrame inset="1.25rem" />

        <div className="container-frame pb-14 sm:pb-20">
          <p className="eyebrow flex flex-wrap items-center gap-x-6 gap-y-2 text-fg/80">
            <span className="text-accent">{project.category}</span>
            <span>{project.year}</span>
            <span>{project.client}</span>
          </p>
          <HeadingLines as="h1" lines={[project.title]} className="text-display mt-6 uppercase" />
        </div>
      </section>

      {/* Overview */}
      <section className="section-space" aria-label="Project overview">
        <div className="container-frame grid gap-14 lg:grid-cols-12 lg:gap-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:sticky lg:top-28 lg:col-span-4 lg:block lg:space-y-8 lg:self-start">
            {facts.map((fact) => (
              <div key={fact.label} data-reveal>
                <dt className="eyebrow mb-2">{fact.label}</dt>
                <dd className="text-lg">{fact.value}</dd>
              </div>
            ))}
            <div data-reveal className="col-span-2">
              <dt className="eyebrow mb-3">Services</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <li key={service} className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.12em]">
                      {service}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="lg:col-span-7 lg:col-start-6">
            <SceneLabel scene={1}>Synopsis</SceneLabel>
            <p data-reveal className="mt-8 font-display text-2xl leading-snug tracking-tight sm:text-3xl lg:text-4xl">
              {project.description}
            </p>
            <ProjectVideo project={project} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24 sm:pb-32" aria-label="Project gallery">
        <div className="container-frame">
          <SceneLabel scene={2} className="mb-10">Stills</SceneLabel>
          <ProjectGallery project={project} />
        </div>
      </section>

      {/* Credits */}
      <section className="section-space bg-surface" aria-label="Credits">
        <div className="container-frame">
          <SceneLabel scene={3}>Credits</SceneLabel>
          <HeadingLines lines={['Cast &', 'Crew']} className="text-title mt-8 uppercase" />
          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {project.credits.map((credit) => (
              <div key={`${credit.role}-${credit.name}`} data-reveal className="border-t border-line py-5">
                <dt className="eyebrow mb-2">{credit.role}</dt>
                <dd className="text-lg">{credit.name}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <NextProject next={next} previous={previous} />
    </div>
  )
}
