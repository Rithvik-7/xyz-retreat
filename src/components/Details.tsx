import { property } from '@/data/property'

export function Details() {
  return (
    <section className="bg-cream px-5 py-28 text-ink md:px-10 md:py-[16vh]">
      <div className="grid gap-16 md:grid-cols-12">
        <p className="label-tiny text-ink/50 md:col-span-4">{property.details.heading}</p>
        <ul className="md:col-span-8">
          {property.details.items.map((item) => (
            <li
              key={item}
              className="group flex items-center justify-between border-b border-ink/10 py-4"
            >
              <span className="text-[0.72rem] tracking-[0.22em] uppercase text-ink/75 transition-transform duration-500 group-hover:translate-x-1">
                {item}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-0 bg-earth transition-all duration-500 group-hover:w-10"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
