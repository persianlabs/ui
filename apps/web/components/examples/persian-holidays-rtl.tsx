"use client"

import * as React from "react"

import { formatDate, today } from "@workspace/ui/lib/persian-date"
import { getHolidayInfo, isHoliday } from "@workspace/ui/lib/persian-holidays"

export function PersianHolidaysRtlExample() {
  const [date, setDate] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => setDate(today())
    init()
  }, [])

  if (!date) return null

  const holiday = isHoliday(date)
  const info = getHolidayInfo(date)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-2 text-center">
      <p className="text-sm text-muted-foreground">
        {formatDate(date, "EEEE d MMMM yyyy")}
      </p>
      <p className="text-lg font-semibold">
        {holiday ? "امروز تعطیل رسمی است" : "امروز روز کاری است"}
      </p>
      {info.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {info.map((h) => h.title).join("، ")}
        </p>
      )}
    </div>
  )
}
