"use client"

import { useState } from "react"

import {
  formatTimePickerValue,
  TimePicker,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"

export function TimePickerDemoExample() {
  const [value, setValue] = useState<TimePickerValue>({ hour: 9, minute: 30 })

  return (
    <div className="flex flex-col items-center gap-3">
      <TimePicker value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">
        {formatTimePickerValue(value)}
      </p>
    </div>
  )
}
