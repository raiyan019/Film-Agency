import Button from '@/components/common/Button'
import HeadingLines from '@/components/common/HeadingLines'
import { SceneLabel } from '@/components/common/FilmSymbols'
import ArticleCard from '@/components/journal/ArticleCard'
import { homeContent } from '@/data/home'
import { getLatestArticles } from '@/data/journal'

export default function JournalPreview() {
  const { journal } = homeContent

  return (
    <section id="journal" className="section-space bg-surface" aria-label={journal.title}>
      <div className="container-frame">
        <div className="mb-16 flex flex-col gap-8 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SceneLabel scene={6}>{journal.eyebrow}</SceneLabel>
            <HeadingLines lines={['From the', 'Journal']} className="text-display mt-8 uppercase" />
          </div>
          <div data-reveal>
            <Button to={journal.cta.to} variant="outline">{journal.cta.label}</Button>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {getLatestArticles(3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
