"use client"

import { DateTimePicker } from "@workspace/ui/components/date-picker"

export function DatePickerResponsiveExample() {
  return (
    <DateTimePicker
      presentation="auto"
      defaultValue={{
        date: "today",
        time: { hour: 9, minute: 30 },
      }}
    />
  )
}
