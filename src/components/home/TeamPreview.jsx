import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import { SceneLabel } from '@/components/common/FilmSymbols'
import { homeContent } from '@/data/home'
import { featuredTeam } from '@/data/team'

// Subtle vertical stagger on desktop for an editorial rhythm.
const OFFSETS = ['', 'lg:mt-16', 'lg:mt-6', 'lg:mt-24']

export default function TeamPreview() {
  const { team } = homeContent

  return (
    <section id="team" className="section-space" aria-label={team.title}>
      <div className="container-frame">
        <div className="mb-16 flex flex-col gap-8 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SceneLabel scene={5}>{team.eyebrow}</SceneLabel>
            <HeadingLines lines={['Creative', 'Team']} className="text-display mt-8 uppercase" />
          </div>
          <div data-reveal>
            <Button to={team.cta.to} variant="outline">{team.cta.label}</Button>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {featuredTeam.slice(0, 4).map((member, index) => (
            <li key={member.id} className={OFFSETS[index]}>
              <Link to={`/team#${member.slug}`} data-cursor="Profile" className="group block">
                <div data-mask className="relative aspect-[3/4] overflow-hidden bg-card">
                  <div data-mask-inner className="absolute inset-0">
                    <div className="h-full w-full grayscale transition-all duration-[1200ms] ease-out-expo group-hover:scale-[1.05] group-hover:grayscale-0">
                      <MediaImage
                        src={member.image}
                        seed={member.slug}
                        variant="portrait"
                        alt={`Portrait of ${member.name}, ${member.role}`}
                      />
                    </div>
                  </div>
                </div>
                <div data-reveal className="mt-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{member.name}</h3>
                  <p className="eyebrow mt-2">{member.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
