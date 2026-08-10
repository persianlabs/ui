"use client"

import * as React from "react"

import { useCountdown } from "@workspace/ui/hooks/use-countdown"

export function UseCountdownDemoExample() {
  const [target, setTarget] = React.useState<string | null>(null)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTarget(
        new Date(Date.now() + 1000 * (60 * 60 * 2 + 24 * 60 + 18)).toISOString()
      )
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  const countdown = useCountdown(target)

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">
        Early access ends in
      </span>
      <output className="font-mono text-4xl font-semibold tracking-tight tabular-nums">
        {countdown?.formatted ?? "--:--:--"}
      </output>
      <span className="text-xs text-muted-foreground">
        Limited-time release
      </span>
    </div>
  )
}
