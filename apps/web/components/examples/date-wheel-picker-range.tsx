"use client"

import { useState } from "react"

import { DateWheelPicker } from "@workspace/ui/components/date-wheel-picker"
import { formatDate, fromParts, isAfter } from "@workspace/ui/lib/persian-date"

const DEFAULT_FROM = fromParts({ year: 1403, month: 1, day: 1 }, "shamsi")
const DEFAULT_TO = fromParts({ year: 1404, month: 1, day: 1 }, "shamsi")

export function DateWheelPickerRangeExample() {
  const [from, setFrom] = useState<Date>(DEFAULT_FROM)
  const [to, setTo] = useState<Date>(DEFAULT_TO)

  // The membership can't start after it expires -- clamp the from-date to
  // the to-date instead of letting the range invert.
  function handleFromChange(next: Date) {
    setFrom(isAfter(next, to) ? to : next)
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium">Membership start</p>
        <DateWheelPicker value={from} onValueChange={handleFromChange} />
        <p className="text-sm text-muted-foreground">
          {formatDate(from, "yyyy/MM/dd")}
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium">Membership expiry</p>
        <DateWheelPicker value={to} onValueChange={setTo} />
        <p className="text-sm text-muted-foreground">
          {formatDate(to, "yyyy/MM/dd")}
        </p>
      </div>
    </div>
  )
}
