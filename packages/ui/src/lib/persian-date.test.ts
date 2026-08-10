import { describe, expect, it } from "vitest"

import {
  addDays,
  addMonths,
  addYears,
  clampDate,
  daysBetween,
  daysInMonth,
  eachDayOfRange,
  formatDate,
  fromMiladi,
  fromShamsi,
  isLeapYear,
  isSameDay,
  isValidDate,
  isWithinRange,
  monthsBetween,
  parseDate,
  rangeLengthInDays,
  startOfWeek,
  toLatinDigits,
  toMiladi,
  toParts,
  toPersianDigits,
  toShamsi,
  validateRange,
} from "./persian-date.js"

describe("digits", () => {
  it("converts plain digits to Persian", () => {
    expect(toPersianDigits("1405")).toBe("۱۴۰۵")
  })

  it("converts Persian/Arabic-Indic digits back to plain", () => {
    expect(toLatinDigits("۱۴۰۵")).toBe("1405")
    expect(toLatinDigits("١٤٠٥")).toBe("1405")
  })

  it("round-trips through both directions", () => {
    expect(toLatinDigits(toPersianDigits("20260810"))).toBe("20260810")
  })
})

describe("formatDate", () => {
  it("formats in the shamsi calendar by default, with Persian digits", () => {
    // 2026-08-10 is 1405/05/19
    expect(formatDate(new Date(2026, 7, 10), "yyyy/MM/dd")).toBe(
      "۱۴۰۵/۰۵/۱۹"
    )
  })

  it("formats in the miladi calendar with Latin digits by default", () => {
    expect(
      formatDate(new Date(2026, 7, 10), "yyyy/MM/dd", {
        calendarType: "miladi",
      })
    ).toBe("2026/08/10")
  })

  it("can override digit style independently of calendarType", () => {
    expect(
      formatDate(new Date(2026, 7, 10), "yyyy/MM/dd", {
        calendarType: "miladi",
        digits: "fa",
      })
    ).toBe("۲۰۲۶/۰۸/۱۰")
  })
})

describe("parseDate", () => {
  it("parses a shamsi date string", () => {
    const parsed = parseDate("1405/05/19", "yyyy/MM/dd")
    expect(parsed).not.toBeNull()
    expect(isSameDay(parsed!, new Date(2026, 7, 10))).toBe(true)
  })

  it("normalizes Persian digits before parsing", () => {
    const parsed = parseDate("۱۴۰۵/۰۵/۱۹", "yyyy/MM/dd")
    expect(parsed).not.toBeNull()
    expect(isSameDay(parsed!, new Date(2026, 7, 10))).toBe(true)
  })

  it("returns null for an invalid string instead of an Invalid Date", () => {
    expect(parseDate("not a date", "yyyy/MM/dd")).toBeNull()
  })
})

describe("isValidDate", () => {
  it("accepts a valid Date", () => {
    expect(isValidDate(new Date())).toBe(true)
  })

  it("rejects an Invalid Date", () => {
    expect(isValidDate(new Date("nope"))).toBe(false)
  })

  it("rejects non-Date values", () => {
    expect(isValidDate("2026-08-10")).toBe(false)
    expect(isValidDate(null)).toBe(false)
  })
})

describe("parts conversion", () => {
  it("reads shamsi parts for a known date", () => {
    expect(toShamsi(new Date(2026, 7, 10))).toEqual({
      year: 1405,
      month: 5,
      day: 19,
    })
  })

  it("reads miladi parts for a known date", () => {
    expect(toMiladi(new Date(2026, 7, 10))).toEqual({
      year: 2026,
      month: 8,
      day: 10,
    })
  })

  it("round-trips shamsi parts through fromShamsi/toParts", () => {
    const date = fromShamsi({ year: 1405, month: 1, day: 1 })
    expect(toParts(date, "shamsi")).toEqual({ year: 1405, month: 1, day: 1 })
  })

  it("round-trips miladi parts through fromMiladi/toParts", () => {
    const date = fromMiladi({ year: 2026, month: 3, day: 21 })
    expect(toParts(date, "miladi")).toEqual({
      year: 2026,
      month: 3,
      day: 21,
    })
  })

  it("shamsi New Year (1/1) lands on the Gregorian spring equinox window", () => {
    const nowruz = fromShamsi({ year: 1405, month: 1, day: 1 })
    expect(toMiladi(nowruz)).toEqual({ year: 2026, month: 3, day: 21 })
  })
})

describe("calendar arithmetic", () => {
  it("addDays is calendar-agnostic", () => {
    const result = addDays(new Date(2026, 7, 10), 5)
    expect(isSameDay(result, new Date(2026, 7, 15))).toBe(true)
  })

  it("addMonths respects shamsi month lengths", () => {
    // 1405/06/31 (شهریور has 31 days) + 1 month -> 1405/07/30 (مهر has 30 days), clamped
    const start = fromShamsi({ year: 1405, month: 6, day: 31 })
    const result = addMonths(start, 1, "shamsi")
    expect(toShamsi(result).month).toBe(7)
  })

  it("addYears respects the given calendar", () => {
    const start = fromShamsi({ year: 1405, month: 1, day: 1 })
    const result = addYears(start, 1, "shamsi")
    expect(toShamsi(result)).toEqual({ year: 1406, month: 1, day: 1 })
  })

  it("shamsi week starts on Saturday", () => {
    // 2026-08-10 is a Monday; the shamsi week should start two days earlier.
    const monday = new Date(2026, 7, 10)
    const weekStart = startOfWeek(monday, "shamsi")
    expect(weekStart.getDay()).toBe(6) // Saturday
  })

  it("miladi week starts on Sunday", () => {
    const monday = new Date(2026, 7, 10)
    const weekStart = startOfWeek(monday, "miladi")
    expect(weekStart.getDay()).toBe(0) // Sunday
  })

  it("reports days in a shamsi month correctly for leap and non-leap Esfand", () => {
    // 1403 is a leap shamsi year (30-day Esfand), 1404 is not (29-day Esfand).
    expect(daysInMonth(fromShamsi({ year: 1403, month: 12, day: 1 }), "shamsi")).toBe(30)
    expect(daysInMonth(fromShamsi({ year: 1404, month: 12, day: 1 }), "shamsi")).toBe(29)
  })

  it("isLeapYear matches daysInMonth for Esfand", () => {
    expect(isLeapYear(fromShamsi({ year: 1403, month: 1, day: 1 }), "shamsi")).toBe(true)
    expect(isLeapYear(fromShamsi({ year: 1404, month: 1, day: 1 }), "shamsi")).toBe(false)
  })
})

describe("ranges and comparisons", () => {
  it("daysBetween counts real elapsed days regardless of calendar", () => {
    expect(daysBetween(new Date(2026, 7, 10), new Date(2026, 7, 20))).toBe(10)
  })

  it("monthsBetween counts shamsi calendar months", () => {
    const from = fromShamsi({ year: 1405, month: 1, day: 1 })
    const to = fromShamsi({ year: 1405, month: 4, day: 1 })
    expect(monthsBetween(from, to, "shamsi")).toBe(3)
  })

  it("clampDate clamps to the given bounds", () => {
    const min = new Date(2026, 0, 1)
    const max = new Date(2026, 11, 31)
    expect(isSameDay(clampDate(new Date(2025, 0, 1), { min, max }), min)).toBe(
      true
    )
    expect(isSameDay(clampDate(new Date(2027, 0, 1), { min, max }), max)).toBe(
      true
    )
    const inside = new Date(2026, 5, 15)
    expect(clampDate(inside, { min, max })).toBe(inside)
  })

  it("eachDayOfRange returns an inclusive list of days", () => {
    const days = eachDayOfRange(new Date(2026, 7, 1), new Date(2026, 7, 5))
    expect(days).toHaveLength(5)
  })

  it("isWithinRange respects inclusive from/to bounds", () => {
    const range = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 10) }
    expect(isWithinRange(new Date(2026, 7, 1), range)).toBe(true)
    expect(isWithinRange(new Date(2026, 7, 10), range)).toBe(true)
    expect(isWithinRange(new Date(2026, 7, 11), range)).toBe(false)
  })

  it("rangeLengthInDays is inclusive of both endpoints", () => {
    expect(
      rangeLengthInDays({ from: new Date(2026, 7, 1), to: new Date(2026, 7, 3) })
    ).toBe(3)
  })

  it("rangeLengthInDays is 0 for an incomplete range", () => {
    expect(rangeLengthInDays({ from: new Date(), to: undefined })).toBe(0)
  })
})

describe("validateRange (hospital reservation constraints)", () => {
  const from = new Date(2026, 7, 10)

  it("flags an incomplete range", () => {
    expect(validateRange({ from, to: undefined })).toBe("incomplete")
  })

  it("flags an inverted range", () => {
    expect(validateRange({ from, to: addDays(from, -1) })).toBe("inverted")
  })

  it("flags a stay shorter than minDays", () => {
    expect(
      validateRange({ from, to: addDays(from, 1) }, { minDays: 3 })
    ).toBe("too-short")
  })

  it("flags a stay longer than maxDays", () => {
    expect(
      validateRange({ from, to: addDays(from, 10) }, { maxDays: 3 })
    ).toBe("too-long")
  })

  it("flags a past start date when disablePast is set", () => {
    const past = addDays(new Date(), -5)
    expect(
      validateRange({ from: past, to: addDays(past, 1) }, { disablePast: true })
    ).toBe("in-past")
  })

  it("flags a range overlapping a disabled date", () => {
    const disabled = addDays(from, 1)
    expect(
      validateRange(
        { from, to: addDays(from, 3) },
        { disabledDates: [disabled] }
      )
    ).toBe("disabled-date")
  })

  it("returns null for a valid range", () => {
    expect(
      validateRange(
        { from, to: addDays(from, 2) },
        { minDays: 1, maxDays: 5 }
      )
    ).toBeNull()
  })
})
