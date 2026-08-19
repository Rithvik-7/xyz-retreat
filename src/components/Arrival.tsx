import { property } from '@/data/property'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { EditorialButton } from '@/components/ui/EditorialButton'
import { scrollToId } from '@/lib/lenis'

export function Arrival() {
  const { arrival } = property

  return (
    <section
      id="arrival"
      className="relative bg-ivory text-ink"
    >
      <div className="grid min-h-[100svh] grid-cols-1 px-5 py-28 md:grid-cols-12 md:px-10 md:py-[22vh]">
        <SectionLabel className="md:col-span-12">{arrival.index}</SectionLabel>

        <h2 className="display-lg mt-16 max-w-[11ch] md:col-span-7 md:mt-24 md:col-start-2">
          <span className="block">{arrival.headline[0]}</span>
          <span className="block">{arrival.headline[1]}</span>
          <span className="block italic">{arrival.headline[2]}</span>
        </h2>

        <div className="mt-16 max-w-[28ch] md:col-span-4 md:col-start-9 md:mt-40">
          <p className="text-[1.02rem] font-light leading-[1.7] text-ink/70">
            {arrival.body}
          </p>
          <div className="mt-10">
            <EditorialButton onClick={() => scrollToId('#story')}>
              {arrival.cta}
            </EditorialButton>
          </div>
        </div>
      </div>
    </section>
  )
}
