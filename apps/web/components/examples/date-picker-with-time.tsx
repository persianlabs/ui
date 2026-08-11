"use client"

import { CalendarIcon, ClockIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  formatTimePickerValue,
  ResponsiveTimePicker,
  ResponsiveTimePickerContent,
  ResponsiveTimePickerTrigger,
  type TimePickerValue,
} from "@workspace/ui/components/time-picker"
import { formatDate } from "@workspace/ui/lib/persian-date"

export function DatePickerWithTimeExample() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [time, setTime] = React.useState<TimePickerValue>({
    hour: 9,
    minute: 30,
  })
  const [today, setToday] = React.useState<Date | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const init = () => setToday(new Date())
    init()
  }, [])

  if (!today) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-64 justify-start font-normal">
            <CalendarIcon className="size-4" />
            {date
              ? `${formatDate(date, "yyyy/MM/dd")} - ${formatTimePickerValue(time)}`
              : "انتخاب تاریخ و ساعت"}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date ?? today}
          className="p-2"
        />
        <div className="flex flex-col items-center gap-2 border-t border-border p-3">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <ClockIcon className="size-4" />
              ساعت
            </span>
            <ResponsiveTimePicker>
              <ResponsiveTimePickerTrigger
                render={
                  <Button
                    variant="outline"
                    className="flex-1 justify-center text-center font-mono tabular-nums"
                  >
                    {formatTimePickerValue(time)}
                  </Button>
                }
              />
              <ResponsiveTimePickerContent
                value={time}
                onValueChange={setTime}
              />
            </ResponsiveTimePicker>
          </div>
          <Button
            size="sm"
            className="w-full"
            disabled={!date}
            onClick={() => setOpen(false)}
          >
            تایید
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
