"use client"

import { useState } from "react"

import {
  DurationPicker,
  type DurationValue,
} from "@workspace/ui/components/duration-picker"

export function DurationPickerDemoExample() {
  const [duration, setDuration] = useState<DurationValue>({
    hours: 1,
    minutes: 30,
  })

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex justify-center">
        <DurationPicker
          value={duration}
          onChange={setDuration}
          onConfirm={(value) => console.log("saved", value)}
        />
      </div>
    </div>
  )
}
