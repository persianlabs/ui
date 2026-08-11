"use client"

import { useState } from "react"

import { DateWheelPicker } from "@workspace/ui/components/date-wheel-picker"
import { formatDate, fromParts } from "@workspace/ui/lib/persian-date"

const DEFAULT_VALUE = fromParts({ year: 1378, month: 4, day: 22 }, "shamsi")

export function DateWheelPickerRtlExample() {
  const [value, setValue] = useState<Date>(DEFAULT_VALUE)

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        تاریخ تولد خود را انتخاب کنید
      </p>
      <DateWheelPicker value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">
        {formatDate(value, "yyyy MMMM d")}
      </p>
    </div>
  )
}
