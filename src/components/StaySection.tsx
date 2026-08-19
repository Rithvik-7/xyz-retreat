import { property } from '@/data/property'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StaySlider } from '@/components/StaySlider'

export function StaySection() {
  return (
    <section id="stay" className="bg-ink text-ivory">
      <div className="px-5 pt-28 pb-8 md:px-10 md:pt-[18vh] md:pb-6">
        <SectionLabel>{property.stay.index}</SectionLabel>
        <h2 className="display-lg mt-10 max-w-[12ch]">
          <span className="block">{property.stay.headline[0]}</span>
          <span className="block italic">{property.stay.headline[1]}</span>
        </h2>
      </div>
      <StaySlider />
    </section>
  )
}
