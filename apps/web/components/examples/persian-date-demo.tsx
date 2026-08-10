"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  formatDate,
  type CalendarType,
  type DigitStyle,
} from "@workspace/ui/lib/persian-date"

export function PersianDateDemoExample() {
  const [calendarType, setCalendarType] = React.useState<CalendarType>(
    "shamsi"
  )
  const [digits, setDigits] = React.useState<DigitStyle>("fa")
  const [now, setNow] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => setNow(new Date())
    init()
  }, [])

  if (!now) return null

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <output
        dir="ltr"
        className="font-mono text-2xl font-semibold tracking-tight tabular-nums"
      >
        {formatDate(now, "yyyy/MM/dd - EEEE", { calendarType, digits })}
      </output>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          size="sm"
          variant={calendarType === "shamsi" ? "default" : "outline"}
          onClick={() => setCalendarType("shamsi")}
        >
          شمسی
        </Button>
        <Button
          size="sm"
          variant={calendarType === "miladi" ? "default" : "outline"}
          onClick={() => setCalendarType("miladi")}
        >
          میلادی
        </Button>
        <Button
          size="sm"
          variant={digits === "fa" ? "default" : "outline"}
          onClick={() => setDigits("fa")}
        >
          ارقام فارسی
        </Button>
        <Button
          size="sm"
          variant={digits === "en" ? "default" : "outline"}
          onClick={() => setDigits("en")}
        >
          ارقام لاتین
        </Button>
      </div>
    </div>
  )
}
