"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { zPersianDateRange } from "@workspace/ui/lib/persian-date-zod"

const schema = zPersianDateRange({ minDays: 2, maxDays: 14 })

export function PersianDateZodRangeExample() {
  const [from, setFrom] = React.useState("2026-08-10")
  const [to, setTo] = React.useState("2026-08-11")

  const result = schema.safeParse({ from, to })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          تاریخ ورود
          <Input
            dir="ltr"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="font-mono text-sm"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          تاریخ خروج
          <Input
            dir="ltr"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className="font-mono text-sm"
          />
        </label>
      </div>
      <p
        className={
          result.success ? "text-sm text-emerald-500" : "text-sm text-destructive"
        }
      >
        {result.success
          ? "بازهٔ انتخابی برای رزرو معتبر است."
          : `نامعتبر: ${result.error.issues[0]?.message}`}
      </p>
    </div>
  )
}
