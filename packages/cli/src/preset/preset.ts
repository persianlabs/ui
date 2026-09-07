// Preset encoding/decoding utilities.
// Bit-packs design system params into a single integer,
// then encodes as base62 with a version prefix character.
// Browser-safe: no Node.js dependencies, no relative imports — the /create
// page imports this file directly from the source via the "./preset"
// package export, so it must stay self-contained.
//
// Rules for backward compat:
//   1. Never reorder existing value arrays — only append.
//   2. New fields must have their default at index 0.
//   3. Only append new fields to the end of PRESET_FIELDS.
//   4. Stay under 53 bits total (JS safe integer limit).
//
// The font value arrays below MUST stay in sync with src/preset/fonts.ts
// (same order — preset.test.ts asserts it).

// Value arrays — order matters for backward compat. Never reorder, only append.
export const PRESET_STYLES = ["nova"] as const

export const PRESET_BASE_COLORS = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "mauve",
  "olive",
  "mist",
  "taupe",
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
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const

export const PRESET_RADII = [
  "default",
  "none",
  "small",
  "medium",
  "large",
] as const

export const PRESET_MENU_ACCENTS = ["subtle", "bold"] as const
export const PRESET_MENU_COLORS = [
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent",
] as const

// Font VALUES in the exact order of src/preset/fonts.ts (append-only).
// First 6 are the original catalog; the rest follow in shadcn's order.
export const PRESET_EN_FONTS = [
  "geist",
  "inter",
  "ibm-plex-sans",
  "manrope",
  "space-grotesk",
  "dm-sans",
  "noto-sans",
  "nunito-sans",
  "figtree",
  "roboto",
  "raleway",
  "public-sans",
  "outfit",
  "oxanium",
  "montserrat",
  "source-sans-3",
  "instrument-sans",
  "geist-mono",
  "jetbrains-mono",
  "noto-serif",
  "roboto-slab",
  "merriweather",
  "lora",
  "playfair-display",
  "eb-garamond",
  "instrument-serif",
] as const

export const PRESET_FA_FONTS = [
  "vazirmatn",
  "estedad",
  "shabnam",
  "sahel",
  "samim",
  "mikhak",
  "azarmehr",
  "parastoo",
  "gandom",
  "tanha",
  "lalezar",
  "markazi-text",
  "noto-naskh-arabic",
  "noto-sans-arabic",
] as const

export const PRESET_EN_FONT_HEADINGS = ["inherit", ...PRESET_EN_FONTS] as const

// Where a font is installed from: "local" (offline woff2 from the registry,
// template uses localFont) or "next" (next/font in the template, no
// download). Availability differs per font — see getFontSources in the web
// app: vazirmatn is local-only, geist is both, other EN fonts are next-only.
export const PRESET_FONT_SOURCES = ["local", "next"] as const

// RTL is always on for this project — it is not a preset field.
// Base UI is the only primitive library — it is not a preset field.
// Charts are not part of the create system — no chart color field.

export type PresetStyle = (typeof PRESET_STYLES)[number]
export type PresetBaseColor = (typeof PRESET_BASE_COLORS)[number]
export type PresetTheme = (typeof PRESET_THEMES)[number]
export type PresetRadius = (typeof PRESET_RADII)[number]
export type PresetMenuAccent = (typeof PRESET_MENU_ACCENTS)[number]
export type PresetMenuColor = (typeof PRESET_MENU_COLORS)[number]
export type PresetEnFont = (typeof PRESET_EN_FONTS)[number]
export type PresetEnFontHeading = (typeof PRESET_EN_FONT_HEADINGS)[number]
export type PresetFaFont = (typeof PRESET_FA_FONTS)[number]
export type PresetFontSource = (typeof PRESET_FONT_SOURCES)[number]

// Mono font for code/numeric surfaces. Index 0 is the original default
// (Geist Mono — matches the default template's --font-mono). Append-only.
export const PRESET_MONO_FONTS = ["geist-mono", "jetbrains-mono"] as const

export type PresetMonoFont = (typeof PRESET_MONO_FONTS)[number]

// V1 fields (version "a"), 37 bits. FROZEN — old links must keep decoding.
// Defaults must stay at index 0.
const PRESET_FIELDS_V1 = [
  { key: "menuColor", values: PRESET_MENU_COLORS, bits: 3 },
  { key: "menuAccent", values: PRESET_MENU_ACCENTS, bits: 3 },
  { key: "radius", values: PRESET_RADII, bits: 3 },
  { key: "faFontHeading", values: PRESET_FA_FONTS, bits: 5 },
  { key: "faFont", values: PRESET_FA_FONTS, bits: 5 },
  { key: "fontHeading", values: PRESET_EN_FONT_HEADINGS, bits: 4 },
  { key: "font", values: PRESET_EN_FONTS, bits: 4 },
  { key: "theme", values: PRESET_THEMES, bits: 5 },
  { key: "baseColor", values: PRESET_BASE_COLORS, bits: 3 },
  { key: "style", values: PRESET_STYLES, bits: 2 },
] as const

// V2 fields (version "b"), 43 bits: wider font fields for the full 26-font
// shadcn catalog plus per-font install sources. Same key order, appended.
const PRESET_FIELDS_V2 = [
  { key: "menuColor", values: PRESET_MENU_COLORS, bits: 3 },
  { key: "menuAccent", values: PRESET_MENU_ACCENTS, bits: 3 },
  { key: "radius", values: PRESET_RADII, bits: 3 },
  { key: "faFontHeading", values: PRESET_FA_FONTS, bits: 5 },
  { key: "faFont", values: PRESET_FA_FONTS, bits: 5 },
  { key: "fontHeading", values: PRESET_EN_FONT_HEADINGS, bits: 5 },
  { key: "font", values: PRESET_EN_FONTS, bits: 5 },
  { key: "theme", values: PRESET_THEMES, bits: 5 },
  { key: "baseColor", values: PRESET_BASE_COLORS, bits: 3 },
  { key: "style", values: PRESET_STYLES, bits: 2 },
  { key: "fontSource", values: PRESET_FONT_SOURCES, bits: 1 },
  { key: "fontHeadingSource", values: PRESET_FONT_SOURCES, bits: 1 },
  { key: "faFontSource", values: PRESET_FONT_SOURCES, bits: 1 },
  { key: "faFontHeadingSource", values: PRESET_FONT_SOURCES, bits: 1 },
] as const

// V3 fields (version "c"), 46 bits: adds the English mono picker (single
// Geist Mono entry for now) plus its install source. Same key order,
// appended.
const PRESET_FIELDS_V3 = [
  ...PRESET_FIELDS_V2,
  { key: "fontMono", values: PRESET_MONO_FONTS, bits: 2 },
  { key: "fontMonoSource", values: PRESET_FONT_SOURCES, bits: 1 },
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
  menuAccent: PresetMenuAccent
  menuColor: PresetMenuColor
  fontSource: PresetFontSource
  fontHeadingSource: PresetFontSource
  faFontSource: PresetFontSource
  faFontHeadingSource: PresetFontSource
  fontMono: PresetMonoFont
  fontMonoSource: PresetFontSource
}

export const DEFAULT_PRESET_CONFIG: PresetConfig = Object.fromEntries(
  PRESET_FIELDS_V3.map((f) => [f.key, f.values[0]])
) as PresetConfig

// Base62 alphabet.
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

// Version prefixes — "a" = v1, "b" = v2 (frozen), "c" = v3 (current).
const CURRENT_VERSION = "c"
const VALID_VERSIONS = ["a", "b", "c"] as const

type PresetField = {
  readonly key: string
  readonly values: readonly string[]
  readonly bits: number
}

function decodeFields(
  bits: number,
  fields: readonly PresetField[]
): Record<string, string> {
  const result = {} as Record<string, string>
  let offset = 0
  for (const field of fields) {
    const idx = Math.floor(bits / 2 ** offset) % 2 ** field.bits
    const value: string | undefined =
      idx < field.values.length ? field.values[idx] : undefined
    result[field.key] = value ?? field.values[0] ?? ""
    offset += field.bits
  }
  return result
}

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

// Encode a PresetConfig into a short alphanumeric code (current version).
export function encodePreset(config: Partial<PresetConfig>) {
  const merged = { ...DEFAULT_PRESET_CONFIG, ...config }

  // Uses multiplication instead of bitwise ops (JS bitwise truncates to 32 bits).
  let bits = 0
  let offset = 0
  for (const field of PRESET_FIELDS_V3) {
    const idx = (field.values as readonly string[]).indexOf(
      merged[field.key as keyof PresetConfig] as string
    )
    bits += (idx === -1 ? 0 : idx) * 2 ** offset
    offset += field.bits
  }

  return CURRENT_VERSION + toBase62(bits)
}

// Decode a preset code back into a PresetConfig. Older versions decode with
// "local" install sources and the default mono (the only behavior that
// existed before those fields were added).
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

  const legacyDefaults = {
    fontSource: "local",
    fontHeadingSource: "local",
    faFontSource: "local",
    faFontHeadingSource: "local",
    fontMono: "geist-mono",
    fontMonoSource: "local",
  } as const

  if (version === "a") {
    return {
      ...legacyDefaults,
      ...decodeFields(bits, PRESET_FIELDS_V1),
    } as PresetConfig
  }

  if (version === "b") {
    return {
      ...legacyDefaults,
      ...decodeFields(bits, PRESET_FIELDS_V2),
    } as PresetConfig
  }

  return decodeFields(bits, PRESET_FIELDS_V3) as PresetConfig
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
