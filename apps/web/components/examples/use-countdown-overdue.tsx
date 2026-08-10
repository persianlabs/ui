"use client"

import * as React from "react"

import { useCountdown } from "@workspace/ui/hooks/use-countdown"

export function UseCountdownOverdueExample() {
  const [target, setTarget] = React.useState<string | null>(null)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTarget(new Date(Date.now() - 1000 * (7 * 60 + 42)).toISOString())
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  const countdown = useCountdown(target)

  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="text-sm font-medium text-destructive">
        Invoice overdue
      </span>
      <output className="font-mono text-3xl font-semibold text-destructive tabular-nums">
        −{countdown?.formatted ?? "--:--:--"}
      </output>
      <span className="text-xs text-muted-foreground">
        totalSeconds: {countdown?.totalSeconds ?? 0}
      </span>
    </div>
  )
}
