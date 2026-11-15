import { useRef } from 'react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import Button from '@/components/common/Button'
import MediaImage from '@/components/common/MediaImage'
import PageHeader from '@/components/common/PageHeader'
import { team } from '@/data/team'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useHashScroll } from '@/hooks/useHashScroll'

const OFFSETS = ['', 'lg:mt-20', 'lg:mt-10']

export default function Team() {
  const rootRef = useRef(null)

  useDocumentMeta({ title: 'Team', description: 'Meet the directors, cinematographers, producers and editors behind the studio.' })
  useScrollReveal(rootRef)
  useHashScroll()

  return (
    <div ref={rootRef}>
      <PageHeader
        scene={1}
        eyebrow="Team"
        lines={['The', 'crew.']}
        intro="A small, senior team of directors, cinematographers, producers and editors who work on every project together."
      />

      <section className="container-frame pb-24 sm:pb-32" aria-label="Team members">
        <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <li key={member.id} id={member.slug} className={`scroll-mt-28 ${OFFSETS[index % OFFSETS.length]}`}>
              <div data-mask className="group relative aspect-[3/4] overflow-hidden bg-card">
                <div data-mask-inner className="absolute inset-0">
                  <div className="h-full w-full grayscale transition-all duration-[1200ms] ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0">
                    <MediaImage
                      src={member.image}
                      seed={member.slug}
                      variant="portrait"
                      alt={`Portrait of ${member.name}, ${member.role}`}
                    />
                  </div>
                </div>
              </div>

              <div data-reveal className="mt-5">
                <h2 className="font-display text-2xl font-semibold tracking-tight">{member.name}</h2>
                <p className="eyebrow mt-2 text-accent">{member.role}</p>
                <p className="mt-4 text-sm text-muted">{member.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {member.social.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                        {link.label}
                        <span className="sr-only"> for {member.name} (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-space bg-surface" aria-label="Careers">
        <div className="container-frame flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 data-reveal className="text-title max-w-xl uppercase">Want to work with us?</h2>
          <div data-reveal>
            <Button to="/careers">See open roles</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
