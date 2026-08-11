"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  addDays,
  formatDate,
  today,
  validateRange,
  type DateRange,
} from "@workspace/ui/lib/persian-date"

const reasonMessages: Record<string, string> = {
  incomplete: "لطفاً تاریخ ورود و خروج را انتخاب کنید.",
  inverted: "تاریخ خروج باید بعد از تاریخ ورود باشد.",
  "too-short": "حداقل مدت رزرو ۲ شب است.",
  "too-long": "حداکثر مدت رزرو ۱۴ شب است.",
  "in-past": "تاریخ ورود نمی‌تواند در گذشته باشد.",
  "disabled-date": "بازهٔ انتخابی شامل روزهای غیرقابل رزرو است.",
}

export function PersianDateReservationExample() {
  const [base, setBase] = React.useState<Date | null>(null)
  const [fromOffset, setFromOffset] = React.useState(1)
  const [toOffset, setToOffset] = React.useState(2)

  React.useEffect(() => {
    const init = () => setBase(today())
    init()
  }, [])

  const range: DateRange = React.useMemo(
    () =>
      base
        ? { from: addDays(base, fromOffset), to: addDays(base, toOffset) }
        : { from: undefined, to: undefined },
    [base, fromOffset, toOffset]
  )

  const reason = validateRange(range, {
    minDays: 2,
    maxDays: 14,
    disablePast: true,
  })

  if (!base) return null

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <DateField
          label="تاریخ ورود"
          value={range.from!}
          onDecrease={() => setFromOffset((v) => v - 1)}
          onIncrease={() => setFromOffset((v) => v + 1)}
        />
        <DateField
          label="تاریخ خروج"
          value={range.to!}
          onDecrease={() => setToOffset((v) => v - 1)}
          onIncrease={() => setToOffset((v) => v + 1)}
        />
      </div>
      <p
        className={
          reason ? "text-sm text-destructive" : "text-sm text-emerald-500"
        }
      >
        {reason ? reasonMessages[reason] : "بازهٔ انتخابی برای رزرو معتبر است."}
      </p>
    </div>
  )
}

function DateField({
  label,
  value,
  onDecrease,
  onIncrease,
}: {
  label: string
  value: Date
  onDecrease: () => void
  onIncrease: () => void
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span dir="ltr" className="font-mono text-sm font-medium tabular-nums">
        {formatDate(value, "yyyy/MM/dd")}
      </span>
      <div className="flex gap-1.5">
        <Button
          size="icon"
          variant="outline"
          className="size-7"
          onClick={onDecrease}
        >
          -
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="size-7"
          onClick={onIncrease}
        >
          +
        </Button>
      </div>
    </div>
  )
}
