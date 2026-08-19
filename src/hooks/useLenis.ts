import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSite } from '@/context/SiteContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getLenis, setLenisInstance } from '@/lib/lenis'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const { bookingOpen, menuOpen, ready } = useSite()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ready) return

    const lenis = new Lenis({
      duration: 1.2,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      autoRaf: false,
    })

    setLenisInstance(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [reduced, ready])

  useEffect(() => {
    const instance = getLenis()
    if (!instance) return
    if (bookingOpen || menuOpen) instance.stop()
    else instance.start()
  }, [bookingOpen, menuOpen])
}
