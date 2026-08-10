"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { useCountdown } from "@workspace/ui/hooks/use-countdown"

export function UseCountdownResetExample() {
  const [target, setTarget] = React.useState<string | null>(null)
  const [pausedSeconds, setPausedSeconds] = React.useState<number | null>(null)
  const countdown = useCountdown(target)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTarget(new Date(Date.now() + 5 * 60 * 1000).toISOString())
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  const pause = () => {
    if (!countdown) return

    setPausedSeconds(Math.max(0, countdown.totalSeconds))
    setTarget(null)
  }

  const play = () => {
    if (pausedSeconds == null) return

    setTarget(new Date(Date.now() + pausedSeconds * 1000).toISOString())
    setPausedSeconds(null)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <output className="font-mono text-3xl font-semibold tabular-nums">
        {countdown?.formatted ?? formatDuration(pausedSeconds)}
      </output>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={!countdown}
          onClick={pause}
        >
          Pause
        </Button>
        <Button size="sm" disabled={pausedSeconds == null} onClick={play}>
          Play
        </Button>
      </div>
    </div>
  )
}

function formatDuration(totalSeconds: number | null) {
  if (totalSeconds == null) return "--:--:--"

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (value: number) => String(value).padStart(2, "0")

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
