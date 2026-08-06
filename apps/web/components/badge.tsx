import { cn } from "@workspace/ui/lib/utils"

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode
  variant?: "default" | "muted"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] leading-none font-medium",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "muted" && "bg-muted text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}
