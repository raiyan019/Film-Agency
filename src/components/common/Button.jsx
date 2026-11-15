import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const VARIANTS = {
  primary: { base: 'border-accent bg-accent text-base hover:text-accent focus-visible:text-accent', fill: 'bg-base' },
  outline: { base: 'border-line text-fg hover:border-fg hover:text-base focus-visible:text-base', fill: 'bg-fg' },
}

/**
 * Sweep-fill button. Renders a router <Link> (`to`), an <a> (`href`) or a <button>.
 * <Button to="/contact">Start a project</Button>   <Button variant="outline" href="mailto:...">Email us</Button>
 */
export default function Button({ to, href, children, variant = 'primary', icon = true, className = '', ...props }) {
  const style = VARIANTS[variant]
  const classes = `group relative inline-flex min-h-12 items-center gap-3 overflow-hidden border px-6 py-3 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-500 ${style.base} ${className}`

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0 ${style.fill}`}
      />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="relative transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>
  if (href) return <a href={href} className={classes} {...props}>{content}</a>
  return <button type="button" className={classes} {...props}>{content}</button>
}
