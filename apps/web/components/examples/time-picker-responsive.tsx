"use client"

import { ClockIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  formatTimePickerValue,
  ResponsiveTimePicker,
  ResponsiveTimePickerContent,
  ResponsiveTimePickerTrigger,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"

export function TimePickerResponsiveExample() {
  const [value, setValue] = useState<TimePickerValue>({ hour: 8, minute: 0 })

  return (
    <ResponsiveTimePicker>
      <ResponsiveTimePickerTrigger
        render={
          <Button variant="outline">
            <ClockIcon />
            {formatTimePickerValue(value)}
          </Button>
        }
      />
      <ResponsiveTimePickerContent value={value} onValueChange={setValue} />
    </ResponsiveTimePicker>
  )
}
