import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/animations/easings'
import { ScrollTrigger } from '@/animations/gsap'
import { useScrollReveal } from '@/animations/useScrollReveal'
import CategoryFilter from '@/components/common/CategoryFilter'
import PageHeader from '@/components/common/PageHeader'
import ArticleCard from '@/components/journal/ArticleCard'
import { articles, journalCategories } from '@/data/journal'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const toSlug = (text) => text.toLowerCase().replace(/\s+/g, '-')

export default function Journal() {
  const rootRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useDocumentMeta({ title: 'Journal', description: 'Stories, craft notes and news from behind the camera.' })
  useScrollReveal(rootRef)

  // Filter + search live in the URL (?category=craft&q=anamorphic): shareable, and they survive refresh.
  const query = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category')
  const active = journalCategories.find((category) => category !== 'All' && toSlug(category) === categoryParam) ?? 'All'

  const counts = useMemo(
    () =>
      Object.fromEntries(
        journalCategories.map((category) => [
          category,
          category === 'All' ? articles.length : articles.filter((article) => article.category === category).length,
        ])
      ),
    []
  )

  const visibleArticles = useMemo(() => {
    const term = query.trim().toLowerCase()
    return articles
      .filter((article) => active === 'All' || article.category === active)
      .filter(
        (article) =>
          !term ||
          [article.title, article.excerpt, article.category, article.author].some((field) =>
            field.toLowerCase().includes(term)
          )
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [active, query])

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    setSearchParams(next, { replace: true, preventScrollReset: true })
  }

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 900)
    return () => clearTimeout(timer)
  }, [active, query])

  return (
    <div ref={rootRef}>
      <PageHeader
        scene={1}
        eyebrow="Journal"
        lines={['Notes from', 'the set.']}
        intro="Craft notes, behind-the-scenes stories and studio news."
      />

      <section className="container-frame pb-24 sm:pb-32" aria-label="Articles">
        <div className="flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter
            categories={journalCategories}
            active={active}
            counts={counts}
            onChange={(category) => updateParams({ category: category === 'All' ? '' : toSlug(category) })}
            label="Filter articles by category"
          />

          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="journal-search" className="sr-only">Search articles</label>
            <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="journal-search"
              type="search"
              value={query}
              onChange={(event) => updateParams({ q: event.target.value })}
              placeholder="Search articles"
              autoComplete="off"
              className="w-full border-0 border-b border-line bg-transparent py-3 pl-7 pr-8 text-sm outline-none transition-colors duration-300 placeholder:text-muted focus:border-accent [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => updateParams({ q: '' })}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-muted hover:text-fg"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visibleArticles.length} {visibleArticles.length === 1 ? 'article' : 'articles'} found
        </p>

        {visibleArticles.length === 0 ? (
          <div className="py-24">
            <p className="text-title uppercase">No articles found.</p>
            <p className="mt-4 text-muted">Try a different search term or category.</p>
            <button
              type="button"
              onClick={() => updateParams({ q: '', category: '' })}
              className="link-underline mt-6 text-sm font-medium uppercase tracking-[0.14em]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="relative mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleArticles.map((article, index) => (
                <motion.li
                  key={article.id}
                  layout="position"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: index * 0.04 }}
                >
                  <ArticleCard article={article} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </div>
  )
}
