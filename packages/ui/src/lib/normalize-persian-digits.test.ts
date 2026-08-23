import { describe, expect, it } from "vitest"

import { normalizePersianDigits } from "./normalize-persian-digits.js"

describe("normalizePersianDigits", () => {
  it.each([
    ["۰", "0"],
    ["۱", "1"],
    ["۲", "2"],
    ["۳", "3"],
    ["۴", "4"],
    ["۵", "5"],
    ["۶", "6"],
    ["۷", "7"],
    ["۸", "8"],
    ["۹", "9"],
  ])("maps Persian digit %s to %s", (input, expected) => {
    expect(normalizePersianDigits(input)).toBe(expected)
  })

  it.each([
    ["٠", "0"],
    ["١", "1"],
    ["٢", "2"],
    ["٣", "3"],
    ["٤", "4"],
    ["٥", "5"],
    ["٦", "6"],
    ["٧", "7"],
    ["٨", "8"],
    ["٩", "9"],
  ])("maps Arabic-Indic digit %s to %s", (input, expected) => {
    expect(normalizePersianDigits(input)).toBe(expected)
  })

  it("normalizes digits inside a mixed string, leaving surrounding text intact", () => {
    expect(normalizePersianDigits("قسمت ۱۲ از ٣ فصل")).toBe("قسمت 12 از 3 فصل")
  })

  it("leaves non-digit text untouched", () => {
    expect(normalizePersianDigits("سلام دنیا ABC xyz!@#")).toBe(
      "سلام دنیا ABC xyz!@#"
    )
  })

  it("returns an empty string for empty input", () => {
    expect(normalizePersianDigits("")).toBe("")
  })
})
