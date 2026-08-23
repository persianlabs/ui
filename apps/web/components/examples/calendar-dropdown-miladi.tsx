"use client"

import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"

export function CalendarDropdownMiladiExample() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [today, setToday] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => {
      const now = new Date()
      setToday(now)
      setDate(now)
    }
    init()
  }, [])

  if (!today) return null

  return (
    <Calendar
      mode="single"
      calendarType="miladi"
      selected={date}
      onSelect={setDate}
      defaultMonth={today}
      captionLayout="dropdown"
      className="rounded-lg border"
    />
  )
}
