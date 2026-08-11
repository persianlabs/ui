"use client"

import * as React from "react"

import {
  addDays,
  addMonths,
  fromShamsi,
  formatDate,
} from "@workspace/ui/lib/persian-date"

export function PersianDateArithmeticExample() {
  // 1403 is a leap Jalali year -- Esfand has 30 days.
  const esfand29 = React.useMemo(
    () => fromShamsi({ year: 1403, month: 12, day: 29 }),
    []
  )

  const plusOneDay = addDays(esfand29, 1)
  const plusOneMonth = addMonths(esfand29, 1)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 text-sm">
      <Row label="۲۹ اسفند ۱۴۰۳" value={formatDate(esfand29, "yyyy/MM/dd")} />
      <Row
        label="addDays(date, 1)"
        value={formatDate(plusOneDay, "yyyy/MM/dd")}
      />
      <Row
        label="addMonths(date, 1)"
        value={formatDate(plusOneMonth, "yyyy/MM/dd")}
      />
      <p className="text-xs text-muted-foreground">
        addMonths آگاه از طول ماه در تقویم شمسی است؛ چون فروردین ۳۱ روز دارد،
        روز ۲۹ به همان روز ۲۹ فروردین منتقل می‌شود، نه انتهای ماه.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-2">
      <span dir="ltr" className="font-mono text-muted-foreground">
        {label}
      </span>
      <span dir="ltr" className="font-mono font-medium tabular-nums">
        {value}
      </span>
    </div>
  )
}
