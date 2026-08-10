"use client"

import * as React from "react"

import {
  daysInMonth,
  fromShamsi,
  isLeapYear,
} from "@workspace/ui/lib/persian-date"

const YEARS = [1402, 1403, 1404]

export function PersianDateLeapYearExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      {YEARS.map((year) => {
        const esfand = fromShamsi({ year, month: 12, day: 1 })
        const leap = isLeapYear(esfand)
        const days = daysInMonth(esfand)

        return (
          <div
            key={year}
            className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-2"
          >
            <span dir="ltr" className="font-mono text-muted-foreground">
              {year}
            </span>
            <span>{leap ? "کبیسه" : "عادی"}</span>
            <span dir="ltr" className="font-mono font-medium tabular-nums">
              اسفند: {days} روز
            </span>
          </div>
        )
      })}
    </div>
  )
}
