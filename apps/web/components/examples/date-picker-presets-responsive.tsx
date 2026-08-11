"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"

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
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { useIsMobile } from "@workspace/ui/hooks/use-media-query"
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  formatDate,
} from "@workspace/ui/lib/persian-date"

const PRESETS = [
  { label: "امروز", duration: "0d" },
  { label: "فردا", duration: "1d" },
  { label: "دیروز", duration: "-1d" },
  { label: "تا یک هفته دیگر", duration: "1w" },
  { label: "تا یک ماه دیگر", duration: "1m" },
  { label: "تا یک سال دیگر", duration: "1y" },
  { label: "یک سال و یک ماه و یک هفته دیگر", duration: "1y 1m 1w" },
  { label: "تا ۲۰۰ روز دیگر", duration: "200d" },
  { label: "۲۰۰ روز پیش", duration: "-200d" },
]

function applyDuration(base: Date, duration: string) {
  let result = base
  for (const token of duration.split(" ")) {
    const match = /^(-?\d+)([dwmy])$/.exec(token)
    if (!match) continue
    const amount = Number(match[1])
    if (match[2] === "d") result = addDays(result, amount)
    if (match[2] === "w") result = addWeeks(result, amount)
    if (match[2] === "m") result = addMonths(result, amount)
    if (match[2] === "y") result = addYears(result, amount)
  }
  return result
}

export function DatePickerPresetsResponsiveExample() {
  const isMobile = useIsMobile()
  const [today, setToday] = React.useState<Date | null>(null)
  const [date, setDate] = React.useState<Date | undefined>()
  const [draft, setDraft] = React.useState<Date | undefined>()
  const [month, setMonth] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)
  const [presetsOpen, setPresetsOpen] = React.useState(false)

  React.useEffect(() => setToday(new Date()), [])

  const trigger = (
    <Button variant="outline" className="w-64 justify-start font-normal">
      <CalendarIcon className="size-4" />
      {date ? formatDate(date, "yyyy/MM/dd") : "تاریخ یا انتخاب سریع"}
    </Button>
  )
  const selectPreset = (duration: string, mobile = false) => {
    if (!today) return
    const next = applyDuration(today, duration)
    setMonth(next)
    if (mobile) {
      setDraft(next)
      setPresetsOpen(false)
    } else {
      setDate(next)
      setOpen(false)
    }
  }

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={trigger} />
        <PopoverContent className="w-auto p-0">
          <div className="flex w-fit items-start overflow-hidden rounded-xl bg-background">
            <div className="relative w-48 self-stretch overflow-hidden border-e">
              <div className="absolute inset-0 flex min-h-0 flex-col">
                <p className="px-3 pt-3 pb-2 text-xs font-medium text-muted-foreground">
                  انتخاب سریع
                </p>
                <ScrollArea className="min-h-0 flex-1">
                  <PresetButtons onSelect={selectPreset} />
                </ScrollArea>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(next) => {
                setDate(next)
                if (next) setOpen(false)
              }}
              month={month}
              onMonthChange={setMonth}
              className="p-3"
            />
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setDraft(date)
      }}
    >
      <DrawerTrigger render={trigger} />
      <DrawerPopup showBar>
        <DrawerTitle className="sr-only">انتخاب تاریخ</DrawerTitle>
        <DrawerPanel scrollable className="flex items-center justify-center">
          <div className="grid w-fit gap-4">
            <Drawer open={presetsOpen} onOpenChange={setPresetsOpen}>
              <DrawerTrigger
                render={
                  <Button variant="outline" className="w-full">
                    انتخاب سریع
                  </Button>
                }
              />
              <DrawerPopup showBar>
                <DrawerTitle className="sr-only">انتخاب سریع تاریخ</DrawerTitle>
                <DrawerPanel scrollable className="px-2 pt-4 pb-2">
                  <PresetButtons
                    onSelect={(duration) => selectPreset(duration, true)}
                  />
                </DrawerPanel>
              </DrawerPopup>
            </Drawer>
            <Calendar
              mode="single"
              selected={draft}
              onSelect={setDraft}
              month={month}
              onMonthChange={setMonth}
              className="rounded-xl border bg-transparent p-3"
            />
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <Button
            className="w-full"
            disabled={!draft}
            onClick={() => {
              setDate(draft)
              setOpen(false)
            }}
          >
            تایید
          </Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}

function PresetButtons({ onSelect }: { onSelect: (duration: string) => void }) {
  return (
    <div className="grid gap-1 px-2 pb-5">
      {PRESETS.map((preset) => (
        <Button
          key={preset.duration}
          variant="ghost"
          size="sm"
          className="h-auto min-h-8 justify-start py-1.5 text-start whitespace-normal"
          onClick={() => onSelect(preset.duration)}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  )
}
