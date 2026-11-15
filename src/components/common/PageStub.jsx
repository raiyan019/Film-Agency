import { useDocumentMeta } from '@/hooks/useDocumentMeta'

/**
 * Temporary placeholder used by routes that are built in later phases.
 * Proves the route, the title/meta hook and the design tokens all work.
 */
export default function PageStub({ title, phase, note, description }) {
  useDocumentMeta({ title, description })

  return (
    <section className="container-frame flex min-h-svh flex-col justify-end pb-16 pt-40">
      <p className="eyebrow mb-6">
        <span className="text-accent">●</span>&nbsp; {phase}
      </p>
      <h1 className="text-display uppercase">{title}</h1>
      {note && <p className="mt-8 max-w-xl text-muted">{note}</p>}
    </section>
  )
}
