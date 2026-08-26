import { describe, expect, it } from "vitest"

import { normalizePersianText } from "./normalize-persian-text.js"

describe("normalizePersianText", () => {
  it("unifies Arabic yeh and kaf onto Persian letters", () => {
    expect(normalizePersianText("\u0643\u062A\u0627\u0628")).toBe("کتاب")
    expect(normalizePersianText("\u064A\u0643")).toBe("یک")
    expect(normalizePersianText("\u0639\u0644\u0649")).toBe("علی")
  })

  it("unifies alef variants and teh marbuta", () => {
    expect(normalizePersianText("\u0625\u0633\u0644\u0627\u0645")).toBe("اسلام")
    expect(normalizePersianText("\u0623\u0641\u063A\u0627\u0646")).toBe("افغان")
    expect(normalizePersianText("\u0645\u062F\u0631\u0633\u0629")).toBe("مدرسه")
    expect(normalizePersianText("\u0671\u0644\u0644\u0647")).toBe("الله")
  })

  it("leaves healthy Persian text untouched by default", () => {
    const text = "می‌روم به خانه‌ها"
    expect(normalizePersianText(text)).toBe(text)
  })

  it("repairs broken half-spaces by default", () => {
    const zwnj = "\u200C"
    // Consecutive ZWNJs collapse to one.
    expect(normalizePersianText(`می${zwnj}${zwnj}روم`)).toBe(`می${zwnj}روم`)
    // Stray ZWNJ next to a space or punctuation is dropped.
    expect(normalizePersianText(`سلام ${zwnj}`)).toBe("سلام")
    expect(normalizePersianText(`${zwnj} سلام`)).toBe("سلام")
    expect(normalizePersianText(`خانه${zwnj}.`)).toBe("خانه.")
  })

  it("can skip half-space repair", () => {
    const zwnj = "\u200C"
    expect(normalizePersianText(`می${zwnj}${zwnj}روم`, { zwnj: false })).toBe(
      `می${zwnj}${zwnj}روم`
    )
  })

  it("keeps meaningful half-spaces while repairing broken ones", () => {
    const zwnj = "\u200C"
    const mixed = `بیا ${zwnj}خانه${zwnj}ها را ببینیم${zwnj}`
    expect(normalizePersianText(mixed)).toBe(`بیا خانه${zwnj}ها را ببینیم`)
  })

  it("keeps digits as-is unless asked to fold them", () => {
    expect(normalizePersianText("۱۲۳۴۵")).toBe("۱۲۳۴۵")
    expect(normalizePersianText("۱۲۳۴۵", { digits: true })).toBe("12345")
    expect(normalizePersianText("٤٥٦", { digits: true })).toBe("456")
  })

  it("strips diacritics and kashida only when asked", () => {
    const vocalized =
      "\u0645\u064F\u0633\u062A\u0640\u064E\u062D\u0650\u0642\u0651"
    expect(normalizePersianText(vocalized)).toBe(vocalized)
    expect(normalizePersianText(vocalized, { diacritics: true })).toBe("مستحق")
    expect(normalizePersianText("کتاـــب", { diacritics: true })).toBe("کتاب")
  })

  it("collapses blank runs and trims the ends by default", () => {
    expect(normalizePersianText("  سلام   دنیا  ")).toBe("سلام دنیا")
    expect(normalizePersianText("\u00A0سلام\t\tدنیا\u00A0")).toBe("سلام دنیا")
  })

  it("preserves line breaks while tidying spaces", () => {
    expect(normalizePersianText("خط اول\n   خط دوم")).toBe("خط اول\n خط دوم")
  })

  it("can skip whitespace tidying", () => {
    expect(normalizePersianText("  سلام   دنیا  ", { spaces: false })).toBe(
      "  سلام   دنیا  "
    )
  })

  it("combines every option for aggressive search keys", () => {
    const raw =
      "\u0627\u0644\u0633\u0644\u0627\u0645\u064B \u06CC\u06A9 ۱۲۳ \u06A9\u062A\u0627\u0628\u064E "
    expect(
      normalizePersianText(raw.trim(), {
        digits: true,
        diacritics: true,
      })
    ).toBe("السلام یک 123 کتاب")
  })

  it("returns empty strings unchanged", () => {
    expect(normalizePersianText("")).toBe("")
  })
})
