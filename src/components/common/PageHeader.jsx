import HeadingLines from './HeadingLines'
import { SceneLabel } from './FilmSymbols'

/** Shared page intro: slate label, masked H1 and a short paragraph. Needs useScrollReveal() on the page. */
export default function PageHeader({ scene = 1, eyebrow, lines, intro, children, className = '' }) {
  return (
    <header className={`container-frame pb-16 pt-36 sm:pt-44 ${className}`}>
      <SceneLabel scene={scene}>{eyebrow}</SceneLabel>
      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <HeadingLines as="h1" lines={lines} accentPunctuation className="text-display uppercase" />
        {intro && (
          <p data-reveal className="max-w-sm text-muted lg:pb-3">
            {intro}
          </p>
        )}
      </div>
      {children}
    </header>
  )
}
