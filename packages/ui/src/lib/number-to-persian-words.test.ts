import { describe, expect, it } from "vitest"

import {
  NUMBER_WORDS_LIMITS,
  numberToPersianWords,
} from "./number-to-persian-words.js"
describe("numberToPersianWords", () => {
  it("converts single digits", () => {
    expect(numberToPersianWords(0)).toBe("صفر")
    expect(numberToPersianWords(5)).toBe("پنج")
    expect(numberToPersianWords(9)).toBe("نه")
  })

  it("converts teens and round tens", () => {
    expect(numberToPersianWords(10)).toBe("ده")
    expect(numberToPersianWords(11)).toBe("یازده")
    expect(numberToPersianWords(15)).toBe("پانزده")
    expect(numberToPersianWords(18)).toBe("هجده")
    expect(numberToPersianWords(20)).toBe("بیست")
    expect(numberToPersianWords(90)).toBe("نود")
  })

  it("joins tens and ones with و", () => {
    expect(numberToPersianWords(23)).toBe("بیست و سه")
    expect(numberToPersianWords(47)).toBe("چهل و هفت")
    expect(numberToPersianWords(99)).toBe("نود و نه")
  })

  it("converts hundreds", () => {
    expect(numberToPersianWords(100)).toBe("صد")
    expect(numberToPersianWords(117)).toBe("صد و هفده")
    expect(numberToPersianWords(200)).toBe("دویست")
    expect(numberToPersianWords(505)).toBe("پانصد و پنج")
    expect(numberToPersianWords(999)).toBe("نهصد و نود و نه")
  })

  it("names scale groups and skips zero groups", () => {
    expect(numberToPersianWords(1000)).toBe("یک هزار")
    expect(numberToPersianWords(1001)).toBe("یک هزار و یک")
    expect(numberToPersianWords(250000)).toBe("دویست و پنجاه هزار")
    expect(numberToPersianWords(12500000)).toBe("دوازده میلیون و پانصد هزار")
    expect(numberToPersianWords(123_000_000_000 as number)).toBe(
      "صد و بیست و سه میلیارد"
    )
    expect(numberToPersianWords(1_000_000_000_001 as number)).toBe(
      "یک بیلیون و یک"
    )
  })

  it("keeps every group on dense numbers", () => {
    expect(numberToPersianWords(123456789)).toBe(
      "صد و بیست و سه میلیون و چهارصد و پنجاه و شش هزار و هفتصد و هشتاد و نه"
    )
    expect(numberToPersianWords(999_999_999_999 as number)).toBe(
      "نهصد و نود و نه میلیارد و نهصد و نود و نه میلیون و نهصد و نود و نه هزار و نهصد و نود و نه"
    )
  })

  it("handles negatives", () => {
    expect(numberToPersianWords(-3)).toBe("منفی سه")
    expect(numberToPersianWords("-12500000")).toBe(
      "منفی دوازده میلیون و پانصد هزار"
    )
  })

  it("reads Persian and Arabic-Indic digits", () => {
    expect(numberToPersianWords("۱۲۳")).toBe("صد و بیست و سه")
    expect(numberToPersianWords("۴۵۶")).toBe("چهارصد و پنجاه و شش")
    expect(numberToPersianWords("۹۹")).toBe("نود و نه")
  })

  it("ignores thousands separators", () => {
    expect(numberToPersianWords("12,345")).toBe(
      "دوازده هزار و سیصد و چهل و پنج"
    )
    expect(numberToPersianWords("۱٬۲۳۴٬۵۶۷")).toBe(
      "یک میلیون و دویست و سی و چهار هزار و پانصد و شصت و هفت"
    )
    expect(numberToPersianWords("1 000 000")).toBe("یک میلیون")
  })

  it("strips leading zeros", () => {
    expect(numberToPersianWords("007")).toBe("هفت")
    expect(numberToPersianWords("000")).toBe("صفر")
  })

  it("accepts a plus sign and numeric types with decimals", () => {
    expect(numberToPersianWords("+42")).toBe("چهل و دو")
    expect(numberToPersianWords(2.5)).toBe("دو ممیز پنج دهم")
  })

  it("converts fractions with ordinal suffixes", () => {
    expect(numberToPersianWords("0.5")).toBe("صفر ممیز پنج دهم")
    expect(numberToPersianWords(".25")).toBe("صفر ممیز بیست و پنج صدم")
    expect(numberToPersianWords("0.05")).toBe("صفر ممیز پنج صدم")
    expect(numberToPersianWords("0.505")).toBe("صفر ممیز پانصد و پنج هزارم")
    expect(numberToPersianWords(3.14)).toBe("سه ممیز چهارده صدم")
  })

  it("trims trailing zeros in the fraction", () => {
    expect(numberToPersianWords("2.50")).toBe("دو ممیز پنج دهم")
    expect(numberToPersianWords("2.500")).toBe("دو ممیز پنج دهم")
  })

  it("caps the fraction at the supported precision", () => {
    const digits = "1234567890123"
    const capped = digits.slice(0, NUMBER_WORDS_LIMITS.decimalDigits)
    const expected = `یک ممیز ${numberToPersianWords(capped)} ${
      [
        "",
        "دهم",
        "صدم",
        "هزارم",
        "ده\u200cهزارم",
        "صدم\u200cهزارم",
        "میلیونوم",
        "ده\u200cمیلیونوم",
        "صدمیلیونوم",
        "میلیاردم",
      ][NUMBER_WORDS_LIMITS.decimalDigits]
    }`

    expect(numberToPersianWords(`1.${digits}`)).toBe(expected)
  })

  it("returns an empty string for unreadable input", () => {
    expect(numberToPersianWords("abc")).toBe("")
    expect(numberToPersianWords("")).toBe("")
    expect(numberToPersianWords("-")).toBe("")
    expect(numberToPersianWords(NaN)).toBe("")
  })

  it("reports out-of-range integers", () => {
    const beyond = `1${"0".repeat(NUMBER_WORDS_LIMITS.integerDigits)}`
    expect(numberToPersianWords(beyond)).toBe("عدد خارج از محدوده است")

    const edge = "9".repeat(NUMBER_WORDS_LIMITS.integerDigits)
    expect(numberToPersianWords(edge)).not.toBe("عدد خارج از محدوده است")
  })

  it("appends an optional suffix", () => {
    expect(numberToPersianWords(12500000, { suffix: "تومان" })).toBe(
      "دوازده میلیون و پانصد هزار تومان"
    )
    expect(numberToPersianWords("0.5", { suffix: "ریال" })).toBe(
      "صفر ممیز پنج دهم ریال"
    )
    expect(numberToPersianWords(-3, { suffix: "تومان" })).toBe("منفی سه تومان")
    expect(numberToPersianWords(0, { suffix: "تومان" })).toBe("صفر تومان")
  })

  it("ignores blank suffixes and skips them for unreadable or out-of-range input", () => {
    expect(numberToPersianWords(12500000, {})).toBe(
      "دوازده میلیون و پانصد هزار"
    )
    expect(numberToPersianWords(12500000, { suffix: "  " })).toBe(
      "دوازده میلیون و پانصد هزار"
    )
    expect(numberToPersianWords("abc", { suffix: "تومان" })).toBe("")
    expect(
      numberToPersianWords(
        `1${"0".repeat(NUMBER_WORDS_LIMITS.integerDigits)}`,
        {
          suffix: "تومان",
        }
      )
    ).toBe("عدد خارج از محدوده است")
  })

  it("supports compact banking-style mixed mode", () => {
    expect(numberToPersianWords(12500000, { mode: "mixed" })).toBe(
      "12 میلیون و 500 هزار"
    )
    expect(numberToPersianWords(1234567, { mode: "mixed" })).toBe(
      "1 میلیون و 234 هزار و پانصد و شصت و هفت"
    )
    expect(numberToPersianWords(1000000, { mode: "mixed" })).toBe("1 میلیون")
    expect(numberToPersianWords(1000001, { mode: "mixed" })).toBe(
      "1 میلیون و یک"
    )
    expect(numberToPersianWords(999, { mode: "mixed" })).toBe("نهصد و نود و نه")
    expect(numberToPersianWords(-12500000, { mode: "mixed" })).toBe(
      "منفی 12 میلیون و 500 هزار"
    )
    expect(numberToPersianWords(10.5, { mode: "mixed" })).toBe(
      "ده ممیز پنج دهم"
    )
  })

  it("reads rial amounts as toman when they divide evenly", () => {
    expect(numberToPersianWords(10, { rialToToman: true })).toBe("یک تومان")
    expect(numberToPersianWords(1, { rialToToman: true })).toBe("یک ریال")
    expect(numberToPersianWords(15, { rialToToman: true })).toBe("پانزده ریال")
    expect(numberToPersianWords(12500000, { rialToToman: true })).toBe(
      "یک میلیون و دویست و پنجاه هزار تومان"
    )
    expect(
      numberToPersianWords(12500000, { rialToToman: true, mode: "mixed" })
    ).toBe("1 میلیون و 250 هزار تومان")
    expect(numberToPersianWords(12500000, { rialToToman: false })).toBe(
      "دوازده میلیون و پانصد هزار"
    )
    expect(numberToPersianWords(0, { rialToToman: true })).toBe("صفر تومان")
    expect(numberToPersianWords(-20, { rialToToman: true })).toBe(
      "منفی دو تومان"
    )
    expect(numberToPersianWords("50.25", { rialToToman: true })).toBe(
      "پنجاه ممیز بیست و پنج صدم ریال"
    )
  })

  it("lets rialToToman manage the unit instead of a custom suffix", () => {
    expect(
      numberToPersianWords(10, { rialToToman: true, suffix: "تومانی" })
    ).toBe("یک تومان")
    expect(
      numberToPersianWords(1, { rialToToman: true, suffix: "تومانی" })
    ).toBe("یک ریال")
  })
})
