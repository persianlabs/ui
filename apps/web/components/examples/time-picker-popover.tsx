"use client"

import { ClockIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  formatTimePickerValue,
  TimePicker,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"

export function TimePickerPopoverExample() {
  const [value, setValue] = useState<TimePickerValue>({ hour: 10, minute: 0 })

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline">
            <ClockIcon />
            {formatTimePickerValue(value)}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-3">
        <TimePicker value={value} onValueChange={setValue} />
      </PopoverContent>
    </Popover>
  )
}
