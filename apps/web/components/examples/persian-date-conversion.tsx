"use client"

import * as React from "react"

import {
  fromMiladi,
  fromShamsi,
  toMiladi,
  toShamsi,
} from "@workspace/ui/lib/persian-date"

export function PersianDateConversionExample() {
  const [date] = React.useState(() => new Date(2026, 2, 21))

  const shamsi = toShamsi(date)
  const roundTrip = fromShamsi(shamsi)
  const miladi = toMiladi(roundTrip)
  const backToGregorian = fromMiladi(miladi)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 text-sm">
      <Row label="میلادی" value={`${miladi.year}/${miladi.month}/${miladi.day}`} />
      <Row
        label="→ toShamsi"
        value={`${shamsi.year}/${shamsi.month}/${shamsi.day}`}
      />
      <Row
        label="→ fromShamsi → toMiladi"
        value={`${miladi.year}/${miladi.month}/${miladi.day}`}
      />
      <p className="text-xs text-muted-foreground">
        {backToGregorian.toDateString() === date.toDateString()
          ? "چرخهٔ تبدیل بدون افت داده کامل شد."
          : "چرخهٔ تبدیل دقیق نبود."}
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span dir="ltr" className="font-mono font-medium tabular-nums">
        {value}
      </span>
    </div>
  )
}
