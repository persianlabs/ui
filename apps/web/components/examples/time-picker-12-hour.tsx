"use client"

import { useState } from "react"

import {
  formatTimePickerValue,
  TimePicker,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"

export function TimePicker12HourExample() {
  const [value, setValue] = useState<TimePickerValue>({ hour: 18, minute: 15 })

  return (
    <div className="flex flex-col items-center gap-3">
      <TimePicker value={value} onValueChange={setValue} hourFormat="12" />
      <p className="text-sm text-muted-foreground">
        {formatTimePickerValue(value, { hourFormat: "12" })}
      </p>
    </div>
  )
}
