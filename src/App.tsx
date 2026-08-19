import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteProvider, useSite } from '@/context/SiteContext'
import { useLenis } from '@/hooks/useLenis'
import { Preloader } from '@/components/Preloader'
import { Navbar } from '@/components/Navbar'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Hero } from '@/components/Hero'
import { Arrival } from '@/components/Arrival'
import { TypographyScene } from '@/components/TypographyScene'
import { VisualStory } from '@/components/VisualStory'
import { StaySection } from '@/components/StaySection'
import { ExperienceList } from '@/components/ExperienceList'
import { CinematicBreak } from '@/components/CinematicBreak'
import { Details } from '@/components/Details'
import { Architecture } from '@/components/Architecture'
import { Journal } from '@/components/Journal'
import { Testimonials } from '@/components/Testimonials'
import { Location } from '@/components/Location'
import { FinalCTA } from '@/components/FinalCTA'
import { BookingDrawer } from '@/components/BookingDrawer'
import { Footer } from '@/components/Footer'
import { scrollToId } from '@/lib/lenis'

function Site() {
  useLenis()
  const { ready } = useSite()

  useEffect(() => {
    if (!ready) return
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80)
    return () => window.clearTimeout(id)
  }, [ready])

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('#hero')
        }}
      >
        Skip to content
      </a>
      <Preloader />
      <CustomCursor />
      <Navbar />
      {ready && <ScrollProgress />}
      <main>
        <Hero />
        <Arrival />
        <TypographyScene />
        <VisualStory />
        <StaySection />
        <ExperienceList />
        <CinematicBreak />
        <Details />
        <Architecture />
        <Journal />
        <Testimonials />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <BookingDrawer />
    </>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <Site />
    </SiteProvider>
  )
}
