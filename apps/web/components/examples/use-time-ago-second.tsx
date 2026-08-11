"use client"

import * as React from "react"

import { useTimeAgo } from "@workspace/ui/hooks/use-time-ago"

export function UseTimeAgoSecondExample() {
  const [time, setTime] = React.useState<number | null>(null)

  React.useEffect(() => {
    const init = () => setTime(Date.now() - 1000 * 12)
    init()
  }, [])

  const withSeconds = useTimeAgo(time ?? 0, { showSecond: true })
  const withoutSeconds = useTimeAgo(time ?? 0)

  if (time == null) return null

  return (
    <div className="flex flex-col items-center gap-3 text-center text-sm">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground">showSecond: true</span>
        <span className="text-lg font-semibold">{withSeconds}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground">
          showSecond: false (پیش‌فرض)
        </span>
        <span className="text-lg font-semibold">{withoutSeconds}</span>
      </div>
    </div>
  )
}
