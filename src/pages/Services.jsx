import { useRef } from 'react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import Button from '@/components/common/Button'
import MediaImage from '@/components/common/MediaImage'
import PageHeader from '@/components/common/PageHeader'
import { ViewfinderFrame } from '@/components/common/FilmSymbols'
import ContactCTA from '@/components/home/ContactCTA'
import ProcessSection from '@/components/home/ProcessSection'
import { services } from '@/data/services'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useHashScroll } from '@/hooks/useHashScroll'

export default function Services() {
  const rootRef = useRef(null)

  useDocumentMeta({
    title: 'Services',
    description: 'Film production, commercials, documentaries, music videos, creative direction and post-production.',
  })
  useScrollReveal(rootRef)
  useHashScroll()

  return (
    <div ref={rootRef}>
      <PageHeader
        scene={1}
        eyebrow="Services"
        lines={['What we', 'do.']}
        intro="Six disciplines, one crew. Work with us on a single service or bring us in from first idea to final master."
      />

      {services.map((service, index) => {
        const imageRight = index % 2 === 1
        return (
          <section
            key={service.id}
            id={service.slug}
            aria-labelledby={`${service.id}-title`}
            className="section-space scroll-mt-20 border-t border-line"
          >
            <div className="container-frame grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className={imageRight ? 'lg:col-span-6 lg:col-start-7 lg:row-start-1' : 'lg:col-span-6'}>
                <div data-mask className="relative aspect-[4/3] overflow-hidden bg-card">
                  <div data-mask-inner className="absolute inset-0">
                    <MediaImage src={service.image} seed={`service-${service.slug}`} alt={`${service.title} still`} />
                  </div>
                  <ViewfinderFrame inset="1rem" />
                </div>
              </div>

              <div className={imageRight ? 'lg:col-span-5 lg:col-start-1 lg:row-start-1' : 'lg:col-span-5 lg:col-start-8'}>
                <p data-reveal className="eyebrow mb-4 tabular-nums">
                  <span className="text-accent">{service.number}</span> / 06
                </p>
                <h2 id={`${service.id}-title`} data-reveal className="text-title uppercase">
                  {service.title}
                </h2>
                <p data-reveal className="mt-6 text-lg text-muted">
                  {service.description}
                </p>
                <ul data-reveal className="mt-8 border-t border-line">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3 border-b border-line py-3 text-sm">
                      <span aria-hidden="true" className="size-1.5 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div data-reveal className="mt-8">
                  <Button to={`/contact?service=${service.slug}`} variant="outline">
                    Enquire about this
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <ProcessSection />
      <ContactCTA />
    </div>
  )
}
