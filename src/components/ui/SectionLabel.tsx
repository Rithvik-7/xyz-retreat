import { cn } from '@/lib/cn'

export function SectionLabel({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <p className={cn('label-tiny text-current/55', className)}>{children}</p>
  )
}
