"use client"

import * as React from "react"

import {
  formatDate,
  toPersianDigits,
  type CalendarType,
} from "@workspace/ui/lib/persian-date"

export type TimeAgoFormatter<T = number> = (value: T, isPast: boolean) => string

export type TimeAgoUnitName =
  "second" | "minute" | "hour" | "day" | "week" | "month" | "year"

export interface TimeAgoMessages {
  justNow: string
  past: string | TimeAgoFormatter<string>
  future: string | TimeAgoFormatter<string>
  invalid: string
  second: string | TimeAgoFormatter<number>
  minute: string | TimeAgoFormatter<number>
  hour: string | TimeAgoFormatter<number>
  day: string | TimeAgoFormatter<number>
  week: string | TimeAgoFormatter<number>
  month: string | TimeAgoFormatter<number>
  year: string | TimeAgoFormatter<number>
}

export interface TimeAgoUnit {
  max: number
  value: number
  name: TimeAgoUnitName
}

export interface FormatTimeAgoOptions {
  /** Beyond this many milliseconds (or this unit's `max`), fall back to a full date. @default undefined */
  max?: TimeAgoUnitName | number
  /** Formatter used for the full-date fallback. @default uses formatDate with "yyyy/MM/dd" */
  fullDateFormatter?: (date: Date) => string
  /** @default faMessages (or enMessages, see the `locale` option) */
  messages?: TimeAgoMessages
  /** @default "fa" */
  locale?: "fa" | "en"
  /** Calendar used by the default fullDateFormatter. @default "shamsi" */
  calendarType?: CalendarType
  /** Show seconds instead of collapsing sub-minute diffs into "just now". @default false */
  showSecond?: boolean
  /** @default "round" */
  rounding?: "round" | "ceil" | "floor" | number
  /** Override the unit table (thresholds in milliseconds). */
  units?: TimeAgoUnit[]
}

export interface UseTimeAgoOptions extends FormatTimeAgoOptions {
  /** Re-render interval in milliseconds. Set 0 to compute once and never update. @default 30000 */
  updateInterval?: number
}

const DEFAULT_UNITS: TimeAgoUnit[] = [
  { max: 60000, value: 1000, name: "second" },
  { max: 2760000, value: 60000, name: "minute" },
  { max: 72000000, value: 3600000, name: "hour" },
  { max: 518400000, value: 86400000, name: "day" },
  { max: 2419200000, value: 604800000, name: "week" },
  { max: 28512000000, value: 2592000000, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536000000, name: "year" },
]

export const faMessages: TimeAgoMessages = {
  justNow: "همین الان",
  past: (n) => (/[\d۰-۹]/.test(n) ? `${n} پیش` : n),
  future: (n) => (/[\d۰-۹]/.test(n) ? `${n} دیگر` : n),
  invalid: "",
  second: (n) => `${toPersianDigits(String(n))} ثانیه`,
  minute: (n) => `${toPersianDigits(String(n))} دقیقه`,
  hour: (n) => `${toPersianDigits(String(n))} ساعت`,
  day: (n, past) =>
    n === 1 ? (past ? "دیروز" : "فردا") : `${toPersianDigits(String(n))} روز`,
  week: (n, past) =>
    n === 1
      ? past
        ? "هفته پیش"
        : "هفته دیگر"
      : `${toPersianDigits(String(n))} هفته`,
  month: (n, past) =>
    n === 1
      ? past
        ? "ماه پیش"
        : "ماه دیگر"
      : `${toPersianDigits(String(n))} ماه`,
  year: (n, past) =>
    n === 1
      ? past
        ? "سال پیش"
        : "سال دیگر"
      : `${toPersianDigits(String(n))} سال`,
}

export const enMessages: TimeAgoMessages = {
  justNow: "just now",
  past: (n) => (/\d/.test(n) ? `${n} ago` : n),
  future: (n) => (/\d/.test(n) ? `in ${n}` : n),
  invalid: "",
  second: (n) => `${n} second${n > 1 ? "s" : ""}`,
  minute: (n) => `${n} minute${n > 1 ? "s" : ""}`,
  hour: (n) => `${n} hour${n > 1 ? "s" : ""}`,
  day: (n, past) =>
    n === 1 ? (past ? "yesterday" : "tomorrow") : `${n} day${n > 1 ? "s" : ""}`,
  week: (n, past) =>
    n === 1
      ? past
        ? "last week"
        : "next week"
      : `${n} week${n > 1 ? "s" : ""}`,
  month: (n, past) =>
    n === 1
      ? past
        ? "last month"
        : "next month"
      : `${n} month${n > 1 ? "s" : ""}`,
  year: (n, past) =>
    n === 1
      ? past
        ? "last year"
        : "next year"
      : `${n} year${n > 1 ? "s" : ""}`,
}

function defaultFullDateFormatter(calendarType: CalendarType) {
  return (date: Date) => formatDate(date, "yyyy/MM/dd", { calendarType })
}

function applyFormat(
  messages: TimeAgoMessages,
  name: TimeAgoUnitName | "past" | "future",
  value: number | string,
  isPast: boolean
): string {
  const formatter = messages[name]
  if (typeof formatter === "function") {
    return (formatter as TimeAgoFormatter<never>)(value as never, isPast)
  }
  return formatter.replace("{0}", String(value))
}

/**
 * Formats the difference between `from` and `now` as a relative time string,
 * e.g. "۲ روز پیش" (2 days ago) or "2 days ago". Pure function -- the reactive
 * counterpart is `useTimeAgo` below.
 */
export function formatTimeAgo(
  from: Date,
  options: FormatTimeAgoOptions = {},
  now: Date | number = Date.now()
): string {
  const {
    max,
    messages = options.locale === "en" ? enMessages : faMessages,
    fullDateFormatter = defaultFullDateFormatter(
      options.calendarType ?? "shamsi"
    ),
    units = DEFAULT_UNITS,
    showSecond = false,
    rounding = "round",
  } = options

  const roundFn =
    typeof rounding === "number"
      ? (n: number) => Number(n.toFixed(rounding))
      : Math[rounding]

  const diff = Number(now) - from.getTime()
  const absDiff = Math.abs(diff)

  function getValue(unit: TimeAgoUnit) {
    return roundFn(absDiff / unit.value)
  }

  function format(unit: TimeAgoUnit) {
    const value = getValue(unit)
    const isPast = diff > 0
    const str = applyFormat(messages, unit.name, value, isPast)
    return applyFormat(messages, isPast ? "past" : "future", str, isPast)
  }

  if (absDiff < 60000 && !showSecond) {
    return messages.justNow
  }

  if (typeof max === "number" && absDiff > max) {
    return fullDateFormatter(from)
  }

  if (typeof max === "string") {
    const unitMax = units.find((unit) => unit.name === max)?.max
    if (unitMax && absDiff > unitMax) {
      return fullDateFormatter(from)
    }
  }

  for (const [index, unit] of units.entries()) {
    const value = getValue(unit)
    const previous = units[index - 1]
    if (value <= 0 && previous) return format(previous)
    if (absDiff < unit.max) return format(unit)
  }

  return messages.invalid
}

/**
 * Reactive relative-time formatter ("۲ روز پیش" / "2 days ago"). Re-renders on
 * `updateInterval` (30s by default) so the string stays current without a
 * manual refresh.
 *
 * Returns `null` until the hook has run in the browser -- `formatTimeAgo`
 * reads `Date.now()` internally, which differs between server and client, so
 * rendering it during SSR would produce a hydration mismatch. Same
 * convention as `useCountdown`/`useDate`.
 */
export function useTimeAgo(
  time: Date | number | string,
  options: UseTimeAgoOptions = {}
): string | null {
  const { updateInterval = 30000, ...formatOptions } = options
  const [mounted, setMounted] = React.useState(false)
  const [, forceRender] = React.useReducer((tick: number) => tick + 1, 0)

  React.useEffect(() => {
    const mount = () => setMounted(true)
    mount()

    if (updateInterval <= 0) return
    const id = setInterval(forceRender, updateInterval)
    return () => clearInterval(id)
  }, [updateInterval])

  if (!mounted) return null

  // Recomputed on every render, including the interval-driven ones above --
  // "now" must be read fresh each time, so this can't be memoized on `time`/options alone.
  return formatTimeAgo(new Date(time), formatOptions)
}
