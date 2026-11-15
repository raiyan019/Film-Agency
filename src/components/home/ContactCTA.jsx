import Button from '@/components/common/Button'
import HeadingLines from '@/components/common/HeadingLines'
import { ReelIcon } from '@/components/common/FilmSymbols'
import { homeContent } from '@/data/home'
import { siteConfig } from '@/data/siteConfig'

export default function ContactCTA() {
  const { cta } = homeContent

  return (
    <section id="contact-cta" className="section-space relative overflow-hidden" aria-label="Contact">
      <ReelIcon
        size={420}
        spin
        className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 text-line lg:block"
      />
      <div className="container-frame relative">
        <HeadingLines lines={cta.lines} accentPunctuation className="text-display uppercase" />

        <div data-reveal className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
          <Button to={cta.button.to}>{cta.button.label}</Button>
          <a href={`mailto:${siteConfig.contact.email}`} className="link-underline text-lg text-muted hover:text-fg">
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </section>
  )
}
