"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import {
  addDays,
  eachDayOfRange,
  formatDate,
  fromShamsi,
  isWithinRange,
} from "@workspace/ui/lib/persian-date"

export function PersianDateRangeExample() {
  const from = React.useMemo(
    () => fromShamsi({ year: 1404, month: 6, day: 1 }),
    []
  )
  const to = React.useMemo(() => addDays(from, 6), [from])
  const probe = React.useMemo(() => addDays(from, 3), [from])

  const days = React.useMemo(() => eachDayOfRange(from, to), [from, to])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md border border-border text-xs font-medium tabular-nums",
              day.toDateString() === probe.toDateString() &&
                "border-primary bg-primary text-primary-foreground"
            )}
          >
            {formatDate(day, "d")}
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        {isWithinRange(probe, { from, to })
          ? "روز مشخص‌شده در بازهٔ انتخابی قرار دارد."
          : "روز مشخص‌شده خارج از بازهٔ انتخابی است."}
      </p>
    </div>
  )
}
