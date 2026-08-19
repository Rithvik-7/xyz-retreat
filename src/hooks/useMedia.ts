import { useEffect, useState } from 'react'

export function useMedia(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function useIsDesktop() {
  return useMedia('(min-width: 1024px)')
}

export function useFinePointer() {
  return useMedia('(hover: hover) and (pointer: fine)')
}
