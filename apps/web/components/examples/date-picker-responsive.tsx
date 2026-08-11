"use client"

import { CalendarIcon, ClockIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Drawer,
  DrawerFooter,
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
  const [open, setOpen] = useState(false)
  const isDesktop = !useIsMobile()

  const trigger = (
    <Button variant="outline" className="w-64 justify-start font-normal">
      <CalendarIcon className="size-4" />
      {formatDate(date, "yyyy/MM/dd")} - {formatTimePickerValue(time)}
    </Button>
  )

  const content = (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(nextDate) => nextDate && setDate(nextDate)}
        defaultMonth={date}
        className="p-2"
      />
      <div className="flex w-full max-w-60 flex-col items-center gap-2 border-t border-border p-3">
        <ResponsiveTimePicker>
          <ResponsiveTimePickerTrigger
            render={
              <Button variant="outline" className="w-full justify-start">
                <ClockIcon className="size-4" />
                انتخاب زمان
                <span className="ms-auto font-mono tabular-nums">
                  {formatTimePickerValue(time)}
                </span>
              </Button>
            }
          />
          <ResponsiveTimePickerContent value={time} onValueChange={setTime} />
        </ResponsiveTimePicker>
        {isDesktop && (
          <Button size="sm" className="w-full" onClick={() => setOpen(false)}>
            تایید
          </Button>
        )}
      </div>
    </>
  )

  return isDesktop ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={trigger} />
      <PopoverContent className="w-auto p-0">{content}</PopoverContent>
    </Popover>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={trigger} />
      <DrawerPopup showBar>
        <DrawerPanel scrollable={false} className="flex flex-col items-center">
          {content}
        </DrawerPanel>
        <DrawerFooter>
          <Button className="w-full" onClick={() => setOpen(false)}>
            تایید
          </Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
