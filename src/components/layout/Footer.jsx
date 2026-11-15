import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { gsap } from '@/animations/gsap'
import { siteConfig } from '@/data/siteConfig'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Footer() {
  const reducedMotion = useReducedMotion()
  const { name, trademark, contact, social, navigation, secondaryNavigation, footer } = siteConfig

  const scrollToTop = () => {
    if (reducedMotion) {
      window.scrollTo(0, 0)
      return
    }
    // Duration scales with distance but is capped; user scrolling cancels it (autoKill).
    const distance = window.scrollY
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: true },
      duration: Math.min(1.6, Math.max(0.6, distance / 3000)),
      ease: 'power3.inOut',
    })
  }

  return (
    <footer className="border-t border-line bg-base pt-16 sm:pt-24">
      <div className="container-frame">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Start a project</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-title link-underline break-words"
              data-cursor="link"
            >
              {contact.email}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            <div>
              <p className="eyebrow mb-5">Navigate</p>
              <ul className="space-y-2.5 text-sm">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="link-underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {secondaryNavigation.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="link-underline text-muted hover:text-fg">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-5">Social</p>
              <ul className="space-y-2.5 text-sm">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center gap-1"
                    >
                      <span className="link-underline">{item.label}</span>
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-5">Studio</p>
              <address className="space-y-2.5 text-sm not-italic">
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="link-underline block w-fit">
                  {contact.phone}
                </a>
                <div className="text-muted">
                  {contact.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </address>
            </div>
          </nav>
        </div>
      </div>

      {/* Oversized wordmark: also the logo link. Sized in vw so it always fits without overflow. */}
      <div className="container-frame mt-16 overflow-hidden sm:mt-24">
        <Link
          to="/"
          aria-label={`${name} — home`}
          className="block select-none whitespace-nowrap font-display text-[23vw] font-bold uppercase leading-[0.78] tracking-[-0.06em] transition-colors duration-500 hover:text-accent focus-visible:text-accent 3xl:text-[27rem]"
        >
          {name}
          {trademark}
        </Link>
      </div>

      <div className="container-frame">
        <div className="flex flex-col gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {name}
            {trademark} {footer.copyright}
          </p>
          <p className="hidden sm:block">
            {contact.location} · {footer.credit}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group/top flex min-h-11 w-fit items-center gap-2 uppercase tracking-[0.14em] text-fg"
          >
            Back to top
            <ArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/top:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
