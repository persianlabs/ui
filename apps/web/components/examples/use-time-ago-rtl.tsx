"use client"

import * as React from "react"

import { useTimeAgo } from "@workspace/ui/hooks/use-time-ago"

export function UseTimeAgoRtlExample() {
  const [time, setTime] = React.useState<number | null>(null)

  React.useEffect(() => {
    const init = () => setTime(Date.now() - 1000 * 60 * 60 * 5)
    init()
  }, [])

  const ago = useTimeAgo(time ?? 0)

  if (time == null) return null

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-sm text-muted-foreground">آخرین پیام</p>
      <p className="text-lg font-medium">علی احمدی — {ago}</p>
    </div>
  )
}
