import { ClapperIcon, SceneLabel } from '@/components/common/FilmSymbols'
import ScrubText from '@/components/common/ScrubText'
import Button from '@/components/common/Button'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import { homeContent } from '@/data/home'

export default function StudioIntro() {
  const { intro } = homeContent

  return (
    <section id="studio" className="section-space">
      <div className="container-frame">
        <SceneLabel scene={1}>{intro.eyebrow}</SceneLabel>
        <HeadingLines lines={intro.lines} className="text-display mt-8 uppercase" accentPunctuation />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div data-mask className="relative aspect-[4/5] overflow-hidden bg-card">
              <div data-mask-inner className="absolute inset-0">
                <MediaImage src={intro.image} seed="studio" alt={intro.imageAlt} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8 lg:pt-28">
            <ClapperIcon size={32} className="text-accent" />
            {intro.body.map((paragraph, index) =>
              index === 0 ? (
                <ScrubText key={paragraph} text={paragraph} className="text-xl leading-relaxed text-fg sm:text-2xl" />
              ) : (
                <p key={paragraph} data-reveal className="text-lg leading-relaxed text-muted sm:text-xl">
                  {paragraph}
                </p>
              )
            )}
            <div data-reveal>
              <Button to={intro.cta.to} variant="outline">{intro.cta.label}</Button>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {intro.stats.map((stat) => (
                <div key={stat.label} data-reveal className="flex flex-col">
                  <dt className="eyebrow order-2 mt-2">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
