"use client"

import * as React from "react"

import { Badge } from "@workspace/ui/components/badge"
import {
  addDays,
  formatDate,
  isFuture,
  isPast,
  isToday,
} from "@workspace/ui/lib/persian-date"

export function PersianDateComparisonsExample() {
  const [today, setToday] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => setToday(new Date())
    init()
  }, [])

  const dates = React.useMemo(
    () =>
      today
        ? [
            { label: "دیروز", value: addDays(today, -1) },
            { label: "امروز", value: today },
            { label: "فردا", value: addDays(today, 1) },
          ]
        : [],
    [today]
  )

  if (!today) return null

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      {dates.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-2"
        >
          <span>{item.label}</span>
          <span
            dir="ltr"
            className="font-mono text-muted-foreground tabular-nums"
          >
            {formatDate(item.value, "yyyy/MM/dd")}
          </span>
          <Badge variant={isToday(item.value) ? "default" : "outline"}>
            {isToday(item.value)
              ? "isToday"
              : isPast(item.value)
                ? "isPast"
                : isFuture(item.value)
                  ? "isFuture"
                  : ""}
          </Badge>
        </div>
      ))}
    </div>
  )
}
