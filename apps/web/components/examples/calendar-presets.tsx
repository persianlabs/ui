"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Drawer,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { useIsMobile } from "@workspace/ui/hooks/use-media-query"
import type { CalendarType } from "@workspace/ui/lib/persian-date"
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  formatDate,
} from "@workspace/ui/lib/persian-date"

/**
 * Applies a space-separated duration string to `base`, e.g. "1d", "-1d",
 * "1w", "1m", "1y", or a combination like "1y 1m 1w" (adds all three).
 * Units: d = day, w = week, m = month, y = year. Each token supports an
 * optional leading "-" for subtraction.
 */
function applyDuration(base: Date, duration: string): Date {
  let result = base

  for (const token of duration.trim().split(/\s+/)) {
    const match = /^(-?\d+)([dwmy])$/.exec(token)
    if (!match) continue

    const amount = Number(match[1])
    const unit = match[2]

    if (unit === "d") result = addDays(result, amount)
    else if (unit === "w") result = addWeeks(result, amount)
    else if (unit === "m") result = addMonths(result, amount)
    else if (unit === "y") result = addYears(result, amount)
  }

  return result
}

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

export function CalendarPresetsExample({
  calendarType = "shamsi",
}: {
  calendarType?: CalendarType
}) {
  const isMobile = useIsMobile()
  const [today, setToday] = React.useState<Date | null>(null)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [month, setMonth] = React.useState<Date | undefined>(undefined)
  const [activePreset, setActivePreset] = React.useState("0d")
  const [presetsOpen, setPresetsOpen] = React.useState(false)

  React.useEffect(() => {
    const init = () => {
      const now = new Date()
      setToday(now)
      setDate(now)
      setMonth(now)
    }
    init()
  }, [])

  if (!today) return null

  const applyPreset = (duration: string | null) => {
    if (!duration) return
    const next = applyDuration(today, duration)
    setActivePreset(duration)
    setDate(next)
    setMonth(next)
    setPresetsOpen(false)
  }

  if (isMobile) {
    return (
      <div className="w-fit max-w-full overflow-hidden rounded-xl border bg-background">
        <div className="px-3 pt-3">
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
              <DrawerPanel scrollable className="max-h-[70dvh] px-2 pt-4 pb-2">
                <PresetButtons
                  activePreset={activePreset}
                  onSelect={applyPreset}
                />
              </DrawerPanel>
            </DrawerPopup>
          </Drawer>
        </div>
        <div>
          <Calendar
            calendarType={calendarType}
            mode="single"
            selected={date}
            onSelect={(next) => {
              setDate(next)
              setActivePreset("")
            }}
            month={month}
            onMonthChange={setMonth}
            className="p-3"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-fit max-w-full flex-col items-start overflow-hidden rounded-xl border bg-background sm:flex-row">
      <div className="relative box-border min-h-0 shrink-0 self-stretch overflow-hidden border-b sm:w-48 sm:border-e sm:border-b-0">
        <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden">
          <p className="px-3 pt-3 pb-2 text-xs font-medium text-muted-foreground">
            انتخاب سریع
          </p>
          <ScrollArea className="min-h-0 flex-1 overflow-hidden">
            <PresetButtons
              activePreset={activePreset}
              onSelect={applyPreset}
              className="px-2 pb-5"
              showTooltips
              today={today}
              calendarType={calendarType}
            />
          </ScrollArea>
        </div>
      </div>
      <div className="shrink-0 self-start">
        <Calendar
          calendarType={calendarType}
          mode="single"
          selected={date}
          onSelect={(next) => {
            setDate(next)
            setActivePreset("")
          }}
          month={month}
          onMonthChange={setMonth}
          className="p-3"
        />
      </div>
    </div>
  )
}

function PresetButtons({
  activePreset,
  onSelect,
  className,
  showTooltips = false,
  today,
  calendarType = "shamsi",
}: {
  activePreset: string
  onSelect: (duration: string) => void
  className?: string
  showTooltips?: boolean
  today?: Date
  calendarType?: CalendarType
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr")

  React.useLayoutEffect(() => {
    if (!rootRef.current) return
    setDirection(
      getComputedStyle(rootRef.current).direction === "rtl" ? "rtl" : "ltr"
    )
  }, [])

  return (
    <TooltipProvider delay={1000}>
      <div ref={rootRef} className={`grid gap-1 ${className ?? ""}`}>
        {PRESETS.map((preset) => {
          const button = (
            <Button
              variant={activePreset === preset.duration ? "secondary" : "ghost"}
              size="sm"
              className="h-auto min-h-8 justify-start py-1.5 text-start whitespace-normal"
              onClick={() => onSelect(preset.duration)}
            >
              {preset.label}
            </Button>
          )

          if (!showTooltips || !today) {
            return (
              <React.Fragment key={preset.duration}>{button}</React.Fragment>
            )
          }

          const targetDate = applyDuration(today, preset.duration)
          const localizedDate = formatDate(targetDate, "yyyy d MMMM EEEE", {
            calendarType,
            locale: direction === "rtl" ? "fa" : "en",
            digits: direction === "rtl" ? "fa" : "en",
          })

          return (
            <Tooltip key={preset.duration}>
              <TooltipTrigger render={button} />
              <TooltipContent>{localizedDate}</TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
