"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  daysBetween,
  endOfMonth,
  formatDate,
  startOfMonth,
  toggleRangeSelection,
  validateRange,
} from "@workspace/ui/lib/persian-date"
import { getHolidaysInRange } from "@workspace/ui/lib/persian-holidays"

const VALIDATION_MESSAGES: Record<string, string> = {
  incomplete: "لطفاً تاریخ ورود و خروج را انتخاب کنید.",
  inverted: "تاریخ خروج باید بعد از تاریخ ورود باشد.",
  "too-short": "حداقل مدت رزرو ۲ شب است.",
  "too-long": "حداکثر مدت رزرو ۱۰ شب است.",
  "in-past": "امکان رزرو برای تاریخ‌های گذشته وجود ندارد.",
  "disabled-date": "بازه انتخابی شامل تاریخ مسدودشده است.",
}

export function DatePickerReservationExample() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const [month, setMonth] = React.useState<Date | undefined>(undefined)
  const [today, setToday] = React.useState<Date | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const init = () => {
      const now = new Date()
      setToday(now)
      setMonth(now)
    }
    init()
  }, [])

  const holidayDates = React.useMemo(() => {
    if (!month) return []
    return getHolidaysInRange(startOfMonth(month), endOfMonth(month)).map(
      (holiday) => holiday.date
    )
  }, [month])

  if (!today) return null

  const reason = validateRange(
    { from: range?.from, to: range?.to },
    { minDays: 2, maxDays: 10, disablePast: true }
  )
  const nights =
    range?.from && range?.to
      ? Math.max(daysBetween(range.from, range.to), 0)
      : 0

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-border p-4">
      <div>
        <p className="text-sm font-medium text-foreground">رزرو نوبت بستری</p>
        <p className="text-xs text-muted-foreground">
          تاریخ ورود و خروج را از تقویم زیر انتخاب کنید.
        </p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="w-full justify-start font-normal"
            >
              <CalendarIcon className="size-4" />
              {range?.from
                ? range.to
                  ? `${formatDate(range.from, "yyyy/MM/dd")} تا ${formatDate(range.to, "yyyy/MM/dd")}`
                  : formatDate(range.from, "yyyy/MM/dd")
                : "انتخاب بازه اقامت"}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={range}
            // react-day-picker only stays truly controlled by `selected`
            // when `onSelect` is provided -- without it, it silently falls
            // back to its own internal uncontrolled range state after the
            // first render. Ignore its own computed range and drive
            // selection from our own toggle logic instead, keyed off the
            // clicked day (the 2nd callback argument): clicking an
            // already-selected endpoint clears just that one, and the next
            // click refills whichever slot is empty.
            onSelect={(_range, day) =>
              setRange((current) =>
                toggleRangeSelection(current ?? { from: undefined }, day)
              )
            }
            month={month}
            onMonthChange={setMonth}
            disabled={{ before: today }}
            modifiers={{ holiday: holidayDates }}
            modifiersClassNames={{
              holiday: "text-destructive font-semibold",
            }}
            className="p-2"
          />
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">ورود</p>
          <p className="font-medium text-foreground">
            {range?.from ? formatDate(range.from, "yyyy/MM/dd") : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">خروج</p>
          <p className="font-medium text-foreground">
            {range?.to ? formatDate(range.to, "yyyy/MM/dd") : "—"}
          </p>
        </div>
      </div>

      {reason ? (
        <p className="text-sm text-destructive">
          {VALIDATION_MESSAGES[reason]}
        </p>
      ) : (
        <p className="text-sm text-emerald-500">رزرو {nights} شب معتبر است.</p>
      )}
    </div>
  )
}
