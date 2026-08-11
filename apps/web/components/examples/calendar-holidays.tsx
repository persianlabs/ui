"use client"

import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"

export function CalendarHolidaysExample() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      showHolidays
      className="rounded-lg border"
    />
  )
}
