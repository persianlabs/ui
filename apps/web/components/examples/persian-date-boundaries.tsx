"use client"

import * as React from "react"

import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  formatDate,
  fromShamsi,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "@workspace/ui/lib/persian-date"

export function PersianDateBoundariesExample() {
  const date = React.useMemo(
    () => fromShamsi({ year: 1404, month: 5, day: 12 }),
    []
  )

  const rows = [
    { label: "شروع هفته", value: startOfWeek(date) },
    { label: "پایان هفته", value: endOfWeek(date) },
    { label: "شروع ماه", value: startOfMonth(date) },
    { label: "پایان ماه", value: endOfMonth(date) },
    { label: "شروع سال", value: startOfYear(date) },
    { label: "پایان سال", value: endOfYear(date) },
  ]

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 text-sm">
      <p className="text-muted-foreground">
        مبنا: {formatDate(date, "yyyy/MM/dd")}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 rounded-lg border border-border px-3 py-2"
          >
            <span className="text-xs text-muted-foreground">{row.label}</span>
            <span
              dir="ltr"
              className="font-mono text-sm font-medium tabular-nums"
            >
              {formatDate(row.value, "yyyy/MM/dd")}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
