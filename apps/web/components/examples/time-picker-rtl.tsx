"use client"

import { useState } from "react"

import {
  formatTimePickerValue,
  TimePicker,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"

export function TimePickerRtlExample() {
  const [value, setValue] = useState<TimePickerValue>({ hour: 16, minute: 30 })

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        زمان مراجعه را انتخاب کنید
      </p>
      <TimePicker value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">
        {formatTimePickerValue(value)}
      </p>
    </div>
  )
}
