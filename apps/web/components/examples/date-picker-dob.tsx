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
import { formatDate, fromShamsi } from "@workspace/ui/lib/persian-date"

const EARLIEST_BIRTH_MONTH = fromShamsi({ year: 1300, month: 1, day: 1 })
const DEFAULT_BIRTH_MONTH = fromShamsi({ year: 1370, month: 1, day: 1 })

export function DatePickerDobExample() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
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
          <Button variant="outline" className="w-56 justify-start font-normal">
            <CalendarIcon className="size-4" />
            {date ? formatDate(date, "yyyy/MM/dd") : "تاریخ تولد"}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={(value) => {
            setDate(value)
            setOpen(false)
          }}
          defaultMonth={date ?? DEFAULT_BIRTH_MONTH}
          startMonth={EARLIEST_BIRTH_MONTH}
          endMonth={today}
          className="p-2"
        />
      </PopoverContent>
    </Popover>
  )
}
