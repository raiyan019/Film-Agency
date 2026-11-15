import { useRef } from 'react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import PageHeader from '@/components/common/PageHeader'
import { privacyContent } from '@/data/privacy'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useHashScroll } from '@/hooks/useHashScroll'

export default function Privacy() {
  const rootRef = useRef(null)
  const { title, lastUpdated, sections, showPlaceholderNotice } = privacyContent

  useDocumentMeta({ title, description: 'How we collect, use and protect your personal information.' })
  useScrollReveal(rootRef)
  useHashScroll()

  return (
    <div ref={rootRef}>
      <PageHeader scene={1} eyebrow="Legal" lines={['Privacy', 'policy.']} intro={`Last updated ${lastUpdated}.`} />

      <div className="container-frame grid gap-12 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-10">
        <nav aria-label="Policy sections" className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
          <p className="eyebrow mb-4">Contents</p>
          <ol className="space-y-2 border-l border-line pl-4 text-sm">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-muted transition-colors duration-300 hover:text-fg">
                  <span className="tabular-nums text-accent">{String(index + 1).padStart(2, '0')}</span> {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="lg:col-span-7 lg:col-start-5">
          {showPlaceholderNotice && (
            <p role="note" className="mb-12 border border-line p-5 text-sm text-muted">
              <strong className="text-fg">Placeholder policy.</strong> This text is an example only. Replace it with a
              policy reviewed by a qualified legal professional before launching.
            </p>
          )}

          <div className="space-y-14">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
                <h2 id={`${section.id}-title`} className="mb-5 font-display text-2xl font-semibold tracking-tight">
                  <span className="mr-3 tabular-nums text-accent">{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
