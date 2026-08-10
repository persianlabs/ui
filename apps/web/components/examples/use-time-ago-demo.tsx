"use client"

import * as React from "react"

import { useTimeAgo } from "@workspace/ui/hooks/use-time-ago"

export function UseTimeAgoDemoExample() {
  const [time, setTime] = React.useState<number | null>(null)

  React.useEffect(() => {
    const init = () => setTime(Date.now() - 1000 * 60 * 60 * 2)
    init()
  }, [])

  const ago = useTimeAgo(time ?? 0)

  if (time == null) return null

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">آخرین بازدید</span>
      <output className="text-2xl font-semibold tracking-tight">{ago}</output>
    </div>
  )
}
