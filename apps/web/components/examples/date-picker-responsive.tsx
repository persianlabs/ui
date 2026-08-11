"use client"

import { CalendarIcon, ClockIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Drawer,
  DrawerPanel,
  DrawerPopup,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
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
import { useIsMobile } from "@workspace/ui/hooks/use-media-query"
import { formatDate, fromParts } from "@workspace/ui/lib/persian-date"

const DEFAULT_DATE = fromParts({ year: 1403, month: 1, day: 1 }, "shamsi")

export function DatePickerResponsiveExample() {
  const [date, setDate] = useState<Date>(DEFAULT_DATE)
  const [time, setTime] = useState<TimePickerValue>({ hour: 9, minute: 30 })
  const [dateOpen, setDateOpen] = useState(false)
  const isDesktop = !useIsMobile()

  const dateTrigger = (
    <Button variant="outline" className="flex-1 justify-start font-normal">
      <CalendarIcon className="size-4" />
      {formatDate(date, "yyyy/MM/dd")}
    </Button>
  )

  const calendar = (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(nextDate) => {
        if (!nextDate) return
        setDate(nextDate)
        setDateOpen(false)
      }}
      defaultMonth={date}
      className="p-2"
    />
  )

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <CalendarIcon className="size-4" />
          تاریخ
        </span>
        {isDesktop ? (
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger render={dateTrigger} />
            <PopoverContent className="w-auto p-0">{calendar}</PopoverContent>
          </Popover>
        ) : (
          <Drawer open={dateOpen} onOpenChange={setDateOpen}>
            <DrawerTrigger render={dateTrigger} />
            <DrawerPopup showBar>
              <DrawerPanel
                scrollable={false}
                className="flex items-center justify-center pb-8"
              >
                {calendar}
              </DrawerPanel>
            </DrawerPopup>
          </Drawer>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <ClockIcon className="size-4" />
          زمان
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
          <ResponsiveTimePickerContent value={time} onValueChange={setTime} />
        </ResponsiveTimePicker>
      </div>
    </div>
  )
}
