import { property } from '@/data/property'
import { scrollToId } from '@/lib/lenis'
import { useSite } from '@/context/SiteContext'

export function Footer() {
  const { openBooking } = useSite()

  return (
    <footer className="bg-ink px-5 py-16 text-ivory md:px-10 md:py-20">
      <div className="flex flex-col justify-between gap-12 border-t border-ivory/10 pt-12 md:flex-row md:items-end">
        <div>
          <p className="font-display text-5xl tracking-[0.12em]">{property.name}</p>
          <p className="mt-4 label-tiny text-ivory/45">{property.footer.note}</p>
        </div>
        <div className="space-y-2 text-ivory/70">
          <p className="label-tiny">{property.location.address}</p>
          <p className="label-tiny">{property.phone}</p>
          <a className="label-tiny" href={`mailto:${property.email}`}>
            {property.email}
          </a>
        </div>
        <div className="flex flex-col items-start gap-3">
          {property.nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className="label-tiny text-ivory/60 hover:text-ivory"
              onClick={() => scrollToId(item.href)}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="label-tiny" onClick={openBooking}>
            BOOK →
          </button>
        </div>
      </div>
      <p className="mt-16 label-tiny text-ivory/30">{property.footer.rights}</p>
    </footer>
  )
}
