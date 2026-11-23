import { Fragment } from 'react'

/**
 * Paragraph whose words light up as you scroll through it (animated by useScrollReveal via data-scrub).
 * Without animation (reduced motion) it simply renders as normal, fully visible text.
 */
export default function ScrubText({ text, className = '' }) {
  const words = text.split(' ')

  return (
    <p data-scrub className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span data-word>{word}</span>
          {index < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </p>
  )
}
