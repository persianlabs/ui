"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { zPersianDate } from "@workspace/ui/lib/persian-date-zod"

const schema = zPersianDate({ min: "2026-01-01", max: "2026-12-31" })

const presets = [
  { label: "شمسی — ۱۴۰۵/۰۵/۱۹", value: "1405/05/19" },
  { label: "شمسی — نوروز ۱۴۰۵", value: "1405/01/01" },
  { label: "شمسی — ارقام فارسی", value: "۱۴۰۵/۰۶/۰۱" },
  { label: "میلادی — 2026-08-10", value: "2026-08-10" },
  { label: "میلادی — با زمان", value: "2026-08-10T14:30:00Z" },
  { label: "خارج از بازه (min/max)", value: "2027-01-01" },
  { label: "رشتهٔ نامعتبر", value: "1405/13/40" },
]

export function PersianDateZodDemoExample() {
  const [value, setValue] = React.useState("1405/05/19")
  const result = schema.safeParse(value)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input
        dir="ltr"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="1405/05/19 یا 2026-08-10"
        className="font-mono"
      />
      {result.success ? (
        <p className="text-sm text-emerald-500">
          معتبر — {result.data.toISOString().slice(0, 10)}
        </p>
      ) : (
        <p className="text-sm text-destructive">
          {result.error.issues[0]?.message}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            type="button"
            size="sm"
            variant={value === preset.value ? "default" : "outline"}
            className="h-7 px-2 text-xs"
            onClick={() => setValue(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
