"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { formatDate, fromShamsi } from "@workspace/ui/lib/persian-date"
import { getHolidaysInRange } from "@workspace/ui/lib/persian-holidays"

export function PersianHolidaysUnofficialExample() {
  const [includeUnofficial, setIncludeUnofficial] = React.useState(false)

  const range = React.useMemo(
    () => ({
      from: fromShamsi({ year: 1404, month: 1, day: 1 }),
      to: fromShamsi({ year: 1404, month: 1, day: 31 }),
    }),
    []
  )

  const holidays = React.useMemo(
    () => getHolidaysInRange(range.from, range.to, { includeUnofficial }),
    [range, includeUnofficial]
  )

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant={!includeUnofficial ? "default" : "outline"}
          onClick={() => setIncludeUnofficial(false)}
        >
          فقط رسمی
        </Button>
        <Button
          size="sm"
          variant={includeUnofficial ? "default" : "outline"}
          onClick={() => setIncludeUnofficial(true)}
        >
          شامل مناسبت‌ها
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        فروردین ۱۴۰۴ — {holidays.length} مورد
      </p>
      <ul className="flex max-h-56 flex-col gap-1.5 overflow-y-auto text-sm">
        {holidays.map((holiday) => (
          <li
            key={`${holiday.title}-${holiday.date.toISOString()}`}
            className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-2"
          >
            <span
              dir="ltr"
              className="font-mono text-xs text-muted-foreground tabular-nums"
            >
              {formatDate(holiday.date, "MM/dd")}
            </span>
            <span className="text-end">{holiday.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
