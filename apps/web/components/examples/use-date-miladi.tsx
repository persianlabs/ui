"use client"

import { useDate } from "@workspace/ui/hooks/use-date"

export function UseDateMiladiExample() {
  const date = useDate({ calendarType: "miladi" })

  if (!date) return null

  const { formatted } = date

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">Now (Gregorian)</span>
      <output dir="ltr" className="font-mono text-3xl font-semibold tracking-tight tabular-nums">
        {formatted}
      </output>
    </div>
  )
}
