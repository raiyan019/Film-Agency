import MediaImage from '@/components/common/MediaImage'

const pad = (number) => String(number).padStart(2, '0')

/**
 * Asymmetric project gallery driven by `project.gallery`.
 * Each item has layout: 'wide' (full width, 16:9) or 'tall' (half width, 4:5). Edit them in data/projects.js.
 */
export default function ProjectGallery({ project }) {
  const total = project.gallery.length

  return (
    <ul className="grid gap-x-8 gap-y-10 md:grid-cols-12 md:gap-y-14">
      {project.gallery.map((item, index) => {
        const isWide = item.layout === 'wide'
        // Stagger every second tall frame downward for an editorial rhythm.
        const offset = !isWide && index % 2 === 0 ? 'md:mt-24' : ''

        return (
          <li key={item.src} className={`${isWide ? 'md:col-span-12' : 'md:col-span-6'} ${offset}`}>
            <figure>
              <div
                data-mask
                className={`relative overflow-hidden bg-card ${isWide ? 'aspect-video' : 'aspect-[4/5]'}`}
              >
                <div data-mask-inner className="absolute inset-0">
                  <MediaImage src={item.src} seed={`${project.slug}-${index}`} alt={`${project.title}: ${item.alt}`} />
                </div>
              </div>
              <figcaption data-reveal className="eyebrow mt-3 flex justify-between gap-6">
                <span>{item.alt}</span>
                <span className="tabular-nums">
                  {pad(index + 1)} / {pad(total)}
                </span>
              </figcaption>
            </figure>
          </li>
        )
      })}
    </ul>
  )
}
