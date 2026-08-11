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
import { formatDate } from "@workspace/ui/lib/persian-date"

export function DatePickerCloseOnSelectExample() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-56 justify-start font-normal">
            <CalendarIcon aria-hidden="true" className="size-4" />
            {date ? formatDate(date, "yyyy/MM/dd") : "انتخاب تاریخ"}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(next) => {
            setDate(next)
            if (next) setOpen(false)
          }}
          defaultMonth={date}
          className="p-2"
        />
      </PopoverContent>
    </Popover>
  )
}
