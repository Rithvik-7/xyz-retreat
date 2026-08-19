import { property } from '@/data/property'
import { EditorialButton } from '@/components/ui/EditorialButton'
import { useSite } from '@/context/SiteContext'

export function FinalCTA() {
  const { openBooking, setCursorHint } = useSite()

  return (
    <section id="finale" className="relative h-svh min-h-[640px] overflow-hidden bg-ink">
      <img
        src={property.finale.image.src}
        srcSet={property.finale.image.srcSet}
        sizes="100vw"
        alt={property.finale.image.alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-ivory">
        <p className="label-tiny text-ivory/70">{property.finale.kicker}</p>
        <h2 className="display-lg mt-8">
          <span className="block">{property.finale.headline[0]}</span>
          <span className="block">{property.finale.headline[1]}</span>
          <span className="block italic">{property.finale.headline[2]}</span>
        </h2>
        <div
          className="mt-12"
          onMouseEnter={() => setCursorHint('book')}
          onMouseLeave={() => setCursorHint('default')}
        >
          <EditorialButton variant="outline" onClick={openBooking}>
            {property.finale.cta}
          </EditorialButton>
        </div>
      </div>
    </section>
  )
}
