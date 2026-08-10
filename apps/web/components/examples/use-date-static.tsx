"use client"

import { useDate } from "@workspace/ui/hooks/use-date"

export function UseDateStaticExample() {
  // interval: 0 reads the time once on mount and never updates again.
  const date = useDate({ interval: 0 })

  if (!date) return null

  const { formatted } = date

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">
        فقط یک‌بار خوانده می‌شود (interval: 0)
      </span>
      <output dir="ltr" className="font-mono text-3xl font-semibold tracking-tight tabular-nums">
        {formatted}
      </output>
    </div>
  )
}
