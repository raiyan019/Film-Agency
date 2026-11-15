import { useId, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import Button from '@/components/common/Button'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import PageHeader from '@/components/common/PageHeader'
import { SceneLabel } from '@/components/common/FilmSymbols'
import { careersContent } from '@/data/careers'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const applyLink = (subject) =>
  `mailto:${careersContent.applyEmail}?subject=${encodeURIComponent(subject)}`

/** One open role: an accessible disclosure (button + region). Closed content is `inert`, so it can't be tabbed to. */
function PositionRow({ position }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <li data-reveal className="border-t border-line last:border-b">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[2fr_1fr_1.2fr_auto] sm:py-8"
      >
        <span>
          <span className="block font-display text-xl font-semibold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-3xl">
            {position.title}
          </span>
          <span className="eyebrow mt-2 block sm:hidden">
            {position.department} · {position.type}
          </span>
        </span>
        <span className="eyebrow hidden sm:block">{position.department}</span>
        <span className="eyebrow hidden sm:block">
          {position.location} · {position.type}
        </span>
        <Plus
          aria-hidden="true"
          size={22}
          className={`text-accent transition-transform duration-500 ease-out-expo ${open ? 'rotate-45' : ''}`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-label={`${position.title} details`}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-8 pb-10 lg:grid-cols-12">
            <p className="max-w-lg text-muted lg:col-span-5 lg:col-start-1">{position.description}</p>
            <ul className="space-y-2 text-sm lg:col-span-4 lg:col-start-7">
              {position.responsibilities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="lg:col-span-2 lg:col-start-11">
              <Button href={applyLink(`Application: ${position.title}`)} variant="outline">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Careers() {
  const rootRef = useRef(null)
  const { header, culture, benefits, positions, openApplication } = careersContent

  useDocumentMeta({ title: 'Careers', description: header.intro })
  useScrollReveal(rootRef)

  return (
    <div ref={rootRef}>
      <PageHeader scene={1} {...header} />

      {/* Culture */}
      <section className="container-frame grid gap-12 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-10" aria-label="Culture">
        <div className="lg:col-span-6">
          <div data-mask className="relative aspect-[4/3] overflow-hidden bg-card">
            <div data-mask-inner className="absolute inset-0">
              <MediaImage src={culture.image} seed="careers-culture" alt={culture.imageAlt} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <SceneLabel scene={2}>{culture.eyebrow}</SceneLabel>
          <HeadingLines lines={culture.lines} className="text-title mt-6 uppercase" />
          <p data-reveal className="mt-6 text-lg text-muted">{culture.text}</p>
          <ul className="mt-10 border-t border-line">
            {culture.values.map((value) => (
              <li key={value.title} data-reveal className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                <span className="font-display text-lg font-semibold">{value.title}</span>
                <span className="text-sm text-muted">{value.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-space bg-surface" aria-label="Benefits">
        <div className="container-frame">
          <SceneLabel scene={3}>Benefits</SceneLabel>
          <HeadingLines lines={['Looked', 'after.']} className="text-display mt-8 uppercase" />
          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <li key={benefit.title} data-reveal className="border-t border-line pt-6">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{benefit.title}</h3>
                <p className="mt-3 text-muted">{benefit.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open positions */}
      <section id="positions" className="section-space scroll-mt-20" aria-label="Open positions">
        <div className="container-frame">
          <SceneLabel scene={4}>Open positions</SceneLabel>
          <HeadingLines lines={['Open', 'roles.']} className="text-display mt-8 uppercase" />
          <ul className="mt-16 lg:mt-24">
            {positions.map((position) => (
              <PositionRow key={position.id} position={position} />
            ))}
          </ul>
        </div>
      </section>

      {/* Application CTA */}
      <section className="section-space bg-surface" aria-label="Open application">
        <div className="container-frame">
          <HeadingLines lines={openApplication.lines} accentPunctuation className="text-display uppercase" />
          <p data-reveal className="mt-8 max-w-md text-muted">{openApplication.text}</p>
          <div data-reveal className="mt-10">
            <Button href={applyLink('Open application')}>Send your portfolio</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
