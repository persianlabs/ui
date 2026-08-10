"use client"

import { useDate } from "@workspace/ui/hooks/use-date"

export function UseDateRtlExample() {
  const date = useDate({
    pattern: "EEEE d MMMM yyyy",
  })

  const weekdayNames = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ]

  if (!date) return null

  const { formatted, weekday } = date

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-2xl font-semibold tracking-tight">{formatted}</p>
      <p className="text-sm text-muted-foreground">
        امروز {weekdayNames[weekday]} است.
      </p>
    </div>
  )
}
