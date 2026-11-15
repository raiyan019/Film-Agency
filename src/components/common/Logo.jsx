import { Link } from 'react-router-dom'
import { siteConfig } from '@/data/siteConfig'

/** Text wordmark. To use an image/SVG logo, replace the children but keep the aria-label. */
export default function Logo({ className = '', onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={`font-display text-xl font-bold uppercase leading-none tracking-[-0.05em] ${className}`}
    >
      {siteConfig.name}
      <sup className="ml-0.5 align-super text-[0.5em] font-medium tracking-normal">
        {siteConfig.trademark}
      </sup>
    </Link>
  )
}
