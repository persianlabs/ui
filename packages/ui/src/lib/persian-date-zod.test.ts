import { describe, expect, it } from "vitest"

import { zPersianDate, zPersianDateRange } from "./persian-date-zod.js"

describe("zPersianDate", () => {
  it("accepts a shamsi yyyy/MM/dd string", () => {
    const result = zPersianDate().safeParse("1405/05/19")
    expect(result.success).toBe(true)
    expect(result.data?.getFullYear()).toBe(2026)
  })

  it("accepts an ISO-8601 string", () => {
    const result = zPersianDate().safeParse("2026-08-10")
    expect(result.success).toBe(true)
  })

  it("accepts an epoch number", () => {
    const result = zPersianDate().safeParse(Date.now())
    expect(result.success).toBe(true)
  })

  it("accepts a native Date", () => {
    const result = zPersianDate().safeParse(new Date())
    expect(result.success).toBe(true)
  })

  it("rejects a garbage string instead of misparsing it (regression: new Date() leniency)", () => {
    // new Date("1405/05/19") silently "succeeds" with a bogus year -- this
    // is exactly the class of string a naive ISO-first coercion would misparse.
    const result = zPersianDate().safeParse("not a date at all")
    expect(result.success).toBe(false)
  })

  it("does not misinterpret a shamsi string as a bogus native-Date parse", () => {
    const result = zPersianDate().safeParse("1405/05/19")
    expect(result.success).toBe(true)
    // Must resolve to 2026, not to a literal "year 1405" via a lenient native parse.
    expect(result.data?.getFullYear()).toBe(2026)
  })

  it("rejects a date before min", () => {
    const schema = zPersianDate({ min: "2026-01-01" })
    expect(schema.safeParse("2025-12-31").success).toBe(false)
  })

  it("accepts a date on the min boundary (inclusive)", () => {
    const schema = zPersianDate({ min: "2026-01-01" })
    expect(schema.safeParse("2026-01-01").success).toBe(true)
  })

  it("rejects a date after max", () => {
    const schema = zPersianDate({ max: "2026-12-31" })
    expect(schema.safeParse("2027-01-01").success).toBe(false)
  })
})

describe("zPersianDateRange", () => {
  it("rejects an inverted range", () => {
    const result = zPersianDateRange().safeParse({
      from: "2026-08-10",
      to: "2026-08-05",
    })
    expect(result.success).toBe(false)
  })

  it("rejects a stay shorter than minDays", () => {
    const schema = zPersianDateRange({ minDays: 2 })
    const result = schema.safeParse({ from: "2026-08-10", to: "2026-08-10" })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.path).toEqual(["to"])
  })

  it("accepts a valid range", () => {
    const schema = zPersianDateRange({ minDays: 1, maxDays: 5 })
    const result = schema.safeParse({ from: "2026-08-10", to: "2026-08-12" })
    expect(result.success).toBe(true)
  })

  it("rejects a stay longer than maxDays", () => {
    const schema = zPersianDateRange({ maxDays: 3 })
    const result = schema.safeParse({ from: "2026-08-10", to: "2026-08-20" })
    expect(result.success).toBe(false)
  })
})
