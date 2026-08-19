import { property } from '@/data/property'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useSite } from '@/context/SiteContext'

export function Architecture() {
  const { architecture } = property
  const { setCursorHint } = useSite()

  return (
    <section id="architecture" className="bg-ivory px-5 py-24 text-ink md:px-10 md:py-[16vh]">
      <SectionLabel>{architecture.index}</SectionLabel>
      <h2 className="display-lg mt-10 max-w-[10ch]">
        <span className="block">{architecture.headline[0]}</span>
        <span className="block italic">{architecture.headline[1]}</span>
      </h2>

      <div
        className="relative mt-16 overflow-hidden"
        onMouseEnter={() => setCursorHint('view')}
        onMouseLeave={() => setCursorHint('default')}
      >
        <img
          src={architecture.image.src}
          srcSet={architecture.image.srcSet}
          sizes="100vw"
          alt={architecture.image.alt}
          className="h-[70vh] w-full object-cover md:h-[86vh]"
          loading="lazy"
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="22" y1="38" x2="38" y2="48" stroke="#F3EFE6" strokeWidth="0.12" />
          <line x1="68" y1="24" x2="58" y2="40" stroke="#F3EFE6" strokeWidth="0.12" />
          <line x1="74" y1="72" x2="60" y2="62" stroke="#F3EFE6" strokeWidth="0.12" />
        </svg>

        {architecture.labels.map((label) => (
          <p
            key={label.id}
            className="absolute label-tiny text-ivory mix-blend-difference"
            style={{ left: `${label.x}%`, top: `${label.y}%` }}
          >
            {label.id}
          </p>
        ))}
      </div>
    </section>
  )
}
