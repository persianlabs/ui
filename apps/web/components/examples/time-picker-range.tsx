"use client"

import { useState } from "react"

import {
  formatTimePickerValue,
  TimePicker,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"

function toMinutes(value: TimePickerValue): number {
  return value.hour * 60 + value.minute
}

export function TimePickerRangeExample() {
  const [from, setFrom] = useState<TimePickerValue>({ hour: 9, minute: 0 })
  const [to, setTo] = useState<TimePickerValue>({ hour: 17, minute: 0 })

  // Same-day time-of-day comparison only -- no calendar dates are involved,
  // so this doesn't need persian-date's date-range machinery.
  function handleFromChange(next: TimePickerValue) {
    setFrom(toMinutes(next) > toMinutes(to) ? to : next)
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium">From</p>
        <TimePicker value={from} onValueChange={handleFromChange} />
        <p className="text-sm text-muted-foreground">
          {formatTimePickerValue(from)}
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium">To</p>
        <TimePicker value={to} onValueChange={setTo} />
        <p className="text-sm text-muted-foreground">
          {formatTimePickerValue(to)}
        </p>
      </div>
    </div>
  )
}
