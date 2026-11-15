import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'
import { RecIndicator, ReelIcon, Timecode, ViewfinderFrame } from '@/components/common/FilmSymbols'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

/** Cinematic 404: "no signal" viewfinder, outlined 404 and a way home. */
export default function NotFound() {
  useDocumentMeta({ title: 'Page not found' })

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden pb-16 pt-28">
      <div aria-hidden="true" className="film-grain absolute inset-0 -z-10 !opacity-30" />
      <ViewfinderFrame inset="1.25rem" crosshair />
      <ReelIcon
        size={360}
        spin
        className="pointer-events-none absolute -right-20 top-1/3 -z-10 hidden text-line lg:block"
      />

      <div className="container-frame eyebrow flex items-center justify-between">
        <RecIndicator label="No signal" className="text-fg" />
        <Timecode />
      </div>

      <div className="container-frame">
        <p
          aria-hidden="true"
          className="font-display text-[clamp(8rem,32vw,30rem)] font-bold leading-[0.8] tracking-[-0.06em] text-transparent"
          style={{ WebkitTextStroke: '1px var(--color-muted)' }}
        >
          404
        </p>
        <h1 className="text-display mt-6 uppercase">
          Scene
          <br />
          not found<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-md text-muted">
          The page you’re looking for was cut from the final edit, or never made it past the script.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button to="/">Return home</Button>
          <Link to="/work" className="link-underline text-sm font-medium uppercase tracking-[0.14em]">
            View our work
          </Link>
        </div>
      </div>
    </section>
  )
}
