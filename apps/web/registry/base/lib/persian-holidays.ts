import {
  fromParts,
  isAfter,
  isBefore,
  toParts,
  type CalendarType,
} from "@/lib/persian-date"
import {
  persianHolidaysData,
  type PersianHolidayEntry,
} from "@/lib/persian-holidays-data"

export interface ResolvedHoliday extends PersianHolidayEntry {
  date: Date
  /** True for hijri (lunar) entries, which are resolved via a tabular approximation. */
  approximate: boolean
}

export interface GetHolidaysOptions {
  /** Include commemorative/unofficial occasions, not just official days off. @default false */
  includeUnofficial?: boolean
}

const ISLAMIC_EPOCH_JDN = 1948440

/** Tabular ("civil"/Kuwaiti) Hijri calendar day -> Julian Day Number. */
export function hijriToJdn(year: number, month: number, day: number): number {
  return (
    day +
    Math.ceil(29.5 * (month - 1)) +
    (year - 1) * 354 +
    Math.floor((3 + 11 * year) / 30) +
    ISLAMIC_EPOCH_JDN -
    1
  )
}

/** Julian Day Number -> Gregorian calendar Date (local midnight). Fliegel & Van Flandern algorithm. */
export function jdnToGregorian(jdn: number): Date {
  let l = jdn + 68569
  const n = Math.floor((4 * l) / 146097)
  l = l - Math.floor((146097 * n + 3) / 4)
  const i = Math.floor((4000 * (l + 1)) / 1461001)
  l = l - Math.floor((1461 * i) / 4) + 31
  const j = Math.floor((80 * l) / 2447)
  const day = l - Math.floor((2447 * j) / 80)
  const l2 = Math.floor(j / 11)
  const month = j + 2 - 12 * l2
  const year = 100 * (n - 49) + i + l2
  return new Date(year, month - 1, day)
}

/** Number of days in a tabular Hijri month (29 or 30). */
export function hijriMonthLength(year: number, month: number): number {
  return hijriToJdn(year, month + 1, 1) - hijriToJdn(year, month, 1)
}

function withinInclusive(date: Date, from: Date, to: Date): boolean {
  return !isBefore(date, from) && !isAfter(date, to)
}

/** A lunar year (~354 days) is about 32/33 the length of a solar year. */
function approxHijriYear(gregorianYear: number): number {
  return Math.floor(((gregorianYear - 622) * 33) / 32)
}

/**
 * Resolves every holiday/occasion whose date falls within `[from, to]` (inclusive).
 * A hijri (lunar) holiday can appear zero, one, or twice, since a lunar year is
 * shorter than a solar one.
 */
export function getHolidaysInRange(
  from: Date,
  to: Date,
  options: GetHolidaysOptions = {}
): ResolvedHoliday[] {
  const { includeUnofficial = false } = options
  const results: ResolvedHoliday[] = []
  const entries = includeUnofficial
    ? persianHolidaysData
    : persianHolidaysData.filter((entry) => entry.official)

  const fromJalaliYear = toParts(from, "shamsi").year
  const toJalaliYear = toParts(to, "shamsi").year
  const fromGregorianYear = toParts(from, "miladi").year
  const toGregorianYear = toParts(to, "miladi").year

  for (const entry of entries) {
    if (entry.calendar === "jalali") {
      for (let year = fromJalaliYear; year <= toJalaliYear; year += 1) {
        const date = fromParts(
          { year, month: entry.month, day: entry.day },
          "shamsi"
        )
        if (withinInclusive(date, from, to)) {
          results.push({ ...entry, date, approximate: false })
        }
      }
    } else if (entry.calendar === "gregorian") {
      for (let year = fromGregorianYear; year <= toGregorianYear; year += 1) {
        const date = fromParts(
          { year, month: entry.month, day: entry.day },
          "miladi"
        )
        if (withinInclusive(date, from, to)) {
          results.push({ ...entry, date, approximate: false })
        }
      }
    } else {
      const startHijriYear = approxHijriYear(fromGregorianYear) - 1
      const endHijriYear = approxHijriYear(toGregorianYear) + 1
      for (let year = startHijriYear; year <= endHijriYear; year += 1) {
        const jdn = hijriToJdn(year, entry.month, entry.day)
        const date = jdnToGregorian(jdn)
        if (withinInclusive(date, from, to)) {
          results.push({ ...entry, date, approximate: true })
        }
      }
    }
  }

  return results.sort((a, b) => a.date.getTime() - b.date.getTime())
}

/**
 * Convenience wrapper around `getHolidaysInRange` for a whole calendar year
 * (e.g. `getHolidays(1405)` for Jalali year 1405, or `getHolidays(2026, "miladi")`).
 */
export function getHolidays(
  year: number,
  calendarType: CalendarType = "shamsi",
  options: GetHolidaysOptions = {}
): ResolvedHoliday[] {
  const from = fromParts({ year, month: 1, day: 1 }, calendarType)
  const to = fromParts({ year: year + 1, month: 1, day: 1 }, calendarType)
  to.setDate(to.getDate() - 1)
  return getHolidaysInRange(from, to, options)
}

/** True if `date` matches any (official, by default) holiday. */
export function isHoliday(
  date: Date,
  options: GetHolidaysOptions = {}
): boolean {
  return getHolidaysInRange(date, date, options).length > 0
}

/** Every holiday/occasion that falls on `date`. */
export function getHolidayInfo(
  date: Date,
  options: GetHolidaysOptions = {}
): ResolvedHoliday[] {
  return getHolidaysInRange(date, date, options)
}
