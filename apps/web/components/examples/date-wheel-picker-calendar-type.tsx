"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { DateWheelPicker } from "@workspace/ui/components/date-wheel-picker"
import {
  type CalendarType,
  formatDate,
  fromParts,
} from "@workspace/ui/lib/persian-date"

// 1403 is a leap year in the Shamsi calendar (Esfand has 30 days), so this
// starts on Esfand 1403 -- move the year wheel down one step to 1404 (not
// leap, 29 days) to see the day wheel's option count change live.
const DEFAULT_VALUE = fromParts({ year: 1403, month: 12, day: 1 }, "shamsi")

export function DateWheelPickerCalendarTypeExample() {
  const [calendarType, setCalendarType] = useState<CalendarType>("shamsi")
  const [value, setValue] = useState<Date>(DEFAULT_VALUE)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={calendarType === "shamsi" ? "default" : "outline"}
          onClick={() => setCalendarType("shamsi")}
        >
          شمسی
        </Button>
        <Button
          size="sm"
          variant={calendarType === "miladi" ? "default" : "outline"}
          onClick={() => setCalendarType("miladi")}
        >
          Gregorian
        </Button>
      </div>
      <DateWheelPicker
        value={value}
        onValueChange={setValue}
        calendarType={calendarType}
        digits={calendarType === "shamsi" ? "fa" : "en"}
      />
      <p className="text-sm text-muted-foreground">
        {formatDate(value, "yyyy MMMM d", { calendarType })}
      </p>
    </div>
  )
}
