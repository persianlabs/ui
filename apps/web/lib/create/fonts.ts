// Font metadata for the create page pickers. Values match the preset codec
// in persianlabsui/preset (PRESET_EN_FONTS / PRESET_FA_FONTS) — append only.
// Shape mirrors shadcn's create FONTS so the picker (grouping, Aa preview,
// hover override) ports verbatim: every entry carries the loaded preview
// variable + family, and `type` groups the popup into Sans/Serif/Mono.
// `face` is the literal @font-face family name next/font emits ("Inter",
// "Space Grotesk", …) — the preview provider composes stacks from it
// directly because referencing the next/font variables drags in each font's
// synthetic "<Face> Fallback" system face, which on Windows answers Persian
// glyphs before Vazirmatn (the same reason the workspace theme names real
// font-faces instead of composing variables).
// All English fonts are Google Fonts: "local" installs the LATEST variable
// woff2 downloaded fresh from Google Fonts at project-creation time (nothing
// pre-stored); "next" loads the Google version via next/font/google (Vite:
// a css2 @import). Vazirmatn is our custom local cut (local-only): nothing
// on Google Fonts matches it.

export type FontSource = "local" | "next"

export type FontOption = {
  value: string
  title: string
  type: "sans" | "serif" | "mono"
  font: {
    /** Literal @font-face family name emitted by next/font. */
    face: string
    family: string
    previewVariable: string
    style: {
      fontFamily: string
    }
  }
  // Where this font can be installed from. Every English font (a Google
  // Font) is downloadable locally (fresh from Google Fonts at init time)
  // AND loadable via next/font — so all are toggleable local/next.
  // Vazirmatn is our custom local cut (local-only): nothing on Google
  // Fonts matches it.
  sources: { local: boolean; next: boolean }
}

function createFontOption(
  value: string,
  title: string,
  type: FontOption["type"],
  face: string,
  generic: string,
  previewVariable: string,
  sources: FontOption["sources"] = { local: true, next: true }
): FontOption {
  const family = `"${face}", ${generic}`
  return {
    value,
    title,
    type,
    font: {
      face,
      family,
      previewVariable,
      style: {
        fontFamily: family,
      },
    },
    sources,
  }
}

const LOCAL_AND_NEXT = { local: true, next: true } as const
const LOCAL_ONLY = { local: true, next: false } as const

export const FONTS: FontOption[] = [
  createFontOption(
    "geist",
    "Geist",
    "sans",
    "Geist",
    "sans-serif",
    "--font-geist-sans",
    { ...LOCAL_AND_NEXT }
  ),
  createFontOption(
    "inter",
    "Inter",
    "sans",
    "Inter",
    "sans-serif",
    "--font-inter"
  ),
  createFontOption(
    "noto-sans",
    "Noto Sans",
    "sans",
    "Noto Sans",
    "sans-serif",
    "--font-noto-sans"
  ),
  createFontOption(
    "nunito-sans",
    "Nunito Sans",
    "sans",
    "Nunito Sans",
    "sans-serif",
    "--font-nunito-sans"
  ),
  createFontOption(
    "figtree",
    "Figtree",
    "sans",
    "Figtree",
    "sans-serif",
    "--font-figtree"
  ),
  createFontOption(
    "roboto",
    "Roboto",
    "sans",
    "Roboto",
    "sans-serif",
    "--font-roboto"
  ),
  createFontOption(
    "raleway",
    "Raleway",
    "sans",
    "Raleway",
    "sans-serif",
    "--font-raleway"
  ),
  createFontOption(
    "dm-sans",
    "DM Sans",
    "sans",
    "DM Sans",
    "sans-serif",
    "--font-dm-sans"
  ),
  createFontOption(
    "public-sans",
    "Public Sans",
    "sans",
    "Public Sans",
    "sans-serif",
    "--font-public-sans"
  ),
  createFontOption(
    "outfit",
    "Outfit",
    "sans",
    "Outfit",
    "sans-serif",
    "--font-outfit"
  ),
  createFontOption(
    "oxanium",
    "Oxanium",
    "sans",
    "Oxanium",
    "sans-serif",
    "--font-oxanium"
  ),
  createFontOption(
    "manrope",
    "Manrope",
    "sans",
    "Manrope",
    "sans-serif",
    "--font-manrope"
  ),
  createFontOption(
    "space-grotesk",
    "Space Grotesk",
    "sans",
    "Space Grotesk",
    "sans-serif",
    "--font-space-grotesk"
  ),
  createFontOption(
    "montserrat",
    "Montserrat",
    "sans",
    "Montserrat",
    "sans-serif",
    "--font-montserrat"
  ),
  createFontOption(
    "ibm-plex-sans",
    "IBM Plex Sans",
    "sans",
    "IBM Plex Sans",
    "sans-serif",
    "--font-ibm-plex-sans"
  ),
  createFontOption(
    "source-sans-3",
    "Source Sans 3",
    "sans",
    "Source Sans 3",
    "sans-serif",
    "--font-source-sans-3"
  ),
  createFontOption(
    "instrument-sans",
    "Instrument Sans",
    "sans",
    "Instrument Sans",
    "sans-serif",
    "--font-instrument-sans"
  ),
  createFontOption(
    "geist-mono",
    "Geist Mono",
    "mono",
    "Geist Mono",
    "monospace",
    "--font-geist-mono"
  ),
  createFontOption(
    "jetbrains-mono",
    "JetBrains Mono",
    "mono",
    "JetBrains Mono",
    "monospace",
    "--font-jetbrains-mono"
  ),
  createFontOption(
    "noto-serif",
    "Noto Serif",
    "serif",
    "Noto Serif",
    "serif",
    "--font-noto-serif"
  ),
  createFontOption(
    "roboto-slab",
    "Roboto Slab",
    "serif",
    "Roboto Slab",
    "serif",
    "--font-roboto-slab"
  ),
  createFontOption(
    "merriweather",
    "Merriweather",
    "serif",
    "Merriweather",
    "serif",
    "--font-merriweather"
  ),
  createFontOption("lora", "Lora", "serif", "Lora", "serif", "--font-lora"),
  createFontOption(
    "playfair-display",
    "Playfair Display",
    "serif",
    "Playfair Display",
    "serif",
    "--font-playfair-display"
  ),
  createFontOption(
    "eb-garamond",
    "EB Garamond",
    "serif",
    "EB Garamond",
    "serif",
    "--font-eb-garamond"
  ),
  createFontOption(
    "instrument-serif",
    "Instrument Serif",
    "serif",
    "Instrument Serif",
    "serif",
    "--font-instrument-serif"
  ),
]

// Shadcn-style: heading lists show fonts only — "same as body" is the
// internal default, the picker shows the body font when nothing is set.
export const FONT_HEADING_OPTIONS: FontOption[] = [...FONTS]

// Mono font picker (matches the default template's --font-mono: Geist Mono
// first). Values mirror PRESET_MONO_FONTS order — append only.
export const MONO_FONTS: FontOption[] = [
  createFontOption(
    "geist-mono",
    "Geist Mono",
    "mono",
    "Geist Mono",
    "monospace",
    "--font-geist-mono",
    { ...LOCAL_AND_NEXT }
  ),
  createFontOption(
    "jetbrains-mono",
    "JetBrains Mono",
    "mono",
    "JetBrains Mono",
    "monospace",
    "--font-jetbrains-mono",
    { ...LOCAL_AND_NEXT }
  ),
]

export const FA_FONTS: FontOption[] = [
  // Vazirmatn only for now — our custom variable cut (Latin-free arabic
  // subset, built by scripts/build-vazirmatn-subset.py). Other Persian
  // fonts stay codec-only until their woff2 files land in the registry.
  createFontOption(
    "vazirmatn",
    "Vazirmatn",
    "sans",
    "Vazirmatn",
    "sans-serif",
    "--font-vazirmatn",
    { ...LOCAL_ONLY }
  ),
]

export const FA_FONT_HEADING_OPTIONS: FontOption[] = [...FA_FONTS]

export function getFontTitle(list: readonly FontOption[], value: string) {
  return list.find((f) => f.value === value)?.title ?? value
}

export function getFontFace(list: readonly FontOption[], value: string) {
  return list.find((f) => f.value === value)?.font.face
}

export function getFontFamily(list: readonly FontOption[], value: string) {
  return list.find((f) => f.value === value)?.font.style.fontFamily
}

// Sources a font value can install from, in preference order.
export function getFontSources(
  list: readonly FontOption[],
  value: string
): FontSource[] {
  const option = list.find((f) => f.value === value)
  const out: FontSource[] = []
  if (option?.sources.local) out.push("local")
  if (option?.sources.next) out.push("next")
  return out.length > 0 ? out : ["local"]
}
