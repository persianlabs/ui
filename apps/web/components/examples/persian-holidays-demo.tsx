"use client"

import * as React from "react"

import { formatDate } from "@workspace/ui/lib/persian-date"
import { getHolidays } from "@workspace/ui/lib/persian-holidays"

export function PersianHolidaysDemoExample() {
  const holidays = React.useMemo(() => getHolidays(1404), [])

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <p className="text-sm text-muted-foreground">
        تعطیلات رسمی سال ۱۴۰۴ (شمسی)
      </p>
      <ul className="flex max-h-64 flex-col gap-1.5 overflow-y-auto text-sm">
        {holidays.map((holiday) => (
          <li
            key={`${holiday.title}-${holiday.date.toISOString()}`}
            className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-2"
          >
            <span
              dir="ltr"
              className="font-mono text-xs text-muted-foreground tabular-nums"
            >
              {formatDate(holiday.date, "yyyy/MM/dd")}
            </span>
            <span className="text-end">{holiday.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
