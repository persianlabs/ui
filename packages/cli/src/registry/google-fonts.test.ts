import { describe, expect, it } from "vitest"

import { EN_FONTS, FA_FONTS } from "../preset/fonts.js"
import { GOOGLE_FONT_SPECS, googleFontCssUrl, isGoogleFont } from "./google-fonts.js"

describe("google-fonts specs", () => {
  it("covers every English font that lives on Google Fonts", () => {
    const onGoogle = EN_FONTS.filter((f) => isGoogleFont(f.dir)).map((f) => f.dir)
    expect(onGoogle.length).toBeGreaterThan(0)
    // The spec table is the source of truth — every google font must be listed.
    expect(Object.keys(GOOGLE_FONT_SPECS).sort()).toEqual(onGoogle.sort())
  })

  it("excludes the non-Google fonts (geist, geist-mono, persian cuts)", () => {
    expect(isGoogleFont("geist")).toBe(false)
    expect(isGoogleFont("geist-mono")).toBe(false)
    expect(isGoogleFont("vazirmatn")).toBe(false)
    for (const f of FA_FONTS) {
      expect(isGoogleFont(f.dir)).toBe(false)
    }
  })

  it("builds a css2 url with family name url-encoded", () => {
    const url = googleFontCssUrl("space-grotesk")
    expect(url).toContain("family=Space%20Grotesk")
    expect(url).toContain("wght@300..700")
    expect(url).toContain("display=swap")
  })
})