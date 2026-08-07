import { cn } from "@workspace/ui/lib/utils"

export function Steps({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "steps ms-4 border-s [counter-reset:step] md:ps-8",
        className
      )}
    >
      {children}
    </div>
  )
}

export function Step({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("step mt-6 text-sm font-medium first:mt-0", className)}>
      {children}
    </p>
  )
}
