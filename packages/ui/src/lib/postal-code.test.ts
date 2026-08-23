import { describe, expect, it } from "vitest"

import { isValidPostalCode } from "./postal-code.js"

describe("isValidPostalCode", () => {
  it.each([
    ["1234567890", true],
    ["9876543210", true],
    ["123456789", false],
    ["12345678901", false],
    ["0234567890", false],
    ["1111111111", false],
    ["9999999999", false],
  ])("validates %s as %s", (input, expected) => {
    expect(isValidPostalCode(input)).toBe(expected)
  })

  it.each([null, undefined, ""])("rejects %p", (input) => {
    expect(isValidPostalCode(input)).toBe(false)
  })

  it("accepts the Persian-digit equivalent of a valid code", () => {
    expect(isValidPostalCode("۱۲۳۴۵۶۷۸۹۰")).toBe(true)
  })

  it("accepts a valid code containing separators by extracting digits only", () => {
    expect(isValidPostalCode("12345-67890")).toBe(true)
  })
})
