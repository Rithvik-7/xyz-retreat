import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { property } from '@/data/property'
import { useSite } from '@/context/SiteContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { scrollToId } from '@/lib/lenis'
import { EditorialButton } from '@/components/ui/EditorialButton'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const { ready, openBooking, setCursorHint } = useSite()
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const imageWrap = useRef<HTMLDivElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const dock = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLSpanElement>(null)
  const line2 = useRef<HTMLSpanElement>(null)
  const support = useRef<HTMLParagraphElement>(null)
  const cta = useRef<HTMLDivElement>(null)
  const kicker = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ready || !root.current) return

    const ctx = gsap.context(() => {
      const intro = [kicker.current, line1.current, line2.current, support.current, cta.current]

      if (reduced) {
        gsap.set(imageWrap.current, { clipPath: 'inset(0% 0 0 0)' })
        gsap.set([...intro, dock.current], { opacity: 1, y: 0 })
        return
      }

      gsap.set(imageWrap.current, { clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set(intro, { opacity: 0, y: 32 })
      gsap.set(dock.current, { opacity: 0, y: 40 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(imageWrap.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.55,
        ease: 'power3.inOut',
      })
        .fromTo(
          image.current,
          { scale: 1.16 },
          { scale: 1.04, duration: 2, ease: 'power2.out' },
          0,
        )
        .to(kicker.current, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .to(line1.current, { opacity: 1, y: 0, duration: 1.05 }, 0.82)
        .to(line2.current, { opacity: 1, y: 0, duration: 1.15 }, 0.98)
        .to(support.current, { opacity: 1, y: 0, duration: 0.85 }, 1.18)
        .to(cta.current, { opacity: 1, y: 0, duration: 0.75 }, 1.3)
        .to(dock.current, { opacity: 1, y: 0, duration: 0.9 }, 1.15)

      gsap.to(image.current, {
        scale: 1.14,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(copy.current, {
        y: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(dock.current, {
        opacity: 0,
        y: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '35% top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [ready, reduced])

  const fields = property.booking.fields

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex h-svh min-h-[700px] flex-col bg-ivory p-3 md:p-5 lg:p-6"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-ink-2">
        <div
          ref={imageWrap}
          className="absolute inset-0 [clip-path:inset(0_0_100%_0)]"
        >
          <img
            ref={image}
            src={property.hero.image.src}
            srcSet={property.hero.image.srcSet}
            sizes="100vw"
            alt={property.hero.image.alt}
            className="h-full w-full origin-center object-cover object-[center_68%] will-change-transform"
            fetchPriority="high"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-ink/55 via-ink/15 to-transparent" />
        </div>

        <div
          ref={copy}
          className="absolute inset-x-0 top-0 z-10 flex h-[calc(100%-5.5rem)] flex-col justify-end px-5 pb-8 md:h-[calc(100%-6.25rem)] md:px-10 md:pb-10 lg:px-14"
        >
          <p ref={kicker} className="label-tiny text-ivory/70 opacity-0">
            {property.hero.kicker}
          </p>
          <h1 className="display-hero mt-5 text-ivory md:mt-6">
            <span ref={line1} className="block opacity-0">
              {property.hero.headline[0]}
            </span>
            <span ref={line2} className="mt-1 block italic opacity-0">
              {property.hero.headline[1]}
            </span>
          </h1>
          <div className="mt-7 flex max-w-xl flex-col items-start gap-8 md:mt-9 md:flex-row md:items-end md:justify-between md:gap-16">
            <p
              ref={support}
              className="max-w-[24ch] text-[0.95rem] font-light leading-relaxed tracking-[0.03em] text-ivory/82 opacity-0"
            >
              {property.hero.support}
            </p>
            <div ref={cta} className="opacity-0">
              <EditorialButton onClick={() => scrollToId('#arrival')}>
                {property.hero.cta}
              </EditorialButton>
            </div>
          </div>
        </div>

        <p className="pointer-events-none absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 rotate-90 label-tiny text-ivory/45 md:right-8 md:block">
          {property.retreat}
        </p>

        <div
          ref={dock}
          className="absolute inset-x-0 bottom-0 z-20 opacity-0"
        >
          <div className="grid grid-cols-2 border-t border-ink/10 bg-ivory text-ink md:grid-cols-4">
            <FieldButton
              label={fields.checkIn.label}
              value={fields.checkIn.placeholder}
              onClick={openBooking}
            />
            <FieldButton
              label={fields.checkOut.label}
              value={fields.checkOut.placeholder}
              onClick={openBooking}
            />
            <FieldButton
              label={fields.guests.label}
              value={fields.guests.placeholder}
              onClick={openBooking}
              className="hidden md:flex"
            />
            <button
              type="button"
              className="group flex min-h-[5.5rem] items-center justify-between gap-4 bg-ink px-5 text-ivory md:min-h-[6.25rem] md:px-8"
              onMouseEnter={() => setCursorHint('book')}
              onMouseLeave={() => setCursorHint('default')}
              onClick={openBooking}
            >
              <span className="label-tiny">BOOK</span>
              <span
                aria-hidden="true"
                className="font-display text-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FieldButton({
  label,
  value,
  onClick,
  className = '',
}: {
  label: string
  value: string
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[5.5rem] flex-col items-start justify-center border-r border-ink/10 px-5 text-left transition-colors duration-500 hover:bg-cream md:min-h-[6.25rem] md:px-8 ${className}`}
    >
      <span className="label-tiny text-ink/40">{label}</span>
      <span className="mt-2 font-display text-xl tracking-[-0.02em] md:text-2xl">
        {value}
      </span>
    </button>
  )
}
