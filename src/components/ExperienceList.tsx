import { useEffect, useRef, useState } from 'react'
import { property } from '@/data/property'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useFinePointer } from '@/hooks/useMedia'
import { useSite } from '@/context/SiteContext'
import { cn } from '@/lib/cn'
import type { Experience } from '@/data/property'

export function ExperienceList() {
  const { items, headline, index } = property.experiences
  const [active, setActive] = useState<Experience | null>(null)
  const preview = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const { setCursorHint, openBooking } = useSite()
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    if (!fine) return
    let raf = 0
    const loop = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.12
      pos.current.y += (pos.current.ty - pos.current.y) * 0.12
      if (preview.current) {
        preview.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [fine])

  return (
    <section id="experiences" className="relative bg-cream px-5 py-28 text-ink md:px-10 md:py-[18vh]">
      <SectionLabel>{index}</SectionLabel>
      <h2 className="display-lg mt-10 max-w-[12ch]">
        <span className="block">{headline[0]}</span>
        <span className="block">{headline[1]}</span>
        <span className="block italic">{headline[2]}</span>
      </h2>

      <ul className="mt-20 border-t border-ink/10">
        {items.map((item) => {
          const on = active?.id === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                className={cn(
                  'group flex w-full items-baseline justify-between gap-6 border-b border-ink/10 py-7 text-left transition-opacity duration-500 md:py-9',
                  active && !on ? 'opacity-30' : 'opacity-100',
                )}
                onMouseEnter={(e) => {
                  setActive(item)
                  setCursorHint('view')
                  pos.current.tx = e.clientX + 28
                  pos.current.ty = e.clientY - 40
                }}
                onMouseMove={(e) => {
                  pos.current.tx = e.clientX + 28
                  pos.current.ty = e.clientY - 40
                }}
                onMouseLeave={() => {
                  setActive(null)
                  setCursorHint('default')
                }}
                onClick={openBooking}
              >
                <span className="flex min-w-0 items-baseline gap-6 md:gap-10">
                  <span className="label-tiny text-ink/40">{item.id}</span>
                  <span
                    className={cn(
                      'font-display text-[clamp(1.8rem,5vw,4.4rem)] leading-none tracking-[-0.03em] transition-transform duration-500',
                      on ? 'translate-x-3 italic' : '',
                    )}
                  >
                    {item.title}
                  </span>
                </span>
                <span
                  className={cn(
                    'label-tiny text-ink/50 transition-opacity duration-500',
                    on ? 'opacity-100' : 'opacity-0 md:opacity-0',
                  )}
                >
                  →
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {fine && (
        <div
          ref={preview}
          aria-hidden="true"
          className={cn(
            'pointer-events-none fixed top-0 left-0 z-30 h-72 w-52 overflow-hidden bg-ink-2 shadow-none transition-opacity duration-300',
            active ? 'opacity-100' : 'opacity-0',
          )}
        >
          {items.map((item) => (
            <img
              key={item.id}
              src={item.image.src}
              alt=""
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
                active?.id === item.id ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
        </div>
      )}
    </section>
  )
}
