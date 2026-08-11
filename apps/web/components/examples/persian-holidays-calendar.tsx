"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import {
  daysInMonth,
  eachDayOfRange,
  endOfMonth,
  formatDate,
  fromShamsi,
  isSameDay,
  startOfMonth,
} from "@workspace/ui/lib/persian-date"
import { getHolidaysInRange } from "@workspace/ui/lib/persian-holidays"

export function PersianHolidaysCalendarExample() {
  const monthStart = React.useMemo(
    () => fromShamsi({ year: 1404, month: 1, day: 1 }),
    []
  )
  const from = startOfMonth(monthStart)
  const to = endOfMonth(monthStart)

  const days = React.useMemo(() => eachDayOfRange(from, to), [from, to])
  const holidays = React.useMemo(() => getHolidaysInRange(from, to), [from, to])

  const isHolidayDay = (day: Date) =>
    holidays.some((holiday) => isSameDay(holiday.date, day))

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="text-center text-sm text-muted-foreground">
        فروردین ۱۴۰۴ — {daysInMonth(monthStart)} روز
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "flex aspect-square items-center justify-center rounded-md border border-border text-xs font-medium tabular-nums",
              isHolidayDay(day) &&
                "border-destructive/40 bg-destructive/10 text-destructive"
            )}
          >
            {formatDate(day, "d")}
          </div>
        ))}
      </div>
    </div>
  )
}
