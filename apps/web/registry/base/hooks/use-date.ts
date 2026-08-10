"use client"

import * as React from "react"

import {
  formatDate,
  toParts,
  type CalendarType,
  type DateLocale,
  type DigitStyle,
} from "@/lib/persian-date"
import {
  getHolidayInfo,
  isHoliday,
  type ResolvedHoliday,
} from "@/lib/persian-holidays"

export interface UseDateOptions {
  /** @default "shamsi" */
  calendarType?: CalendarType
  locale?: DateLocale
  digits?: DigitStyle
  /** Tick interval in milliseconds. Set 0 to read the time once and never update. @default 1000 */
  interval?: number
  /** Format pattern used for `formatted`. @default "yyyy/MM/dd HH:mm:ss" */
  pattern?: string
  /** Flag `date` against the built-in Iranian holiday dataset. @default false */
  checkHoliday?: boolean
}

export interface UseDateResult {
  /** The live Date value. */
  date: Date
  /** `date` formatted with `pattern`, honoring calendarType/locale/digits. */
  formatted: string
  /** 1-indexed year/month/day in the active calendarType. */
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  /** 0 (Sunday) - 6 (Saturday), same in both calendars -- a real-world invariant. */
  weekday: number
  isHoliday: boolean
  /** Populated only when checkHoliday is true and `date` matches an entry. */
  holidays: ResolvedHoliday[]
}

/**
 * A reactive current date/time hook with built-in Jalali/Gregorian calendar
 * support. Ticks on an interval (every second by default) and re-renders
 * with the latest value.
 *
 * Returns `null` until the hook has run in the browser -- `new Date()` reads
 * differently on the server than on the client, so rendering it during SSR
 * would produce a hydration mismatch. Same convention as `useCountdown`.
 */
export function useDate(options: UseDateOptions = {}): UseDateResult | null {
  const {
    calendarType = "shamsi",
    locale,
    digits,
    interval = 1000,
    pattern = "yyyy/MM/dd HH:mm:ss",
    checkHoliday = false,
  } = options

  const [date, setDate] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const update = () => setDate(new Date())
    update()

    if (interval <= 0) return

    const id = setInterval(update, interval)
    return () => clearInterval(id)
  }, [interval])

  return React.useMemo(() => {
    if (date == null) return null

    const parts = toParts(date, calendarType)
    return {
      date,
      formatted: formatDate(date, pattern, { calendarType, locale, digits }),
      year: parts.year,
      month: parts.month,
      day: parts.day,
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      weekday: date.getDay(),
      isHoliday: checkHoliday ? isHoliday(date) : false,
      holidays: checkHoliday ? getHolidayInfo(date) : [],
    }
  }, [date, calendarType, locale, digits, pattern, checkHoliday])
}
