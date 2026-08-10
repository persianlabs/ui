"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { formatDate, parseDate } from "@workspace/ui/lib/persian-date"

const PATTERN = "yyyy/MM/dd"

// Every field is explicit in "yyyy/MM/dd", so referenceDate never actually
// affects the result -- pass a fixed value instead of relying on parseDate's
// `new Date()` default, which would otherwise make this read the current
// time during render and break SSR/prerender.
const REFERENCE_DATE = new Date(0)

export function PersianDateParsingExample() {
  const [value, setValue] = React.useState("۱۴۰۴/۰۵/۱۲")

  const parsed = parseDate(value, PATTERN, REFERENCE_DATE)

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="persian-date-parsing-input">
          تاریخ تولد (شمسی)
        </Label>
        <Input
          id="persian-date-parsing-input"
          dir="ltr"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="yyyy/MM/dd"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {parsed ? (
          <>
            معتبر —{" "}
            <span className="text-foreground">
              {formatDate(parsed, "d MMMM yyyy")}
            </span>
          </>
        ) : (
          "الگوی تاریخ نامعتبر است"
        )}
      </p>
    </div>
  )
}
