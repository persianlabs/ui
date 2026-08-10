"use client"

import * as React from "react"

import { formatDate, today } from "@workspace/ui/lib/persian-date"

export function PersianDateRtlExample() {
  const [date, setDate] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => setDate(today())
    init()
  }, [])

  if (!date) return null

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-2 text-center">
      <p className="text-sm text-muted-foreground">تاریخ امروز</p>
      <p className="text-2xl font-semibold tracking-tight">
        {formatDate(date, "EEEE d MMMM yyyy")}
      </p>
      <p className="text-xs text-muted-foreground">
        خروجی formatDate با ارقام و نام روز/ماه فارسی، بدون نیاز به تنظیم
        جهت جداگانه در محتوای راست‌به‌چپ می‌نشیند.
      </p>
    </div>
  )
}
