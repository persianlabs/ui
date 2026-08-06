"use client"

import * as React from "react"

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

export function formatTimeAgo(date: Date | string | number): string {
  const seconds = Math.round((new Date(date).getTime() - Date.now()) / 1000)

  for (const [unit, secondsInUnit] of UNITS) {
    if (Math.abs(seconds) >= secondsInUnit || unit === "second") {
      return rtf.format(Math.round(seconds / secondsInUnit), unit)
    }
  }

  return rtf.format(0, "second")
}

/**
 * Relative "time ago" text for a date, kept fresh on an interval.
 * Returns null until mounted so server and first client render match —
 * the real value fills in a moment after hydration.
 */
export function useTimeAgo(
  date: Date | string | number | null | undefined,
  updateIntervalMs = 60_000
): string | null {
  const [text, setText] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (date == null) {
      setText(null)
      return
    }

    function update() {
      if (date != null) {
        setText(formatTimeAgo(date))
      }
    }

    update()
    const id = setInterval(update, updateIntervalMs)
    return () => clearInterval(id)
  }, [date, updateIntervalMs])

  return text
}
