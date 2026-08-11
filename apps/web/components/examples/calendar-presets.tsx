"use client"

import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
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

export function CalendarPresetsExample() {
  const [today, setToday] = React.useState<Date | null>(null)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [month, setMonth] = React.useState<Date | undefined>(undefined)

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
    setDate(next)
    setMonth(next)
  }

  return (
    <Card className="w-fit gap-4 py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">انتخاب سریع تاریخ</CardTitle>
        <CardDescription>
          یک بازه را انتخاب کنید تا روی تقویم اعمال شود.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4">
        <Select
          onValueChange={applyPreset}
          // SelectValue resolves the selected item's label from this map --
          // without it, the trigger would show the raw duration value
          // ("1d") instead of the label ("فردا") once something is picked.
          items={PRESETS.map((preset) => ({
            value: preset.duration,
            label: preset.label,
          }))}
        >
          <SelectTrigger className="w-full min-w-0">
            <SelectValue
              placeholder="یک گزینه را انتخاب کنید"
              className="truncate"
            />
          </SelectTrigger>
          <SelectContent>
            {PRESETS.map((preset) => (
              <SelectItem key={preset.label} value={preset.duration}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={month}
          onMonthChange={setMonth}
          className="p-0"
        />
      </CardContent>
    </Card>
  )
}
