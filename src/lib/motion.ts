export const motion = {
  duration: {
    xs: 0.35,
    sm: 0.55,
    md: 0.9,
    lg: 1.35,
    xl: 1.8,
  },
  ease: {
    luxe: [0.16, 1, 0.3, 1] as const,
    inOut: [0.77, 0, 0.175, 1] as const,
    out: [0.16, 1, 0.3, 1] as const,
  },
}

export const gsapEase = {
  luxe: 'power3.out',
  inOut: 'power3.inOut',
  soft: 'power2.out',
}
