// Font catalog for the preset system.
// All fonts are served OFFLINE from our registry (stored in this repo) —
// never from Google Fonts, which may be unreachable from Iran.
//
// Every entry maps the preset value to:
//   - display title
//   - repo path to the woff2 files under the registry's public/fonts dir
//   - css family/weight metadata used to generate @font-face rules
//
// When adding a font: append to the end of the value array only.
// The index in the array is what gets bit-packed into preset codes.

export type FontEntry = {
  value: string
  title: string
  /** Directory name under public/fonts in the registry repo. */
  dir: string
  /** CSS font-family value. */
  family: string
  /** Weight range covered by the stored variable font, or "400" etc. */
  weights: string
  license: string
}

// Latin fonts — stored locally. Geist is the default (index 0).
export const EN_FONTS: FontEntry[] = [
  {
    value: "geist",
    title: "Geist",
    dir: "geist",
    family: "Geist",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "inter",
    title: "Inter",
    dir: "inter",
    family: "Inter Variable",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "ibm-plex-sans",
    title: "IBM Plex Sans",
    dir: "ibm-plex-sans",
    family: "IBM Plex Sans",
    weights: "100 700",
    license: "OFL-1.1",
  },
  {
    value: "manrope",
    title: "Manrope",
    dir: "manrope",
    family: "Manrope",
    weights: "200 800",
    license: "OFL-1.1",
  },
  {
    value: "space-grotesk",
    title: "Space Grotesk",
    dir: "space-grotesk",
    family: "Space Grotesk",
    weights: "300 700",
    license: "OFL-1.1",
  },
  {
    value: "dm-sans",
    title: "DM Sans",
    dir: "dm-sans",
    family: "DM Sans",
    weights: "100 1000",
    license: "OFL-1.1",
  },
  {
    value: "noto-sans",
    title: "Noto Sans",
    dir: "noto-sans",
    family: "Noto Sans",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "nunito-sans",
    title: "Nunito Sans",
    dir: "nunito-sans",
    family: "Nunito Sans",
    weights: "200 1000",
    license: "OFL-1.1",
  },
  {
    value: "figtree",
    title: "Figtree",
    dir: "figtree",
    family: "Figtree",
    weights: "300 900",
    license: "OFL-1.1",
  },
  {
    value: "roboto",
    title: "Roboto",
    dir: "roboto",
    family: "Roboto",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "raleway",
    title: "Raleway",
    dir: "raleway",
    family: "Raleway",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "public-sans",
    title: "Public Sans",
    dir: "public-sans",
    family: "Public Sans",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "outfit",
    title: "Outfit",
    dir: "outfit",
    family: "Outfit",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "oxanium",
    title: "Oxanium",
    dir: "oxanium",
    family: "Oxanium",
    weights: "200 800",
    license: "OFL-1.1",
  },
  {
    value: "montserrat",
    title: "Montserrat",
    dir: "montserrat",
    family: "Montserrat",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "source-sans-3",
    title: "Source Sans 3",
    dir: "source-sans-3",
    family: "Source Sans 3",
    weights: "200 900",
    license: "OFL-1.1",
  },
  {
    value: "instrument-sans",
    title: "Instrument Sans",
    dir: "instrument-sans",
    family: "Instrument Sans",
    weights: "400 700",
    license: "OFL-1.1",
  },
  {
    value: "geist-mono",
    title: "Geist Mono",
    dir: "geist-mono",
    family: "Geist Mono",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "jetbrains-mono",
    title: "JetBrains Mono",
    dir: "jetbrains-mono",
    family: "JetBrains Mono",
    weights: "100 800",
    license: "OFL-1.1",
  },
  {
    value: "noto-serif",
    title: "Noto Serif",
    dir: "noto-serif",
    family: "Noto Serif",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "roboto-slab",
    title: "Roboto Slab",
    dir: "roboto-slab",
    family: "Roboto Slab",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "merriweather",
    title: "Merriweather",
    dir: "merriweather",
    family: "Merriweather",
    weights: "300 900",
    license: "OFL-1.1",
  },
  {
    value: "lora",
    title: "Lora",
    dir: "lora",
    family: "Lora",
    weights: "400 700",
    license: "OFL-1.1",
  },
  {
    value: "playfair-display",
    title: "Playfair Display",
    dir: "playfair-display",
    family: "Playfair Display",
    weights: "400 900",
    license: "OFL-1.1",
  },
  {
    value: "eb-garamond",
    title: "EB Garamond",
    dir: "eb-garamond",
    family: "EB Garamond",
    weights: "400 800",
    license: "OFL-1.1",
  },
  {
    value: "instrument-serif",
    title: "Instrument Serif",
    dir: "instrument-serif",
    family: "Instrument Serif",
    weights: "400",
    license: "OFL-1.1",
  },
]

export const EN_FONT_HEADINGS = ["inherit", ...EN_FONTS.map((f) => f.value)]

// Persian fonts — free (OFL/MIT) fonts with full Farsi glyph coverage.
// Downloaded and committed to the registry repo under public/fonts/<dir>/.
//
// IMPORTANT: Persian fonts must be committed as arabic-script subsets
// WITHOUT Latin glyphs (build once with pyftsubset, or use the prebuilt
// arabic-subset files where upstream ships them). Latin letters AND ASCII
// digits must fall through to the English font via the font stack —
// the generated fonts.css puts the Persian family first.
export const FA_FONTS: FontEntry[] = [
  {
    value: "vazirmatn",
    title: "Vazirmatn",
    dir: "vazirmatn",
    family: "Vazirmatn",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "estedad",
    title: "Estedad",
    dir: "estedad",
    family: "Estedad",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "shabnam",
    title: "Shabnam",
    dir: "shabnam",
    family: "Shabnam",
    weights: "100 800",
    license: "OFL-1.1",
  },
  {
    value: "sahel",
    title: "Sahel",
    dir: "sahel",
    family: "Sahel",
    weights: "200 900",
    license: "OFL-1.1",
  },
  {
    value: "samim",
    title: "Samim",
    dir: "samim",
    family: "Samim",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "mikhak",
    title: "Mikhak",
    dir: "mikhak",
    family: "Mikhak",
    weights: "100 900",
    license: "OFL-1.1",
  },
  {
    value: "azarmehr",
    title: "AzarMehr",
    dir: "azarmehr",
    family: "AzarMehr",
    weights: "100 900",
    license: "MIT",
  },
  {
    value: "parastoo",
    title: "Parastoo",
    dir: "parastoo",
    family: "Parastoo",
    weights: "400 700",
    license: "OFL-1.1",
  },
  {
    value: "gandom",
    title: "Gandom",
    dir: "gandom",
    family: "Gandom",
    weights: "400 700",
    license: "OFL-1.1",
  },
  {
    value: "tanha",
    title: "Tanha",
    dir: "tanha",
    family: "Tanha",
    weights: "400 700",
    license: "OFL-1.1",
  },
  {
    value: "lalezar",
    title: "Lalezar (Display)",
    dir: "lalezar",
    family: "Lalezar",
    weights: "400",
    license: "OFL-1.1",
  },
  {
    value: "markazi-text",
    title: "Markazi Text (Serif)",
    dir: "markazi-text",
    family: "Markazi Text",
    weights: "400 700",
    license: "OFL-1.1",
  },
  {
    value: "noto-naskh-arabic",
    title: "Noto Naskh Arabic (Serif)",
    dir: "noto-naskh-arabic",
    family: "Noto Naskh Arabic",
    weights: "400 700",
    license: "OFL-1.1",
  },
  {
    value: "noto-sans-arabic",
    title: "Noto Sans Arabic",
    dir: "noto-sans-arabic",
    family: "Noto Sans Arabic",
    weights: "100 900",
    license: "OFL-1.1",
  },
]

export function getFontEntry(
  list: FontEntry[],
  value: string
): FontEntry | undefined {
  return list.find((f) => f.value === value)
}
