"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@workspace/ui/components/calendar"
import { toggleRangeSelection } from "@workspace/ui/lib/persian-date"

export function CalendarRangeExample() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const [today, setToday] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => setToday(new Date())
    init()
  }, [])

  if (!today) return null

  return (
    <Calendar
      mode="range"
      selected={range?.from ? range : undefined}
      modifiers={
        !range?.from && range?.to ? { range_end: range.to } : undefined
      }
      disabled={
        !range?.from && range?.to
          ? { after: range.to }
          : range?.from && !range.to
            ? { before: range.from }
            : undefined
      }
      onSelect={(_next, day) =>
        setRange((current) =>
          toggleRangeSelection(current ?? { from: undefined }, day)
        )
      }
      defaultMonth={today}
      className="rounded-lg border"
    />
  )
}
