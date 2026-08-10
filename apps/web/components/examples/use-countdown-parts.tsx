"use client"

import * as React from "react"

import { useCountdown } from "@workspace/ui/hooks/use-countdown"

const labels = ["Hours", "Minutes", "Seconds"]

export function UseCountdownPartsExample() {
  const [target, setTarget] = React.useState<string | null>(null)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTarget(
        new Date(Date.now() + 1000 * (26 * 60 * 60 + 5 * 60 + 9)).toISOString()
      )
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  const countdown = useCountdown(target)
  const values = [countdown?.hours, countdown?.minutes, countdown?.seconds]

  return (
    <div className="flex items-center gap-3">
      {values.map((value, index) => (
        <React.Fragment key={labels[index]}>
          {index > 0 && (
            <span className="pb-5 font-mono text-2xl text-muted-foreground">
              :
            </span>
          )}
          <div className="flex min-w-16 flex-col items-center gap-1.5">
            <output className="font-mono text-3xl font-semibold tabular-nums">
              {String(value ?? 0).padStart(2, "0")}
            </output>
            <span className="text-xs text-muted-foreground">
              {labels[index]}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
