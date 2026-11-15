import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import ContactForm from '@/components/common/ContactForm'
import PageHeader from '@/components/common/PageHeader'
import { contactContent } from '@/data/contact'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function Contact() {
  const rootRef = useRef(null)
  const [searchParams] = useSearchParams()
  const { contact, social } = siteConfig

  useDocumentMeta({ title: 'Contact', description: contactContent.header.intro })
  useScrollReveal(rootRef)

  // /contact?service=documentary pre-selects that service (links come from the Services page).
  const requestedService = services.find((service) => service.slug === searchParams.get('service'))

  return (
    <div ref={rootRef}>
      <PageHeader scene={1} {...contactContent.header} />

      <section className="container-frame grid gap-16 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-10" aria-label="Contact">
        <aside className="space-y-10 lg:col-span-4" aria-label="Contact details">
          <div data-reveal>
            <p className="eyebrow mb-3">Email</p>
            <a href={`mailto:${contact.email}`} className="link-underline break-words text-xl">
              {contact.email}
            </a>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-3">Phone</p>
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="link-underline text-xl">
              {contact.phone}
            </a>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-3">Studio</p>
            <address className="space-y-1 text-lg not-italic text-muted">
              {contact.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-3">Follow</p>
            <ul className="space-y-2">
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
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div data-reveal className="lg:col-span-7 lg:col-start-6">
          <ContactForm defaultService={requestedService?.title ?? ''} />
        </div>
      </section>
    </div>
  )
}
