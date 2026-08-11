"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Calendar, type CalendarType } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { formatDate } from "@workspace/ui/lib/persian-date"

export function DatePickerCalendarTypeExample() {
  const [calendarType, setCalendarType] = React.useState<CalendarType>("shamsi")
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [today, setToday] = React.useState<Date | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const init = () => setToday(new Date())
    init()
  }, [])

  if (!today) return null

  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup
        value={[calendarType]}
        onValueChange={(next) => {
          const value = next[0] as CalendarType | undefined
          if (value) setCalendarType(value)
        }}
      >
        <ToggleGroupItem value="shamsi">شمسی</ToggleGroupItem>
        <ToggleGroupItem value="miladi">Miladi</ToggleGroupItem>
      </ToggleGroup>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="w-56 justify-start font-normal"
            >
              <CalendarIcon className="size-4" />
              {date
                ? formatDate(date, "yyyy/MM/dd", { calendarType })
                : "انتخاب تاریخ"}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            calendarType={calendarType}
            selected={date}
            onSelect={(value) => {
              setDate(value)
              setOpen(false)
            }}
            defaultMonth={date ?? today}
            className="p-2"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
