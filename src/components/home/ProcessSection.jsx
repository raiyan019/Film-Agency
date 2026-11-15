import HeadingLines from '@/components/common/HeadingLines'
import { SceneLabel } from '@/components/common/FilmSymbols'
import { homeContent } from '@/data/home'

/** Editorial 4-step process: oversized outlined numbers, hairline rules, staggered scroll reveals. */
export default function ProcessSection() {
  const { process } = homeContent

  return (
    <section id="process" className="section-space bg-surface" aria-label={process.title}>
      <div className="container-frame">
        <SceneLabel scene={4}>{process.eyebrow}</SceneLabel>
        <HeadingLines lines={['Production', 'Process']} className="text-display mt-8 uppercase" />

        <ol className="mt-16 lg:mt-24">
          {process.steps.map((step) => (
            <li
              key={step.number}
              data-reveal
              className="group grid gap-4 border-t border-line py-10 last:border-b lg:grid-cols-12 lg:items-start lg:gap-8 lg:py-14"
            >
              <span
                aria-hidden="true"
                className="font-display text-[clamp(4rem,11vw,9rem)] font-bold leading-[0.85] tracking-[-0.05em] text-transparent transition-colors duration-500 group-hover:text-accent lg:col-span-4"
                style={{ WebkitTextStroke: '1px var(--color-muted)' }}
              >
                {step.number}
              </span>
              <h3 className="text-title uppercase lg:col-span-4 lg:pt-3">
                <span className="sr-only">{step.number} — </span>
                {step.title}
              </h3>
              <p className="max-w-md text-muted lg:col-span-4 lg:pt-4">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
