"use client"

import { Badge } from "@workspace/ui/components/badge"
import { useDate } from "@workspace/ui/hooks/use-date"

export function UseDateHolidayExample() {
  const date = useDate({ checkHoliday: true })

  if (!date) return null

  const { formatted, isHoliday, holidays } = date

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <output
        dir="ltr"
        className="font-mono text-2xl font-semibold tracking-tight tabular-nums"
      >
        {formatted}
      </output>
      <Badge variant={isHoliday ? "default" : "outline"}>
        {isHoliday ? "امروز تعطیل است" : "امروز روز کاری است"}
      </Badge>
      {holidays.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {holidays.map((holiday) => holiday.title).join("، ")}
        </p>
      )}
    </div>
  )
}
