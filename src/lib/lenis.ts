import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function setLenisInstance(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToId(id: string) {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 })
    return
  }
  el.scrollIntoView({ behavior: 'smooth' })
}
