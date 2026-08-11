"use client"

import { useState } from "react"

import { DateWheelPicker } from "@workspace/ui/components/date-wheel-picker"
import { formatDate, fromParts } from "@workspace/ui/lib/persian-date"

// 1375 lands on the 1300 + n * 5 sequence produced by yearStep={5} below --
// a stepped year wheel only offers those aligned years.
const DEFAULT_VALUE = fromParts({ year: 1375, month: 6, day: 1 }, "shamsi")

export function DateWheelPickerStepExample() {
  const [value, setValue] = useState<Date>(DEFAULT_VALUE)

  return (
    <div className="flex flex-col items-center gap-3">
      <DateWheelPicker
        value={value}
        onValueChange={setValue}
        yearStep={5}
        minYear={1300}
        maxYear={1405}
      />
      <p className="text-sm text-muted-foreground">
        Birth decade: {formatDate(value, "yyyy MMMM d")}
      </p>
    </div>
  )
}
