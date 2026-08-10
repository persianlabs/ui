"use client"

import * as React from "react"

import { useTimeAgo } from "@workspace/ui/hooks/use-time-ago"

export function UseTimeAgoIntervalExample() {
  const [time, setTime] = React.useState<number | null>(null)

  React.useEffect(() => {
    const init = () => setTime(Date.now() - 1000 * 20)
    init()
  }, [])

  // Re-renders every second instead of the 30s default, useful for a
  // short-lived "just now" -> "N seconds ago" transition.
  const ago = useTimeAgo(time ?? 0, { updateInterval: 1000, showSecond: true })

  if (time == null) return null

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">
        به‌روزرسانی هر ۱ ثانیه
      </span>
      <output className="text-2xl font-semibold tracking-tight">{ago}</output>
    </div>
  )
}
