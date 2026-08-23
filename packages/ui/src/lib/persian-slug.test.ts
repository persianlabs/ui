import { describe, expect, it } from "vitest"

import { toLatinSlug, toPersianSlug } from "./persian-slug.js"

describe("toPersianSlug", () => {
  // JSDoc examples, ported verbatim
  it('converts plain Persian text: "راهنمای خرید گوشی موبایل" → "راهنمای-خرید-گوشی-موبایل"', () => {
    expect(toPersianSlug("راهنمای خرید گوشی موبایل")).toBe(
      "راهنمای-خرید-گوشی-موبایل"
    )
  })

  it('handles mixed Persian/Latin text with ZWNJ and digits: "بهترین لپ‌تاپ های Gaming 2024" → "بهترین-لپتاپ-های-gaming-2024"', () => {
    expect(toPersianSlug("بهترین لپ\u200cتاپ های Gaming 2024")).toBe(
      "بهترین-لپتاپ-های-gaming-2024"
    )
  })

  it('normalizes Persian digits by default: "مقاله ۱۲۳" → "مقاله-123"', () => {
    expect(toPersianSlug("مقاله ۱۲۳")).toBe("مقاله-123")
  })

  it('strips punctuation and collapses whitespace: "  چطور   کیک، بپزیم؟!  " → "چطور-کیک-بپزیم"', () => {
    expect(toPersianSlug("  چطور   کیک، بپزیم؟!  ")).toBe("چطور-کیک-بپزیم")
  })

  it('transliterates when requested: "سلام دنیا" → "slam-dnya"', () => {
    expect(toPersianSlug("سلام دنیا", { transliterate: true })).toBe(
      "slam-dnya"
    )
  })

  it("supports a custom separator", () => {
    expect(toPersianSlug("راهنمای خرید گوشی", { separator: "_" })).toBe(
      "راهنمای_خرید_گوشی"
    )
  })

  it("keeps Persian digits when normalizeDigits is false", () => {
    expect(toPersianSlug("مقاله ۱۲۳", { normalizeDigits: false })).toBe(
      "مقاله-۱۲۳"
    )
  })

  it("folds Arabic-form characters to their Persian equivalents", () => {
    expect(toPersianSlug("كتاب يوسف")).toBe("کتاب-یوسف")
    expect(toPersianSlug("مؤمنة إيران أردیبهشت ٱ")).toBe(
      "مومنه-ایران-اردیبهشت-ا"
    )
  })

  it("is idempotent for already-slugified input", () => {
    const slug = toPersianSlug("راهنمای خرید گوشی موبایل")
    expect(toPersianSlug(slug)).toBe(slug)
    const latin = toLatinSlug("سلام دنیا")
    expect(toLatinSlug(latin)).toBe(latin)
  })

  it("lowercases the Latin portion of the output", () => {
    expect(toPersianSlug("خرید iPhone")).toBe("خرید-iphone")
  })

  it.each(["", "   ", "!!!", "___"])(
    "reduces %p to an empty string",
    (input) => {
      expect(toPersianSlug(input)).toBe("")
    }
  )
})

describe("toLatinSlug", () => {
  it("always transliterates: سلام دنیا → slam-dnya", () => {
    expect(toLatinSlug("سلام دنیا")).toBe("slam-dnya")
  })

  it("produces fully ASCII output for mixed input and supports options", () => {
    expect(toLatinSlug("گوشی ۱۲")).toBe("gvshy-12")
    expect(toLatinSlug("سلام دنیا", { separator: "+" })).toBe("slam+dnya")
  })

  it("drops characters with no transliteration target instead of keeping them", () => {
    expect(toLatinSlug("ءاب")).toBe("ab")
  })
})
