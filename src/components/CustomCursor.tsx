import { useEffect, useRef } from 'react'
import { useSite } from '@/context/SiteContext'
import { useFinePointer } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

export function CustomCursor() {
  const { cursorHint } = useSite()
  const fine = useFinePointer()
  const dot = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    if (!fine) return
    document.documentElement.classList.add('has-cursor')

    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    let raf = 0
    const loop = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.18
      pos.current.y += (pos.current.ty - pos.current.y) * 0.18
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [fine])

  if (!fine) return null

  const expanded = cursorHint !== 'default'
  const label =
    cursorHint === 'view'
      ? 'VIEW'
      : cursorHint === 'explore'
        ? 'EXPLORE'
        : cursorHint === 'book'
          ? 'BOOK'
          : ''

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      style={{ transform: 'translate3d(-100px,-100px,0)' }}
    >
      <div
        className={cn(
          '-translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          expanded
            ? 'flex h-16 w-16 items-center justify-center bg-ivory/10'
            : 'h-2 w-2 bg-ivory',
        )}
      >
        {label ? (
          <span className="label-tiny text-[0.52rem] text-ivory">{label}</span>
        ) : null}
      </div>
    </div>
  )
}
