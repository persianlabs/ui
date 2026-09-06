// Preset encoding/decoding utilities.
// Bit-packs design system params into a single integer,
// then encodes as base62 with a version prefix character.
// Browser-safe: no Node.js dependencies.
//
// Rules for backward compat:
//   1. Never reorder existing value arrays — only append.
//   2. New fields must have their default at index 0.
//   3. Only append new fields to the end of PRESET_FIELDS.
//   4. Stay under 53 bits total (JS safe integer limit).

import {
  EN_FONTS,
  EN_FONT_HEADINGS,
  FA_FONTS,
} from "./fonts.js"

// Value arrays — order matters for backward compat. Never reorder, only append.
export const PRESET_STYLES = ["nova"] as const

export const PRESET_BASE_COLORS = [
  "neutral",
  "stone",
  "zinc",
  "gray",
] as const

export const PRESET_THEMES = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "amber",
  "blue",
  "cyan",
  "emerald",
  "fuchsia",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "sky",
  "teal",
  "violet",
  "yellow",
] as const

export const PRESET_RADII = [
  "default",
  "none",
  "small",
  "medium",
  "large",
] as const

// RTL is always on for this project — it is not a preset field.
// Base UI is the only primitive library — it is not a preset field.
// Charts are not part of the create system — no chart color field.

export type PresetStyle = (typeof PRESET_STYLES)[number]
export type PresetBaseColor = (typeof PRESET_BASE_COLORS)[number]
export type PresetTheme = (typeof PRESET_THEMES)[number]
export type PresetRadius = (typeof PRESET_RADII)[number]
export type PresetEnFont = (typeof EN_FONTS)[number]["value"]
export type PresetEnFontHeading = (typeof EN_FONT_HEADINGS)[number]
export type PresetFaFont = (typeof FA_FONTS)[number]["value"]

// V1 fields (version "a"), 37 bits. Defaults must stay at index 0.
const PRESET_FIELDS_V1 = [
  { key: "radius", values: PRESET_RADII, bits: 3 },
  { key: "faFontHeading", values: FA_FONTS.map((f) => f.value), bits: 5 },
  { key: "faFont", values: FA_FONTS.map((f) => f.value), bits: 5 },
  { key: "fontHeading", values: EN_FONT_HEADINGS, bits: 4 },
  { key: "font", values: EN_FONTS.map((f) => f.value), bits: 4 },
  { key: "theme", values: PRESET_THEMES, bits: 5 },
  { key: "baseColor", values: PRESET_BASE_COLORS, bits: 3 },
  { key: "style", values: PRESET_STYLES, bits: 2 },
] as const

export type PresetConfig = {
  style: PresetStyle
  baseColor: PresetBaseColor
  theme: PresetTheme
  font: PresetEnFont
  fontHeading: PresetEnFontHeading
  faFont: PresetFaFont
  faFontHeading: PresetFaFont
  radius: PresetRadius
}

export const DEFAULT_PRESET_CONFIG: PresetConfig = Object.fromEntries(
  PRESET_FIELDS_V1.map((f) => [f.key, f.values[0]])
) as PresetConfig

// Base62 alphabet.
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

// Version prefixes — "a" = v1.
const CURRENT_VERSION = "a"
const VALID_VERSIONS = ["a"] as const

export function toBase62(num: number) {
  if (num === 0) return "0"
  let result = ""
  let n = num
  while (n > 0) {
    result = BASE62[n % 62] + result
    n = Math.floor(n / 62)
  }
  return result
}

export function fromBase62(str: string) {
  let result = 0
  for (let i = 0; i < str.length; i++) {
    const idx = BASE62.indexOf(str[i] ?? "")
    if (idx === -1) return -1
    result = result * 62 + idx
  }
  return result
}

// Encode a PresetConfig into a short alphanumeric code.
export function encodePreset(config: Partial<PresetConfig>) {
  const merged = { ...DEFAULT_PRESET_CONFIG, ...config }

  // Uses multiplication instead of bitwise ops (JS bitwise truncates to 32 bits).
  let bits = 0
  let offset = 0
  for (const field of PRESET_FIELDS_V1) {
    const idx = (field.values as readonly string[]).indexOf(
      merged[field.key as keyof PresetConfig] as string
    )
    bits += (idx === -1 ? 0 : idx) * 2 ** offset
    offset += field.bits
  }

  return CURRENT_VERSION + toBase62(bits)
}

// Decode a preset code back into a PresetConfig.
export function decodePreset(code: string): PresetConfig | null {
  if (!code || code.length < 2) {
    return null
  }

  const version = code[0] ?? ""
  if (!VALID_VERSIONS.includes(version as (typeof VALID_VERSIONS)[number])) {
    return null
  }

  const bits = fromBase62(code.slice(1))
  if (bits < 0) return null

  const result = {} as Record<string, string>
  let offset = 0
  for (const field of PRESET_FIELDS_V1) {
    const idx = Math.floor(bits / 2 ** offset) % 2 ** field.bits
    result[field.key] =
      (idx < field.values.length ? field.values[idx] : undefined) ??
      field.values[0]
    offset += field.bits
  }

  return result as PresetConfig
}

// Check if a string looks like a preset code (version char + base62).
export function isPresetCode(value: string) {
  if (!value || value.length < 2 || value.length > 10) {
    return false
  }

  if (!VALID_VERSIONS.includes(value[0] as (typeof VALID_VERSIONS)[number])) {
    return false
  }

  for (let i = 1; i < value.length; i++) {
    if (BASE62.indexOf(value[i] ?? "") === -1) {
      return false
    }
  }

  return true
}

// Validate that a preset code decodes successfully.
export function isValidPreset(code: string) {
  return decodePreset(code) !== null
}
