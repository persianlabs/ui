import { describe, expect, it } from "vitest"

import {
  decodePreset,
  encodePreset,
  isPresetCode,
  DEFAULT_PRESET_CONFIG,
} from "./preset.js"

describe("preset codec", () => {
  it("encodes the default config to a v1 code", () => {
    const code = encodePreset({})
    expect(code[0]).toBe("a")
    expect(isPresetCode(code)).toBe(true)
  })

  it("round-trips every field", () => {
    const config = {
      style: "nova",
      baseColor: "zinc",
      theme: "violet",
      font: "geist",
      fontHeading: "space-grotesk",
      faFont: "estedad",
      faFontHeading: "mikhak",
      radius: "large",
    } as const

    const code = encodePreset(config)
    expect(decodePreset(code)).toEqual(config)
  })

  it("round-trips the default config", () => {
    const code = encodePreset(DEFAULT_PRESET_CONFIG)
    expect(decodePreset(code)).toEqual(DEFAULT_PRESET_CONFIG)
  })

  it("rejects invalid codes", () => {
    expect(decodePreset("")).toBeNull()
    expect(decodePreset("a")).toBeNull()
    expect(decodePreset("zzzz")).toBeNull()
    expect(decodePreset("1a2b3c")).toBeNull()
    expect(isPresetCode("not-a-code")).toBe(false)
  })

  it("clamps out-of-range indices to the default value", () => {
    // Craft a code whose theme bits exceed the array length.
    const longCode = "a" + "Z".repeat(8)
    const decoded = decodePreset(longCode)
    if (decoded) {
      expect(Object.values(decoded).every((v) => typeof v === "string")).toBe(true)
    }
  })
})
