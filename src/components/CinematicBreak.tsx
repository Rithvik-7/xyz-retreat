import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { property } from '@/data/property'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function CinematicBreak() {
  const root = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!root.current) return

    const ctx = gsap.context(() => {
      gsap.to(copy.current, {
        opacity: 0,
        y: -32,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      if (!reduced) {
        gsap.fromTo(
          media.current,
          { scale: 1 },
          {
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
      }
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="cinematic" ref={root} className="relative h-[180vh] bg-ink">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={media} className="absolute inset-0 origin-center">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={property.cinematic.image.src}
            aria-label={property.cinematic.image.alt}
          >
            <source src={property.cinematic.video} type="video/mp4" />
          </video>
        </div>
        <div
          ref={copy}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-ivory"
        >
          <h2 className="display-lg">
            <span className="block">{property.cinematic.headline[0]}</span>
            <span className="block italic">{property.cinematic.headline[1]}</span>
          </h2>
          <p className="mt-8 label-tiny text-ivory/70">{property.cinematic.kicker}</p>
        </div>
      </div>
    </section>
  )
}
