"use client"

import * as React from "react"

import { Calendar, type CalendarType } from "@workspace/ui/components/calendar"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

export function CalendarCalendarTypeExample() {
  const [calendarType, setCalendarType] = React.useState<CalendarType>("shamsi")
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
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup
        value={[calendarType]}
        onValueChange={(next) => {
          const value = next[0] as CalendarType | undefined
          if (value) setCalendarType(value)
        }}
      >
        <ToggleGroupItem value="shamsi">شمسی</ToggleGroupItem>
        <ToggleGroupItem value="miladi">Miladi</ToggleGroupItem>
      </ToggleGroup>
      <Calendar
        mode="single"
        calendarType={calendarType}
        selected={date}
        onSelect={setDate}
        defaultMonth={today}
        className="rounded-lg border"
      />
    </div>
  )
}
