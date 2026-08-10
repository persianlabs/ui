"use client"

import { useDate } from "@workspace/ui/hooks/use-date"

export function UseDatePatternExample() {
  const date = useDate({
    pattern: "EEEE d MMMM yyyy، ساعت HH:mm",
    digits: "en",
  })

  if (!date) return null

  const { formatted } = date

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">
        الگوی سفارشی با ارقام لاتین
      </span>
      <output className="text-xl font-medium">{formatted}</output>
    </div>
  )
}
