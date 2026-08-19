import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { property } from '@/data/property'
import { RevealImage } from '@/components/ui/RevealImage'
import { useSite } from '@/context/SiteContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function VisualStory() {
  const { setCursorHint } = useSite()
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const num1 = useRef<HTMLParagraphElement>(null)
  const sticky = useRef<HTMLDivElement>(null)
  const stickyImg = useRef<HTMLDivElement>(null)
  const stickyCopy = useRef<HTMLDivElement>(null)
  const { items, opener, index } = property.visualStory
  const [a, b, c, d, e] = items

  useEffect(() => {
    if (!root.current || reduced) return

    const ctx = gsap.context(() => {
      if (num1.current) {
        gsap.fromTo(
          num1.current,
          { yPercent: 18 },
          {
            yPercent: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: num1.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }

      if (sticky.current && stickyImg.current && stickyCopy.current) {
        gsap.fromTo(
          stickyImg.current,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sticky.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
        gsap.fromTo(
          stickyCopy.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sticky.current,
              start: 'top top',
              end: '45% top',
              scrub: true,
            },
          },
        )
      }
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="story" ref={root} className="overflow-hidden bg-ivory text-ink">
      <div className="flex flex-col justify-between gap-16 px-5 py-[16vh] md:flex-row md:items-end md:px-10 md:py-[18vh]">
        <p className="label-tiny text-ink/40">{index}</p>
        <h2 className="display-md max-w-[12ch] text-right md:text-left">
          {opener.map((line, i) => (
            <span key={line} className={i === opener.length - 1 ? 'block italic' : 'block'}>
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* 01 — monumental architecture */}
      <article className="relative px-0 pb-[8vh] md:pb-0">
        <p
          ref={num1}
          aria-hidden="true"
          className="pointer-events-none absolute top-[8%] left-[4vw] z-10 font-display text-[32vw] leading-[0.7] text-ink/[0.07] md:left-[6vw] md:text-[22vw]"
        >
          {a.num}
        </p>
        <figure
          className="relative ml-[6vw] w-[88vw] md:ml-[10vw] md:w-[72vw]"
          onMouseEnter={() => setCursorHint('view')}
          onMouseLeave={() => setCursorHint('default')}
        >
          <RevealImage
            media={a.image}
            reveal="clip-y"
            className="h-[62vh] md:h-[88vh]"
            sizes="80vw"
          />
          <figcaption className="mt-4 flex items-baseline justify-between pr-4">
            <span className="label-tiny text-ink/40">{a.caption}</span>
            <span className="font-display text-3xl italic md:text-5xl">{a.word}</span>
          </figcaption>
        </figure>
      </article>

      {/* 02 — interior postage, overlapping */}
      <article className="relative z-10 grid items-end gap-8 px-5 pb-[12vh] md:-mt-[22vh] md:grid-cols-12 md:px-10">
        <div className="md:col-span-5 md:col-start-1 md:pb-16">
          <p className="label-tiny text-ink/35">{b.num}</p>
          <p className="mt-4 font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] italic">
            {b.word}
          </p>
          <p className="mt-6 max-w-[16ch] text-sm font-light leading-relaxed text-ink/50">
            {b.note}
          </p>
        </div>
        <figure
          className="md:col-span-4 md:col-start-9"
          onMouseEnter={() => setCursorHint('view')}
          onMouseLeave={() => setCursorHint('default')}
        >
          <RevealImage
            media={b.image}
            reveal="clip-x"
            className="h-[56vh] md:h-[68vh]"
            sizes="32vw"
          />
          <figcaption className="mt-3 label-tiny text-ink/40">{b.caption}</figcaption>
        </figure>
      </article>

      {/* 03 — sticky cinematic landscape */}
      <article ref={sticky} className="relative h-[180vh] bg-ink">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div
            ref={stickyImg}
            className="absolute inset-0 origin-center"
            onMouseEnter={() => setCursorHint('view')}
            onMouseLeave={() => setCursorHint('default')}
          >
            <img
              src={c.image.src}
              srcSet={c.image.srcSet}
              sizes="100vw"
              alt={c.image.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div
            ref={stickyCopy}
            className="absolute inset-0 flex flex-col items-center justify-center text-center text-ivory"
          >
            <p className="label-tiny text-ivory/60">{c.note}</p>
            <p className="display-lg mt-6 italic">{c.word}</p>
          </div>
        </div>
      </article>

      {/* 04 — water, split spread */}
      <article className="grid items-stretch md:grid-cols-12">
        <figure
          className="md:col-span-8"
          onMouseEnter={() => setCursorHint('view')}
          onMouseLeave={() => setCursorHint('default')}
        >
          <RevealImage
            media={d.image}
            reveal="mask-center"
            className="h-[56vh] md:h-[92vh]"
            sizes="70vw"
          />
        </figure>
        <div className="flex flex-col justify-between px-5 py-10 md:col-span-4 md:px-10 md:py-16">
          <p className="label-tiny text-ink/40">{d.caption}</p>
          <div>
            <p className="font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.8]">
              {d.word}
            </p>
            <p className="mt-8 max-w-[12ch] text-sm font-light leading-relaxed text-ink/50">
              {d.note}
            </p>
          </div>
        </div>
      </article>

      {/* 05 — still hours */}
      <article className="grid items-center gap-12 px-5 py-[16vh] md:grid-cols-12 md:gap-0 md:px-10 md:py-[20vh]">
        <figure
          className="md:col-span-5 md:col-start-2"
          onMouseEnter={() => setCursorHint('view')}
          onMouseLeave={() => setCursorHint('default')}
        >
          <RevealImage
            media={e.image}
            reveal="parallax"
            className="h-[58vh] md:h-[72vh]"
            sizes="42vw"
          />
          <figcaption className="mt-3 label-tiny text-ink/40">{e.caption}</figcaption>
        </figure>
        <div className="md:col-span-4 md:col-start-8">
          <p className="label-tiny text-ink/40">{e.num}</p>
          <p className="mt-6 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] italic">
            {e.word}
          </p>
          <p className="mt-8 max-w-[14ch] text-[1.05rem] font-light leading-relaxed text-ink/55">
            {e.note}
          </p>
        </div>
      </article>
    </section>
  )
}
