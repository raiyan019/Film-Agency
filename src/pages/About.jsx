import { useRef } from 'react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import CountUp from '@/components/common/CountUp'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import PageHeader from '@/components/common/PageHeader'
import { SceneLabel } from '@/components/common/FilmSymbols'
import ContactCTA from '@/components/home/ContactCTA'
import { aboutContent } from '@/data/about'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function About() {
  const rootRef = useRef(null)
  const { header, studio, philosophy, stats, history, approach } = aboutContent

  useDocumentMeta({ title: 'About', description: header.intro })
  useScrollReveal(rootRef)

  return (
    <div ref={rootRef}>
      <PageHeader scene={1} {...header} />

      {/* Studio introduction */}
      <section className="container-frame grid gap-12 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-10" aria-label="The studio">
        <div className="lg:col-span-7">
          <div data-mask className="relative aspect-[16/11] overflow-hidden bg-card">
            <div data-mask-inner className="absolute inset-0">
              <MediaImage src={studio.image} seed="about-studio" alt={studio.imageAlt} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end">
          {studio.paragraphs.map((paragraph, index) => (
            <p key={paragraph} data-reveal className={index === 0 ? 'text-xl leading-relaxed sm:text-2xl' : 'text-muted'}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-space bg-surface" aria-label="Philosophy">
        <div className="container-frame">
          <SceneLabel scene={2}>{philosophy.eyebrow}</SceneLabel>
          <HeadingLines lines={philosophy.lines} className="text-display mt-8 uppercase" />
          <ol className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-24">
            {philosophy.principles.map((principle) => (
              <li key={principle.number} data-reveal className="border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl font-bold tracking-tight text-transparent"
                  style={{ WebkitTextStroke: '1px var(--color-muted)' }}
                >
                  {principle.number}
                </span>
                <h3 className="text-title mt-6 uppercase">{principle.title}</h3>
                <p className="mt-4 text-muted">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-space" aria-label="Studio statistics">
        <div className="container-frame">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col border-t border-line pt-6">
                <dd className="order-1 font-display text-[clamp(3.25rem,9vw,8rem)] font-bold leading-none tracking-[-0.05em]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="eyebrow order-2 mt-4">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* History */}
      <section className="section-space bg-surface" aria-label="History">
        <div className="container-frame">
          <SceneLabel scene={3}>{history.eyebrow}</SceneLabel>
          <HeadingLines lines={history.lines} className="text-display mt-8 uppercase" />
          <ol className="mt-16 lg:mt-24">
            {history.milestones.map((milestone) => (
              <li
                key={milestone.year}
                data-reveal
                className="grid gap-3 border-t border-line py-8 last:border-b lg:grid-cols-12 lg:gap-8 lg:py-10"
              >
                <span className="font-display text-4xl font-bold tracking-tight text-accent lg:col-span-3">{milestone.year}</span>
                <h3 className="text-title uppercase lg:col-span-4">{milestone.title}</h3>
                <p className="max-w-md text-muted lg:col-span-5">{milestone.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Creative approach */}
      <section className="section-space" aria-label="Creative approach">
        <div className="container-frame">
          <SceneLabel scene={4}>{approach.eyebrow}</SceneLabel>
          <HeadingLines lines={approach.lines} className="text-display mt-8 uppercase" />
          <div className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-24">
            {approach.items.map((item) => (
              <div key={item.title} data-reveal className="border-t border-line pt-6">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
