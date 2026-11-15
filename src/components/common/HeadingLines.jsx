/**
 * Headline split into masked lines for reveal animations.
 *  - scrollReveal (default): useScrollReveal() animates it when scrolled into view.
 *  - scrollReveal={false}: you animate the [data-line] children yourself (the hero does).
 *  - accentPunctuation: colours a trailing "." / "?" on the last line in the accent colour.
 */
export default function HeadingLines({
  lines,
  as: Tag = 'h2',
  className = '',
  scrollReveal = true,
  accentPunctuation = false,
}) {
  return (
    <Tag className={className} data-lines={scrollReveal ? '' : undefined} aria-label={lines.join(' ')}>
      {lines.map((line, index) => {
        const isLast = index === lines.length - 1
        const lastChar = line.slice(-1)
        const accent = accentPunctuation && isLast && /[^\p{L}\p{N}]/u.test(lastChar)

        return (
          <span key={line} aria-hidden="true" className="-my-[0.06em] block overflow-hidden py-[0.06em]">
            <span data-line className="block will-change-transform">
              {accent ? (
                <>
                  {line.slice(0, -1)}
                  <span className="text-accent">{lastChar}</span>
                </>
              ) : (
                line
              )}
            </span>
          </span>
        )
      })}
    </Tag>
  )
}
