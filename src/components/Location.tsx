import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { property } from '@/data/property'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Location() {
  const path = useRef<SVGPathElement>(null)
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = path.current
    if (!el || reduced) return
    const length = el.getTotalLength()
    el.style.strokeDasharray = `${length}`
    el.style.strokeDashoffset = `${length}`

    const ctx = gsap.context(() => {
      gsap.to(el, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="contact"
      ref={root}
      className="bg-cream px-5 py-28 text-ink md:px-10 md:py-[16vh]"
    >
      <SectionLabel>{property.map.index}</SectionLabel>
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <p className="font-display text-5xl md:text-7xl">{property.map.center}</p>
        <p className="label-tiny text-ink/50">{property.coordinates}</p>
      </div>

      <div className="relative mt-16 aspect-[16/10] border border-ink/15 bg-ivory">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16,21,16,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,21,16,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <svg viewBox="0 0 100 62" className="absolute inset-0 h-full w-full">
          <path
            ref={path}
            d="M12 48 C 28 44, 34 18, 50 28 S 72 14, 86 22"
            fill="none"
            stroke="#9B805F"
            strokeWidth="0.35"
          />
          <circle cx="50" cy="31" r="1.2" fill="#101510" />
        </svg>

        <p className="absolute top-[46%] left-1/2 -translate-x-1/2 label-tiny">{property.map.center}</p>
        {property.map.nearby.map((place, i) => (
          <p
            key={`${place.label}-${i}`}
            className="absolute label-tiny text-ink/45"
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
          >
            {place.label}
          </p>
        ))}
      </div>

      <dl className="mt-10 flex flex-wrap gap-12">
        <div>
          <dt className="label-tiny text-ink/40">XYZ</dt>
          <dd className="mt-2 font-display text-3xl">{property.map.distance}</dd>
        </div>
        <div>
          <dt className="label-tiny text-ink/40">XYZ</dt>
          <dd className="mt-2 font-display text-3xl">{property.map.duration}</dd>
        </div>
        <div>
          <dt className="label-tiny text-ink/40">XYZ</dt>
          <dd className="mt-2 font-display text-3xl">{property.map.place}</dd>
        </div>
      </dl>
    </section>
  )
}
