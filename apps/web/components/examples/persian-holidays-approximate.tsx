"use client"

import * as React from "react"

import { Badge } from "@workspace/ui/components/badge"
import { formatDate } from "@workspace/ui/lib/persian-date"
import { getHolidays } from "@workspace/ui/lib/persian-holidays"

export function PersianHolidaysApproximateExample() {
  const hijriHolidays = React.useMemo(
    () => getHolidays(1404).filter((holiday) => holiday.calendar === "hijri"),
    []
  )

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <p className="text-xs text-muted-foreground">
        مناسبت‌های قمری در سال ۱۴۰۴ با پرچم{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono">
          approximate: true
        </code>{" "}
        بازمی‌گردند، چون تاریخ دقیق آن‌ها به رؤیت هلال بستگی دارد و ممکن است
        تا یک روز جابه‌جا شود.
      </p>
      <ul className="flex max-h-56 flex-col gap-1.5 overflow-y-auto text-sm">
        {hijriHolidays.map((holiday) => (
          <li
            key={`${holiday.title}-${holiday.date.toISOString()}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
          >
            <span dir="ltr" className="font-mono text-xs tabular-nums text-muted-foreground">
              {formatDate(holiday.date, "yyyy/MM/dd")}
            </span>
            <span className="flex-1 text-end">{holiday.title}</span>
            {holiday.approximate && (
              <Badge variant="outline" className="shrink-0">
                تقریبی
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
