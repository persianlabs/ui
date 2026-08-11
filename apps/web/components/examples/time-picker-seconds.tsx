"use client"

import { useState } from "react"

import {
  formatTimePickerValue,
  TimePicker,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"

export function TimePickerSecondsExample() {
  const [value, setValue] = useState<TimePickerValue>({
    hour: 14,
    minute: 5,
    second: 45,
  })

  return (
    <div className="flex flex-col items-center gap-3">
      <TimePicker
        value={value}
        onValueChange={setValue}
        showSeconds
        showLabels
      />
      <p className="text-sm text-muted-foreground">
        {formatTimePickerValue(value, { showSeconds: true })}
      </p>
    </div>
  )
}
