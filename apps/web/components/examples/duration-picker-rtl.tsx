"use client"

import { useState } from "react"

import {
  DurationPicker,
  type DurationValue,
} from "@workspace/ui/components/duration-picker"

export function DurationPickerRtlExample() {
  const [duration, setDuration] = useState<DurationValue>({
    hours: 2,
    minutes: 45,
  })

  return (
    <div dir="rtl" className="rounded-xl border bg-card p-6">
      <div className="flex justify-center">
        <DurationPicker
          value={duration}
          onChange={setDuration}
          hoursLabel="ساعت"
          minutesLabel="دقیقه"
        />
      </div>
    </div>
  )
}
