"use client"

import * as React from "react"

import { Badge } from "@workspace/ui/components/badge"
import { formatDate, fromShamsi } from "@workspace/ui/lib/persian-date"
import { getHolidayInfo, isHoliday } from "@workspace/ui/lib/persian-holidays"

export function PersianHolidaysLookupExample() {
  const dates = React.useMemo(
    () => [
      fromShamsi({ year: 1404, month: 1, day: 1 }),
      fromShamsi({ year: 1404, month: 1, day: 5 }),
      fromShamsi({ year: 1404, month: 1, day: 13 }),
    ],
    []
  )

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      {dates.map((date) => {
        const info = getHolidayInfo(date)
        return (
          <div
            key={date.toISOString()}
            className="flex flex-col gap-1 rounded-lg border border-border px-3 py-2"
          >
            <div className="flex items-center justify-between">
              <span
                dir="ltr"
                className="font-mono text-xs text-muted-foreground tabular-nums"
              >
                {formatDate(date, "yyyy/MM/dd")}
              </span>
              <Badge variant={isHoliday(date) ? "default" : "outline"}>
                {isHoliday(date) ? "تعطیل" : "کاری"}
              </Badge>
            </div>
            {info.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {info.map((h) => h.title).join("، ")}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
