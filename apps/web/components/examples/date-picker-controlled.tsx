"use client"

import * as React from "react"

import { DatePicker } from "@workspace/ui/components/date-picker"
import { formatDate } from "@workspace/ui/lib/persian-date"

export function DatePickerControlledExample() {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div className="grid gap-3 text-center">
      <DatePicker value={date} onValueChange={setDate} />
      <p className="text-sm text-muted-foreground">
        {date
          ? `مقدار کنترل‌شده: ${formatDate(date, "yyyy/MM/dd")}`
          : "هنوز تاریخی انتخاب نشده"}
      </p>
    </div>
  )
}
