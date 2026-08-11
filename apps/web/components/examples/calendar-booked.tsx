"use client"

import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"
import { addDays } from "@workspace/ui/lib/persian-date"

export function CalendarBookedExample() {
  const [today, setToday] = React.useState<Date | null>(null)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  React.useEffect(() => {
    const init = () => setToday(new Date())
    init()
  }, [])

  if (!today) return null

  const bookedDates = [2, 5, 6, 12, 20].map((offset) => addDays(today, offset))

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={today}
      disabled={bookedDates}
      modifiers={{ booked: bookedDates }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
      className="rounded-lg border"
    />
  )
}
