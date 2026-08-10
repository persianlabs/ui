"use client"

import * as React from "react"

import { formatDate } from "@workspace/ui/lib/persian-date"
import { useTimeAgo } from "@workspace/ui/hooks/use-time-ago"

export function UseTimeAgoMaxExample() {
  const [time, setTime] = React.useState<number | null>(null)

  React.useEffect(() => {
    const init = () => setTime(Date.now() - 1000 * 60 * 60 * 24 * 45) // 45 days ago
    init()
  }, [])

  const ago = useTimeAgo(time ?? 0, {
    max: "week",
    fullDateFormatter: (date) => formatDate(date, "d MMMM yyyy"),
  })

  if (time == null) return null

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">
        بعد از یک هفته، تاریخ کامل نمایش داده می‌شود
      </span>
      <output className="text-2xl font-semibold tracking-tight">{ago}</output>
    </div>
  )
}
