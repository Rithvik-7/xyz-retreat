import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { property } from '@/data/property'
import { useSite } from '@/context/SiteContext'
import { useIsDesktop } from '@/hooks/useMedia'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EditorialButton } from '@/components/ui/EditorialButton'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

export function StaySlider() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const reduced = useReducedMotion()
  const { openBooking, setCursorHint } = useSite()
  const [index, setIndex] = useState(0)
  const total = property.stay.accommodations.length

  useEffect(() => {
    if (!root.current || !track.current) return
    if (!desktop || reduced) return

    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth

      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance() * 1.05}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(total - 1, Math.floor(self.progress * total))
            setIndex(i)
          },
        },
      })
    }, root)

    return () => ctx.revert()
  }, [desktop, reduced, total])

  const onMobileScroll = () => {
    if (!track.current || desktop) return
    const i = Math.round(track.current.scrollLeft / (track.current.clientWidth * 0.86))
    setIndex(Math.min(total - 1, Math.max(0, i)))
  }

  return (
    <div ref={root} className="relative overflow-hidden">
      <div
        ref={track}
        onScroll={onMobileScroll}
        className="stay-track flex h-auto items-stretch gap-8 overflow-x-auto px-5 pb-24 lg:h-[100svh] lg:w-max lg:gap-10 lg:overflow-visible lg:px-0 lg:pl-10"
        style={{ scrollSnapType: desktop ? undefined : 'x mandatory' }}
      >
        {property.stay.accommodations.map((stay) => (
          <article
            key={stay.id}
            className="relative h-[78vh] w-[88vw] shrink-0 snap-center overflow-hidden md:h-[82vh] md:w-[86vw] lg:h-[86vh] lg:w-[88vw]"
            onMouseEnter={() => setCursorHint('explore')}
            onMouseLeave={() => setCursorHint('default')}
          >
            <img
              src={stay.image.src}
              srcSet={stay.image.srcSet}
              sizes="80vw"
              alt={stay.image.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:flex-row md:items-end md:justify-between md:p-10">
              <div>
                <h3 className="font-display text-4xl md:text-6xl">{stay.name}</h3>
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 label-tiny text-ivory/60">
                  <span>{stay.area}</span>
                  <span>{stay.guests}</span>
                  <span>{stay.bed}</span>
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:text-right">
                <p className="font-display text-2xl italic">{stay.price}</p>
                <div className="mt-4">
                  <EditorialButton onClick={openBooking}>{property.stay.cta}</EditorialButton>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-between px-6 md:px-12">
        <p className="label-tiny text-ivory/70">
          {String(index + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
        </p>
        <div className="h-px w-28 overflow-hidden bg-ivory/20 md:w-40">
          <div
            className={cn('h-full bg-ivory transition-all duration-500')}
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
