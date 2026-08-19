import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { property } from '@/data/property'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function TypographyScene() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const words = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!root.current || reduced) return

    const ctx = gsap.context(() => {
      words.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { xPercent: i % 2 === 0 ? -18 : 22, opacity: 0.15 },
          {
            xPercent: i % 2 === 0 ? 12 : -16,
            opacity: 0.9,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ivory px-5 py-[18vh] text-ink md:px-10"
      aria-label="XYZ typography"
    >
      <h2 className="display-xl">
        <span className="block">{property.typography.lead[0]}</span>
        <span className="block italic">{property.typography.lead[1]}</span>
      </h2>

      <div className="relative mt-16 min-h-[42vh] md:mt-8">
        {property.typography.words.map((word, i) => (
          <span
            key={word}
            ref={(el) => {
              if (el) words.current[i] = el
            }}
            className="absolute font-display text-[clamp(1.6rem,4vw,3.2rem)] italic text-olive/80"
            style={{
              top: `${12 + i * 22}%`,
              left: i === 0 ? '8%' : i === 1 ? '58%' : i === 2 ? '28%' : '72%',
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  )
}
