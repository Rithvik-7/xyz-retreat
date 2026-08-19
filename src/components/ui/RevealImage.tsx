import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Media } from '@/data/property'

gsap.registerPlugin(ScrollTrigger)

export type RevealStyle = 'clip-y' | 'clip-x' | 'scale' | 'mask-center' | 'parallax'

type Props = {
  media: Media
  reveal: RevealStyle
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
}

export function RevealImage({
  media,
  reveal,
  className,
  imgClassName,
  sizes = '(min-width: 1024px) 80vw, 100vw',
  priority = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img || reduced) return

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: wrap,
        start: 'top 88%',
      }

      if (reveal === 'clip-y') {
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.45,
            ease: 'power3.inOut',
            scrollTrigger: trigger,
          },
        )
        gsap.fromTo(
          img,
          { yPercent: 12, scale: 1.14 },
          {
            yPercent: 0,
            scale: 1,
            duration: 1.7,
            ease: 'power2.out',
            scrollTrigger: trigger,
          },
        )
      }

      if (reveal === 'clip-x') {
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.35,
            ease: 'power3.inOut',
            scrollTrigger: trigger,
          },
        )
      }

      if (reveal === 'scale') {
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(12% 12% 12% 12%)', scale: 0.92 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.55,
            ease: 'power3.out',
            scrollTrigger: trigger,
          },
        )
        gsap.fromTo(
          img,
          { scale: 1.2 },
          { scale: 1, duration: 1.8, ease: 'power2.out', scrollTrigger: trigger },
        )
      }

      if (reveal === 'mask-center') {
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(42% 38% 42% 38%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'power3.inOut',
            scrollTrigger: trigger,
          },
        )
      }

      if (reveal === 'parallax') {
        gsap.fromTo(
          wrap,
          { opacity: 0, y: 64 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: trigger,
          },
        )
        gsap.to(img, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, wrap)

    return () => ctx.revert()
  }, [reveal, reduced])

  return (
    <div ref={wrapRef} className={cn('overflow-hidden bg-ink-2', className)}>
      <img
        ref={imgRef}
        src={media.src}
        srcSet={media.srcSet}
        sizes={sizes}
        alt={media.alt}
        className={cn('h-full w-full object-cover will-change-transform', imgClassName)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
