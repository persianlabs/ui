"use client"

import { CalendarIcon } from "lucide-react"
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
  TimePicker,
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
          <TimePicker value={time} onValueChange={setTime} />
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
