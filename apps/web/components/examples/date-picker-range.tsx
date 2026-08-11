"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Drawer,
  DrawerFooter,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { useIsMobile } from "@workspace/ui/hooks/use-media-query"
import {
  formatDate,
  toggleRangeSelection,
} from "@workspace/ui/lib/persian-date"

export function DatePickerRangeExample() {
  const isMobile = useIsMobile()
  const [range, setRange] = React.useState<DateRange | undefined>()
  const [draft, setDraft] = React.useState<DateRange | undefined>()
  const [open, setOpen] = React.useState(false)

  const label = range?.from
    ? range.to
      ? `${formatDate(range.from, "yyyy/MM/dd")} تا ${formatDate(range.to, "yyyy/MM/dd")}`
      : formatDate(range.from, "yyyy/MM/dd")
    : range?.to
      ? `— تا ${formatDate(range.to, "yyyy/MM/dd")}`
      : "انتخاب بازه"
  const trigger = (
    <Button variant="outline" className="w-64 justify-start font-normal">
      <CalendarIcon className="size-4" />
      {label}
    </Button>
  )

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={trigger} />
        <PopoverContent className="w-auto p-0">
          <RangeCalendar value={range} onValueChange={setRange} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setDraft(range)
      }}
    >
      <DrawerTrigger render={trigger} />
      <DrawerPopup showBar>
        <DrawerTitle className="sr-only">انتخاب بازه تاریخ</DrawerTitle>
        <DrawerPanel scrollable className="flex justify-center p-2">
          <RangeCalendar value={draft} onValueChange={setDraft} inDrawer />
        </DrawerPanel>
        <DrawerFooter>
          <Button
            className="w-full"
            disabled={!draft?.from || !draft.to}
            onClick={() => {
              setRange(draft)
              setOpen(false)
            }}
          >
            تکمیل
          </Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}

function RangeCalendar({
  value,
  onValueChange,
  inDrawer = false,
}: {
  value: DateRange | undefined
  onValueChange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  inDrawer?: boolean
}) {
  const loneTo = !value?.from ? value?.to : undefined

  return (
    <Calendar
      mode="range"
      selected={value?.from ? value : undefined}
      modifiers={loneTo ? { range_end: loneTo } : undefined}
      disabled={
        loneTo
          ? { after: loneTo }
          : value?.from && !value.to
            ? { before: value.from }
            : undefined
      }
      onSelect={(_next, day) =>
        onValueChange((current) =>
          toggleRangeSelection(current ?? { from: undefined }, day)
        )
      }
      defaultMonth={value?.from ?? value?.to}
      className={inDrawer ? "rounded-xl border bg-transparent p-2" : "p-2"}
    />
  )
}
