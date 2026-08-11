"use client"

import { DateTimePicker } from "@workspace/ui/components/date-picker"

export function DatePickerWithTimeExample() {
  return (
    <DateTimePicker
      defaultValue={{
        date: "today",
        time: { hour: 9, minute: 30 },
      }}
    />
  )
}
