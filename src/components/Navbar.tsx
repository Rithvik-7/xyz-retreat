import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { property } from '@/data/property'
import { useSite } from '@/context/SiteContext'
import { scrollToId } from '@/lib/lenis'
import { cn } from '@/lib/cn'

const leftLinks = property.nav.slice(0, 2)
const rightLinks = property.nav.slice(2)

export function Navbar() {
  const { ready, openBooking, menuOpen, setMenuOpen, setCursorHint, bookingOpen } = useSite()
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > window.innerHeight * 0.1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || bookingOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, bookingOpen])

  const go = (href: string) => {
    setMenuOpen(false)
    scrollToId(href)
  }

  const linkClass = compact
    ? 'text-ink/50 hover:text-ink'
    : 'text-ivory/70 hover:text-ivory'

  return (
    <>
      <header
        className={cn(
          'fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          compact
            ? 'inset-x-3 top-3 md:inset-x-6 md:top-5'
            : 'inset-x-3 top-3 md:inset-x-5 md:top-5 lg:inset-x-6 lg:top-6',
        )}
      >
        <div
          className={cn(
            'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            compact
              ? 'border border-ink/10 bg-ivory/90 px-5 py-3 text-ink backdrop-blur-md md:px-8 md:py-3.5'
              : 'border-b border-ivory/30 px-1 pb-4 pt-1 text-ivory md:px-2 md:pb-5',
            ready && !bookingOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end">
            <nav className="hidden items-end gap-8 lg:flex" aria-label="Primary">
              {leftLinks.map((item) => (
                <NavLink
                  key={item.id}
                  label={item.label}
                  className={linkClass}
                  onClick={() => go(item.href)}
                />
              ))}
            </nav>

            <button
              type="button"
              className="justify-self-center font-display text-[1.55rem] leading-none tracking-[0.42em] md:text-[1.75rem]"
              onClick={() => go('#hero')}
            >
              {property.name}
            </button>

            <div className="flex items-end justify-end gap-8">
              <nav className="hidden items-end gap-8 lg:flex" aria-label="More">
                {rightLinks.map((item) => (
                  <NavLink
                    key={item.id}
                    label={item.label}
                    className={linkClass}
                    onClick={() => go(item.href)}
                  />
                ))}
              </nav>

              <span
                aria-hidden="true"
                className={cn(
                  'hidden h-3 w-px lg:block',
                  compact ? 'bg-ink/20' : 'bg-ivory/35',
                )}
              />

              <button
                type="button"
                className={cn(
                  'hidden font-display text-[1.05rem] italic tracking-[0.04em] transition-opacity duration-300 hover:opacity-60 md:inline',
                  compact ? 'text-ink' : 'text-ivory',
                )}
                onMouseEnter={() => setCursorHint('book')}
                onMouseLeave={() => setCursorHint('default')}
                onClick={openBooking}
              >
                Book
              </button>

              <button
                type="button"
                className="label-tiny lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? 'CLOSE' : 'MENU'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-16 pt-28"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {property.nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  className="text-left font-display text-[14vw] leading-[0.9] text-ivory"
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(item.href)}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              type="button"
              className="mt-12 self-start font-display text-3xl italic text-ivory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              onClick={() => {
                setMenuOpen(false)
                openBooking()
              }}
            >
              Book →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({
  label,
  className,
  onClick,
}: {
  label: string
  className: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        'group relative pb-0.5 label-tiny transition-colors duration-500',
        className,
      )}
      onClick={onClick}
    >
      {label}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </button>
  )
}
