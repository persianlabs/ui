"use client"

import { CalendarDaysIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { DatePicker } from "@workspace/ui/components/date-picker"

export function DatePickerCustomTriggerExample() {
  return (
    <DatePicker
      defaultValue="today"
      renderTrigger={({ formattedValue, open }) => (
        <Button variant="secondary" className="min-w-64 justify-start">
          <CalendarDaysIcon className="size-4" />
          <span className="flex-1 text-start">
            {formattedValue ?? "انتخاب تاریخ تحویل"}
          </span>
          <ChevronDownIcon
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Button>
      )}
    />
  )
}
