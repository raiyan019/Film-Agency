import { useId } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/animations/easings'

/**
 * Accessible category filter (used by Work now, Journal in Phase 5).
 *  categories: ['All', 'Documentary', ...]   active: the selected string
 *  counts:     { All: 8, Documentary: 2, ... } (optional, shown as small superscripts)
 */
export default function CategoryFilter({ categories, active, onChange, counts, label = 'Filter by category' }) {
  const underlineId = `${useId()}-underline`

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-x-8 gap-y-1">
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            className={`relative min-h-11 pb-1 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
              isActive ? 'text-fg' : 'text-muted hover:text-fg'
            }`}
          >
            {category}
            {counts && (
              <sup className="ml-1 text-[0.65em] tabular-nums">{String(counts[category] ?? 0).padStart(2, '0')}</sup>
            )}
            {isActive && (
              <motion.span
                layoutId={underlineId}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="absolute inset-x-0 bottom-2 h-px bg-accent"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
