"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { useCountdown } from "@workspace/ui/hooks/use-countdown"

export function UseCountdownResetExample() {
  const [target, setTarget] = React.useState<string | null>(null)
  const countdown = useCountdown(target)

  return (
    <div className="flex flex-col items-center gap-3">
      <output className="font-mono text-3xl font-semibold tabular-nums">
        {countdown?.formatted ?? "Paused"}
      </output>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() =>
            setTarget(new Date(Date.now() + 5 * 60 * 1000).toISOString())
          }
        >
          Start 5 minutes
        </Button>
        <Button size="sm" variant="outline" onClick={() => setTarget(null)}>
          Pause
        </Button>
      </div>
    </div>
  )
}
