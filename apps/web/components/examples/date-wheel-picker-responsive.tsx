"use client"

import { CalendarIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  ResponsiveDateWheelPicker,
  ResponsiveDateWheelPickerContent,
  ResponsiveDateWheelPickerTrigger,
} from "@workspace/ui/components/date-wheel-picker"
import { formatDate, fromParts } from "@workspace/ui/lib/persian-date"

const DEFAULT_VALUE = fromParts({ year: 1403, month: 1, day: 1 }, "shamsi")

export function DateWheelPickerResponsiveExample() {
  const [value, setValue] = useState<Date>(DEFAULT_VALUE)

  return (
    <ResponsiveDateWheelPicker>
      <ResponsiveDateWheelPickerTrigger
        render={
          <Button variant="outline">
            <CalendarIcon />
            {formatDate(value, "yyyy/MM/dd")}
          </Button>
        }
      />
      <ResponsiveDateWheelPickerContent
        value={value}
        onValueChange={setValue}
      />
    </ResponsiveDateWheelPicker>
  )
}
