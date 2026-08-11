"use client"

import { DatePicker } from "@workspace/ui/components/date-picker"

export function DatePickerMiladiExample() {
  return (
    <div dir="ltr">
      <DatePicker
        calendarType="miladi"
        defaultValue="today"
        format="MMMM d, yyyy"
        placeholder="Pick a Gregorian date"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        drawerTitle="Pick a Gregorian date"
      />
    </div>
  )
}
