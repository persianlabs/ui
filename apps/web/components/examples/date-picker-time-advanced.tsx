"use client"

import { DateTimePicker } from "@workspace/ui/components/date-picker"

export function DatePickerTimeAdvancedExample() {
  return (
    <DateTimePicker
      defaultValue={{
        date: "today",
        time: { hour: 14, minute: 30, second: 15 },
      }}
      hourFormat="12"
      digits="en"
      showSeconds
      showTimeLabels
      dateFormat="EEEE d MMMM yyyy"
      timeLabel="زمان دقیق"
      className="w-80"
    />
  )
}
