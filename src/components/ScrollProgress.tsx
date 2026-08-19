import { useEffect, useState } from 'react'
import { property } from '@/data/property'
import { scrollToId } from '@/lib/lenis'
import { cn } from '@/lib/cn'
import { useSite } from '@/context/SiteContext'

export function ScrollProgress() {
  const { bookingOpen } = useSite()
  const [active, setActive] = useState('01')

  useEffect(() => {
    const ids = property.scenes.map((s) => s.href.replace('#', ''))
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible?.target.id) return
        const scene = property.scenes.find((s) => s.href === `#${visible.target.id}`)
        if (scene) setActive(scene.id)
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: '-15% 0px -35% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block',
        (bookingOpen || active === '01') && 'opacity-0',
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {property.scenes.map((scene) => (
          <button
            key={scene.id}
            type="button"
            className={cn(
              'label-tiny transition-opacity duration-500',
              active === scene.id ? 'text-earth opacity-100' : 'text-ivory/35 hover:text-ivory/70',
            )}
            onClick={() => scrollToId(scene.href)}
          >
            {scene.label}
          </button>
        ))}
      </div>
    </div>
  )
}
