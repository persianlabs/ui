"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  formatDate,
  isToday,
  today,
} from "@workspace/ui/lib/persian-date"

const UNITS = [
  { key: "day", label: "روز" },
  { key: "week", label: "هفته" },
  { key: "month", label: "ماه" },
  { key: "year", label: "سال" },
] as const

type Unit = (typeof UNITS)[number]["key"]

function shift(date: Date, unit: Unit, amount: number): Date {
  switch (unit) {
    case "day":
      return addDays(date, amount)
    case "week":
      return addWeeks(date, amount)
    case "month":
      return addMonths(date, amount)
    case "year":
      return addYears(date, amount)
  }
}

export function UseDateNavigatorExample() {
  const [date, setDate] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => setDate(today())
    init()
  }, [])

  if (!date) return null

  return (
    <div className="flex flex-col items-center gap-4 text-center" dir="rtl">
      <div className="flex min-h-16 flex-col items-center gap-1">
        <output className="text-2xl font-semibold tracking-tight tabular-nums">
          {formatDate(date, "EEEE dd MMMM yyyy")}
        </output>
        {!isToday(date) && (
          <button
            type="button"
            onClick={() => setDate(today())}
            className="text-xs text-muted-foreground underline underline-offset-4"
          >
            بازگشت به امروز
          </button>
        )}
      </div>

      <div className="grid w-full max-w-xs grid-cols-2 gap-2">
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex items-center justify-between gap-1 rounded-md border px-2 py-1"
          >
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label={`${unit.label} قبل`}
              onClick={() =>
                setDate((current) => shift(current!, unit.key, -1))
              }
            >
              <ChevronLeft className="rtl:-scale-x-100" />
            </Button>
            <span className="text-xs text-muted-foreground">{unit.label}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label={`${unit.label} بعد`}
              onClick={() => setDate((current) => shift(current!, unit.key, 1))}
            >
              <ChevronRight className="rtl:-scale-x-100" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
