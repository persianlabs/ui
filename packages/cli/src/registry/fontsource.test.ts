import { describe, expect, it } from "vitest"

import { EN_FONTS } from "../preset/fonts.js"
import { fontsourceFamily, fontsourcePkg } from "./fetch-base.js"
import { GOOGLE_FONT_SPECS } from "./google-fonts.js"

describe("fontsource mapping", () => {
  it("maps every EN font to a variable fontsource package", () => {
    for (const f of EN_FONTS) {
      if (f.weights.includes(" ")) {
        expect(fontsourcePkg(f)).toBe(`@fontsource-variable/${f.dir}`)
      } else {
        expect(fontsourcePkg(f)).toBe(`@fontsource/${f.dir}`)
      }
    }
  })

  it("names the family the fontsource package serves", () => {
    const figtree = EN_FONTS.find((f) => f.dir === "figtree")!
    expect(fontsourceFamily(figtree)).toBe("Figtree Variable")

    const instrumentSerif = EN_FONTS.find((f) => f.dir === "instrument-serif")!
    expect(fontsourceFamily(instrumentSerif)).toBe("Instrument Serif")

    // Geist (non-Google, but ships on fontsource) keeps its "Variable" name.
    const geist = EN_FONTS.find((f) => f.dir === "geist")!
    expect(fontsourceFamily(geist)).toBe("Geist Variable")
  })

  it("every Google Font in the catalog has a fontsource package", () => {
    const googleDirs = new Set(Object.keys(GOOGLE_FONT_SPECS))
    for (const f of EN_FONTS) {
      if (googleDirs.has(f.dir)) {
        expect(fontsourcePkg(f)).toMatch(/^@fontsource/)
      }
    }
  })
})
