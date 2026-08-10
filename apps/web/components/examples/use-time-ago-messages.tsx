"use client"

import * as React from "react"

import type { TimeAgoMessages } from "@workspace/ui/hooks/use-time-ago"
import { useTimeAgo } from "@workspace/ui/hooks/use-time-ago"

const customMessages: TimeAgoMessages = {
  justNow: "لحظاتی پیش",
  past: (value) => `${value} قبل`,
  future: (value) => `${value} بعد`,
  invalid: "نامشخص",
  second: (n) => `${n} ثانیه`,
  minute: (n) => `${n} دقیقه`,
  hour: (n) => `${n} ساعت`,
  day: (n, past) => (n === 1 ? (past ? "دیروز" : "فردا") : `${n} روز`),
  week: (n) => `${n} هفته`,
  month: (n) => `${n} ماه`,
  year: (n) => `${n} سال`,
}

export function UseTimeAgoMessagesExample() {
  const [time, setTime] = React.useState<number | null>(null)

  React.useEffect(() => {
    const init = () => setTime(Date.now() - 1000 * 60 * 60 * 3)
    init()
  }, [])

  const ago = useTimeAgo(time ?? 0, { messages: customMessages })

  if (time == null) return null

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-sm text-muted-foreground">پیام‌های سفارشی</span>
      <output className="text-2xl font-semibold tracking-tight">{ago}</output>
    </div>
  )
}
