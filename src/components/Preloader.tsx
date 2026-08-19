import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { property } from '@/data/property'
import { useSite } from '@/context/SiteContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Preloader() {
  const { setReady } = useSite()
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const root = useRef<HTMLDivElement>(null)
  const top = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rootEl = root.current
    if (!rootEl) return

    if (reduced) {
      setReady(true)
      setVisible(false)
      return
    }

    const hero = new Image()
    hero.src = property.hero.image.src

    const progress = { value: 0 }
    const tween = gsap.to(progress, {
      value: 0.72,
      duration: 1.1,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (line.current) line.current.style.width = `${progress.value * 100}%`
      },
    })

    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.clearTimeout(maxWait)
      tween.kill()
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          setReady(true)
          setVisible(false)
        },
      })

      tl.to(progress, {
        value: 1,
        duration: 0.35,
        ease: 'power1.out',
        onUpdate: () => {
          if (line.current) line.current.style.width = `${progress.value * 100}%`
        },
      })
        .to(mark.current, { opacity: 0, y: -18, duration: 0.55 }, '+=0.08')
        .to(top.current, { yPercent: -101, duration: 0.95 }, '-=0.1')
        .to(bottom.current, { yPercent: 101, duration: 0.95 }, '<')
    }

    const maxWait = window.setTimeout(finish, 1700)
    hero.onload = () => {
      window.setTimeout(finish, 280)
    }
    hero.onerror = () => finish()

    return () => {
      window.clearTimeout(maxWait)
      tween.kill()
    }
  }, [reduced, setReady])

  if (!visible) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="XYZ loading"
    >
      <div ref={top} className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div ref={bottom} className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      <div
        ref={mark}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
      >
        <p className="font-display text-[18vw] leading-none tracking-[-0.04em] text-ivory md:text-[7rem]">
          {property.name}
        </p>
        <p className="mt-6 label-tiny text-ivory/55">{property.tagline}</p>
        <div className="mt-14 h-px w-40 overflow-hidden bg-ivory/15 md:w-56">
          <div ref={line} className="h-full w-0 bg-ivory" />
        </div>
      </div>
    </div>
  )
}
