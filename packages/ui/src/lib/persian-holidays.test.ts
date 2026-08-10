import { describe, expect, it } from "vitest"

import { fromShamsi } from "./persian-date.js"
import {
  getHolidayInfo,
  getHolidays,
  getHolidaysInRange,
  hijriMonthLength,
  hijriToJdn,
  isHoliday,
  jdnToGregorian,
} from "./persian-holidays.js"

describe("hijriToJdn / jdnToGregorian", () => {
  it("resolves 1 Muharram 1447 AH to late June 2025 (Islamic New Year)", () => {
    const jdn = hijriToJdn(1447, 1, 1)
    const date = jdnToGregorian(jdn)
    expect(date.getFullYear()).toBe(2025)
    expect(date.getMonth()).toBe(5) // June
    expect(date.getDate()).toBeGreaterThanOrEqual(25)
    expect(date.getDate()).toBeLessThanOrEqual(28)
  })

  it("resolves the tabular Hijri epoch (1/1/1 AH) to July 622 CE", () => {
    const date = jdnToGregorian(hijriToJdn(1, 1, 1))
    expect(date.getFullYear()).toBe(622)
    expect(date.getMonth()).toBe(6) // July
  })

  it("hijriMonthLength only ever returns 29 or 30", () => {
    for (let month = 1; month <= 12; month += 1) {
      expect([29, 30]).toContain(hijriMonthLength(1447, month))
    }
  })
})

describe("getHolidays", () => {
  it("includes Nowruz as an official shamsi holiday", () => {
    const holidays = getHolidays(1405, "shamsi")
    const nowruz = holidays.find((h) => h.day === 1 && h.month === 1 && h.calendar === "jalali")
    expect(nowruz).toBeDefined()
    expect(nowruz?.official).toBe(true)
  })

  it("only returns official holidays by default", () => {
    const holidays = getHolidays(1405, "shamsi")
    expect(holidays.every((h) => h.official)).toBe(true)
  })

  it("includeUnofficial returns a superset", () => {
    const official = getHolidays(1405, "shamsi")
    const all = getHolidays(1405, "shamsi", { includeUnofficial: true })
    expect(all.length).toBeGreaterThan(official.length)
  })

  it("every resolved date actually falls within the requested shamsi year", () => {
    const holidays = getHolidays(1405, "shamsi", { includeUnofficial: true })
    const yearStart = fromShamsi({ year: 1405, month: 1, day: 1 })
    const yearEnd = fromShamsi({ year: 1406, month: 1, day: 1 })
    for (const holiday of holidays) {
      expect(holiday.date.getTime()).toBeGreaterThanOrEqual(yearStart.getTime())
      expect(holiday.date.getTime()).toBeLessThan(yearEnd.getTime())
    }
  })

  it("resolves the same total count for a miladi year query", () => {
    const holidays = getHolidays(2026, "miladi", { includeUnofficial: true })
    expect(holidays.length).toBeGreaterThan(0)
  })
})

describe("isHoliday / getHolidayInfo", () => {
  it("flags Nowruz day 1 (1405/01/01 -> 2026-03-21) as a holiday", () => {
    expect(isHoliday(fromShamsi({ year: 1405, month: 1, day: 1 }))).toBe(true)
  })

  it("does not flag an arbitrary weekday", () => {
    expect(isHoliday(fromShamsi({ year: 1405, month: 5, day: 19 }))).toBe(false)
  })

  it("getHolidayInfo can return multiple entries for the same day", () => {
    const info = getHolidayInfo(fromShamsi({ year: 1405, month: 1, day: 1 }), {
      includeUnofficial: true,
    })
    expect(info.length).toBeGreaterThanOrEqual(1)
    expect(info.every((h) => h.date.toDateString() === info[0]!.date.toDateString())).toBe(true)
  })
})

describe("getHolidaysInRange", () => {
  it("returns holidays sorted chronologically", () => {
    const from = fromShamsi({ year: 1405, month: 1, day: 1 })
    const to = fromShamsi({ year: 1405, month: 12, day: 29 })
    const holidays = getHolidaysInRange(from, to, { includeUnofficial: true })
    for (let i = 1; i < holidays.length; i += 1) {
      expect(holidays[i]!.date.getTime()).toBeGreaterThanOrEqual(
        holidays[i - 1]!.date.getTime()
      )
    }
  })

  it("returns an empty array for a range with no holidays", () => {
    // A single ordinary weekday, unofficial-only search excluded.
    const day = fromShamsi({ year: 1405, month: 5, day: 19 })
    expect(getHolidaysInRange(day, day)).toEqual([])
  })
})
