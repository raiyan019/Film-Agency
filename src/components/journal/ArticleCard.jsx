import { Link } from 'react-router-dom'
import MediaImage from '@/components/common/MediaImage'
import { formatArticleDate } from '@/data/journal'

/** Journal article card (homepage preview and /journal grid). */
export default function ArticleCard({ article, className = '' }) {
  return (
    <article className={className}>
      <Link to={`/journal/${article.slug}`} data-cursor="Read" className="group block">
        <div data-mask className="relative aspect-[3/2] overflow-hidden bg-card">
          <div data-mask-inner className="absolute inset-0">
            <div className="h-full w-full transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.05]">
              <MediaImage src={article.image} seed={article.slug} alt={article.title} />
            </div>
          </div>
        </div>

        <div data-reveal className="mt-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">{article.category}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  )
}
