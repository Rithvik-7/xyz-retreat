import { property } from '@/data/property'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useSite } from '@/context/SiteContext'
import { cn } from '@/lib/cn'

export function Journal() {
  const { journal } = property
  const { setCursorHint } = useSite()

  return (
    <section id="journal" className="bg-ivory px-5 py-28 text-ink md:px-10 md:py-[16vh]">
      <SectionLabel>{journal.index}</SectionLabel>
      <h2 className="display-lg mt-8">{journal.heading}</h2>

      <div className="mt-20 space-y-28 md:space-y-36">
        {journal.articles.map((article, i) => (
          <article
            key={`${article.title}-${i}`}
            className={cn(
              'grid items-end gap-8 md:grid-cols-12 md:gap-10',
              i === 2 && 'md:items-start',
            )}
            onMouseEnter={() => setCursorHint('view')}
            onMouseLeave={() => setCursorHint('default')}
          >
            <div
              className={cn(
                i === 0 && 'md:col-span-7',
                i === 1 && 'md:col-span-5 md:col-start-8 md:row-start-1',
                i === 2 && 'md:col-span-12',
              )}
            >
              <img
                src={article.image.src}
                srcSet={article.image.srcSet}
                sizes={i === 2 ? '100vw' : '60vw'}
                alt={article.image.alt}
                className={cn(
                  'w-full object-cover',
                  i === 0 && 'h-[52vh] md:h-[68vh]',
                  i === 1 && 'h-[42vh] md:h-[52vh]',
                  i === 2 && 'h-[48vh] md:h-[78vh]',
                )}
                loading="lazy"
              />
            </div>
            <div
              className={cn(
                i === 0 && 'md:col-span-4 md:col-start-9',
                i === 1 && 'md:col-span-5 md:col-start-1 md:row-start-1 md:mb-8',
                i === 2 && 'md:col-span-4 md:col-start-8 md:-mt-24',
              )}
            >
              <p className="label-tiny text-ink/45">{article.kicker}</p>
              <h3 className="mt-4 font-display text-4xl leading-none md:text-5xl">
                {article.title}
              </h3>
              <p className="mt-4 label-tiny text-ink/40">{article.date}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
