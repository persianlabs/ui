"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  formatDate,
  toggleRangeSelection,
} from "@workspace/ui/lib/persian-date"

export function DatePickerRangeExample() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const [today, setToday] = React.useState<Date | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const init = () => setToday(new Date())
    init()
  }, [])

  if (!today) return null

  const label = range?.from
    ? range.to
      ? `${formatDate(range.from, "yyyy/MM/dd")} تا ${formatDate(range.to, "yyyy/MM/dd")}`
      : formatDate(range.from, "yyyy/MM/dd")
    : "انتخاب بازه"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-64 justify-start font-normal">
            <CalendarIcon className="size-4" />
            {label}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={range}
          // react-day-picker only stays truly controlled by `selected` when
          // `onSelect` is provided -- without it, it silently falls back to
          // its own internal uncontrolled range state after the first
          // render. Ignore its own computed range and drive selection from
          // our own toggle logic instead, keyed off the clicked day (the
          // 2nd callback argument): clicking an already-selected endpoint
          // clears just that one, and the next click refills whichever slot
          // is empty.
          onSelect={(_range, day) =>
            setRange((current) =>
              toggleRangeSelection(current ?? { from: undefined }, day)
            )
          }
          defaultMonth={range?.from ?? today}
          className="p-2"
        />
      </PopoverContent>
    </Popover>
  )
}
