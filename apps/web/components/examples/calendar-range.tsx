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
      numberOfMonths={2}
      selected={range}
      // react-day-picker only stays truly controlled by `selected` when
      // `onSelect` is provided -- without it, it silently falls back to its
      // own internal uncontrolled range state after the first render. Ignore
      // its own computed range and drive selection from our own toggle logic
      // instead, keyed off the clicked day (the 2nd callback argument).
      onSelect={(_range, day) =>
        setRange((current) =>
          toggleRangeSelection(current ?? { from: undefined }, day)
        )
      }
      defaultMonth={today}
      className="rounded-lg border"
    />
  )
}
