"use client"

import { DatePicker } from "@workspace/ui/components/date-picker"
import { addDays } from "@workspace/ui/lib/persian-date"

export function DatePickerConstrainedExample() {
  const today = new Date()

  return (
    <DatePicker
      defaultValue="today"
      placeholder="۷ روز آینده"
      calendarProps={{
        disabled: [{ before: today }, { after: addDays(today, 7) }],
      }}
    />
  )
}
