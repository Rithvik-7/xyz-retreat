import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CursorHint = 'default' | 'view' | 'explore' | 'book'

type SiteContextValue = {
  ready: boolean
  setReady: (value: boolean) => void
  bookingOpen: boolean
  openBooking: () => void
  closeBooking: () => void
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
  cursorHint: CursorHint
  setCursorHint: (hint: CursorHint) => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorHint, setCursorHint] = useState<CursorHint>('default')

  const openBooking = useCallback(() => {
    setMenuOpen(false)
    setBookingOpen(true)
  }, [])

  const closeBooking = useCallback(() => setBookingOpen(false), [])

  const value = useMemo(
    () => ({
      ready,
      setReady,
      bookingOpen,
      openBooking,
      closeBooking,
      menuOpen,
      setMenuOpen,
      cursorHint,
      setCursorHint,
    }),
    [ready, bookingOpen, openBooking, closeBooking, menuOpen, cursorHint],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
