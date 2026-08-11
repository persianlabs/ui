"use client"

import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"

export function CalendarDemoExample() {
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
      selected={date}
      onSelect={setDate}
      defaultMonth={today}
      className="rounded-lg border"
    />
  )
}
