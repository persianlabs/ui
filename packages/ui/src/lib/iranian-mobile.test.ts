import { describe, expect, it } from "vitest"

import {
  isValidIranPhone,
  maskIranPhone,
  normalizeIranPhone,
} from "./iranian-mobile.js"

describe("normalizeIranPhone", () => {
  it("keeps an already-normalized local number unchanged", () => {
    expect(normalizeIranPhone("09121234567")).toBe("09121234567")
  })

  it.each([
    ["+989121234567"],
    ["00989121234567"],
    ["989121234567"],
    ["9121234567"],
    ["0912 123 4567"],
    ["0912-123-4567"],
    ["0912.123.4567"],
    ["(+98) 912 1234567"],
    ["۰۹۱۲۱۲۳۴۵۶۷"],
    ["٠٩١٢١٢٣٤٥٦٧"],
  ])("normalizes %s to 09121234567", (raw) => {
    expect(normalizeIranPhone(raw)).toBe("09121234567")
  })

  it("falls back to cleaned numeric digits when shaping is impossible", () => {
    expect(normalizeIranPhone("12345")).toBe("12345")
    expect(normalizeIranPhone("abc")).toBe("")
    expect(normalizeIranPhone("call 0912-123-4567 now")).toBe("09121234567")
  })

  it.each([null, undefined])("returns an empty string for %p", (input) => {
    // @ts-expect-error characterization of runtime null/undefined handling
    expect(normalizeIranPhone(input)).toBe("")
  })
})

describe("isValidIranPhone", () => {
  it("accepts every claimed format via round-trip through the normalizer", () => {
    const rawVariants = [
      "09121234567",
      "+989121234567",
      "00989121234567",
      "989121234567",
      "9121234567",
      "0912 123 4567",
      "۰۹۱۲۱۲۳۴۵۶۷",
    ]
    for (const raw of rawVariants) {
      const normalized = normalizeIranPhone(raw)
      expect(isValidIranPhone(normalized)).toBe(true)
      expect(isValidIranPhone(raw)).toBe(true)
    }
  })

  it("rejects wrong operator prefixes", () => {
    expect(isValidIranPhone("08121234567")).toBe(false)
    expect(isValidIranPhone("+988121234567")).toBe(false)
  })

  it("rejects numbers that are too short or too long", () => {
    expect(isValidIranPhone("09121234")).toBe(false)
    expect(isValidIranPhone("091212345678901")).toBe(false)
  })

  it.each([null, undefined, "", "not a phone"])("rejects %p", (input) => {
    // @ts-expect-error characterization of runtime null/undefined handling
    expect(isValidIranPhone(input)).toBe(false)
  })
})

describe("maskIranPhone", () => {
  it("shows the first 3 and last 4 digits of a normalized number", () => {
    expect(maskIranPhone("09121234567")).toBe("091***4567")
  })

  it("masks any accepted format by normalizing first", () => {
    expect(maskIranPhone("+989121234567")).toBe("091***4567")
  })

  it("falls back to the raw value when normalization yields nothing", () => {
    expect(maskIranPhone(null)).toBe("")
    expect(maskIranPhone("")).toBe("")
    // @ts-expect-error characterization of runtime null/undefined handling
    expect(maskIranPhone(undefined)).toBe("")
  })

  it("masks partial digit runs using the generic first-3/last-4 shape", () => {
    expect(maskIranPhone("12345")).toBe("123***2345")
  })
})
