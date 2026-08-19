import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'line' | 'outline'
}

export function EditorialButton({
  children,
  variant = 'line',
  className,
  ...props
}: Props) {
  if (variant === 'outline') {
    return (
      <button
        type="button"
        className={cn(
          'group inline-flex items-center gap-4 border border-current px-6 py-3.5 text-[0.72rem] tracking-[0.28em] uppercase transition-colors duration-500',
          className,
        )}
        {...props}
      >
        <span className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
        >
          →
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className={cn(
        'group relative inline-flex items-center gap-3 pb-1.5 text-[0.72rem] tracking-[0.28em] uppercase',
        className,
      )}
      {...props}
    >
      <span className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
      >
        →
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.35] bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </button>
  )
}
