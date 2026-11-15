import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import { SceneLabel, ViewfinderFrame } from '@/components/common/FilmSymbols'
import { homeContent } from '@/data/home'
import { services } from '@/data/services'

/**
 * Interactive service rows (not cards). Hovering/focusing a row:
 *  - slides its title, reveals its summary and arrow
 *  - dims the other rows
 *  - crossfades the sticky image panel (desktop). On mobile every row shows its summary.
 */
export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = services[activeIndex]

  return (
    <section id="services" className="section-space" aria-label={homeContent.services.title}>
      <div className="container-frame">
        <SceneLabel scene={3}>{homeContent.services.eyebrow}</SceneLabel>
        <HeadingLines lines={[homeContent.services.title]} className="text-display mt-8 uppercase" />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <ul className="group/list lg:col-span-7">
            {services.map((service, index) => (
              <li key={service.id} data-reveal className="border-t border-line last:border-b">
                <Link
                  to={`/services#${service.slug}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 transition-opacity duration-300 group-hover/list:opacity-35 hover:opacity-100 focus-visible:opacity-100 sm:grid-cols-[4rem_1fr_auto] sm:py-8"
                >
                  <span className="eyebrow tabular-nums transition-colors duration-300 group-hover:text-accent">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.75rem,4vw,3.75rem)] font-semibold uppercase leading-none tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3 group-focus-visible:translate-x-3 sm:group-hover:translate-x-5">
                      {service.title}
                    </h3>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-expo group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="max-w-md pt-3 text-sm text-muted transition-transform duration-500 ease-out-expo group-hover:translate-x-3 sm:group-hover:translate-x-5">
                          {service.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={24}
                    aria-hidden="true"
                    className="text-accent opacity-0 transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-60"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Sticky imagery panel (desktop only) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    aria-hidden={index !== activeIndex}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <MediaImage src={service.image} seed={`service-${service.slug}`} alt={`${service.title} still`} />
                  </div>
                ))}
                <ViewfinderFrame inset="1rem" />
                <p className="eyebrow absolute bottom-5 left-5 text-fg/80">
                  {active.number} — {active.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
