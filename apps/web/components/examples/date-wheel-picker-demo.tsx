"use client"

import { useState } from "react"

import { DateWheelPicker } from "@workspace/ui/components/date-wheel-picker"
import { formatDate, fromParts } from "@workspace/ui/lib/persian-date"

const DEFAULT_VALUE = fromParts({ year: 1403, month: 1, day: 1 }, "shamsi")

export function DateWheelPickerDemoExample() {
  const [value, setValue] = useState<Date>(DEFAULT_VALUE)

  return (
    <div className="flex flex-col items-center gap-3">
      <DateWheelPicker value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">
        {formatDate(value, "yyyy MMMM d")}
      </p>
    </div>
  )
}
