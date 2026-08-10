"use client"

import * as React from "react"

export type CountdownResult = {
  /** Whole hours remaining. Hours are not capped at 24. */
  hours: number
  /** Remaining whole minutes after hours. */
  minutes: number
  /** Remaining whole seconds after minutes. */
  seconds: number
  /** Signed remaining seconds. A negative value means the target has passed. */
  totalSeconds: number
  /** Whether the target time has passed. */
  isOverdue: boolean
  /** A zero-padded `HH:MM:SS` representation of the absolute duration. */
  formatted: string
}

function createCountdownResult(targetTime: number): CountdownResult {
  // Ceiling keeps a visible countdown from showing 00:00:00 before the target
  // is actually reached. Once it passes, the signed value becomes negative.
  const totalSeconds = Math.ceil((targetTime - Date.now()) / 1000)
  const isOverdue = totalSeconds < 0
  const absoluteSeconds = Math.abs(totalSeconds)
  const hours = Math.floor(absoluteSeconds / 3600)
  const minutes = Math.floor((absoluteSeconds % 3600) / 60)
  const seconds = absoluteSeconds % 60
  const pad = (value: number) => String(value).padStart(2, "0")

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    isOverdue,
    formatted: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
  }
}

/**
 * Returns the time remaining until an ISO-8601 date string, updating at the
 * next clock-second boundary. Pass `null` or an invalid date to disable it.
 */
export function useCountdown(targetIso: string | null): CountdownResult | null {
  const targetTime = targetIso ? new Date(targetIso).getTime() : Number.NaN

  const [result, setResult] = React.useState<CountdownResult | null>(null)

  React.useEffect(() => {
    if (!Number.isFinite(targetTime)) {
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const update = () => {
      setResult(createCountdownResult(targetTime))

      // Re-align after every update instead of relying on a drifting interval.
      const millisecondsUntilNextSecond = 1000 - (Date.now() % 1000)
      timeoutId = setTimeout(update, millisecondsUntilNextSecond)
    }

    update()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [targetTime])

  return Number.isFinite(targetTime) ? result : null
}
