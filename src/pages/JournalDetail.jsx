import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useScrollReveal } from '@/animations/useScrollReveal'
import Button from '@/components/common/Button'
import HeadingLines from '@/components/common/HeadingLines'
import MediaImage from '@/components/common/MediaImage'
import { ClapperIcon, SceneLabel, ViewfinderFrame } from '@/components/common/FilmSymbols'
import ArticleCard from '@/components/journal/ArticleCard'
import { articles, formatArticleDate, getArticleBySlug } from '@/data/journal'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

function ArticleNotFound({ slug }) {
  return (
    <section className="relative flex min-h-svh flex-col justify-end pb-16 pt-40">
      <ViewfinderFrame inset="1.25rem" />
      <div className="container-frame">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <ClapperIcon size={18} className="text-accent" />
          Error 404 / Article
        </p>
        <h1 className="text-display uppercase">
          Story
          <br />
          not found.
        </h1>
        <p className="mt-8 max-w-lg text-muted">
          There’s no article at <code className="text-fg">/journal/{slug}</code>.
        </p>
        <div className="mt-10">
          <Button to="/journal">Back to the journal</Button>
        </div>
      </div>
    </section>
  )
}

export default function JournalDetail() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)
  const rootRef = useRef(null)

  useDocumentMeta({
    title: article ? article.title : 'Article not found',
    description: article?.excerpt,
  })
  useScrollReveal(rootRef)

  if (!article) return <ArticleNotFound slug={slug} />

  // Related: same category first, then the most recent others.
  const related = articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const sameCategory = Number(b.category === article.category) - Number(a.category === article.category)
      return sameCategory || new Date(b.date) - new Date(a.date)
    })
    .slice(0, 3)

  return (
    <div ref={rootRef}>
      <header className="container-frame pb-12 pt-36 sm:pt-44">
        <Link to="/journal" className="group mb-10 inline-flex min-h-11 items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted hover:text-fg">
          <ArrowLeft size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" />
          All articles
        </Link>
        <SceneLabel scene={1}>{article.category}</SceneLabel>
        <HeadingLines
          as="h1"
          lines={[article.title]}
          className="mt-8 max-w-5xl font-display text-[clamp(2.25rem,6.5vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]"
        />
      </header>

      <div className="container-frame">
        <div data-mask className="relative aspect-[16/9] overflow-hidden bg-card md:aspect-[21/9]">
          <div data-mask-inner className="absolute inset-0">
            <MediaImage src={article.image} seed={article.slug} alt={article.title} loading="eager" />
          </div>
        </div>
      </div>

      <article className="container-frame section-space grid gap-12 lg:grid-cols-12">
        <dl className="grid grid-cols-3 gap-6 lg:sticky lg:top-28 lg:col-span-3 lg:block lg:space-y-8 lg:self-start">
          <div data-reveal>
            <dt className="eyebrow mb-1">Author</dt>
            <dd>{article.author}</dd>
          </div>
          <div data-reveal>
            <dt className="eyebrow mb-1">Published</dt>
            <dd>
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            </dd>
          </div>
          <div data-reveal>
            <dt className="eyebrow mb-1">Reading time</dt>
            <dd>{article.readTime}</dd>
          </div>
        </dl>

        <div className="space-y-7 lg:col-span-7 lg:col-start-5">
          {article.content.map((paragraph, index) => (
            <p
              key={paragraph}
              data-reveal
              className={index === 0 ? 'font-display text-2xl leading-snug tracking-tight sm:text-3xl' : 'max-w-2xl text-lg leading-relaxed text-muted'}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-space bg-surface" aria-labelledby="related-heading">
          <div className="container-frame">
            <SceneLabel scene={2}>Keep reading</SceneLabel>
            <h2 id="related-heading" className="text-title mt-8 uppercase">Related articles</h2>
            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
