// Google Fonts helper for init-time font setup.
//
// The CLI never ships font files for English Google fonts — it downloads the
// latest variable woff2 from Google Fonts at init time (always fresh, nothing
// stored in the registry). If the download fails, the caller falls back to
// the Google Fonts CDN (`next/font/google` on Next, a css2 `@import` on
// Vite) and tells the user.
//
// Geist / Geist Mono and the Persian fonts are NOT on Google Fonts: Geist is
// served by next/font/google, and the Persian cuts are shipped in the
// template bases. Those never go through this module.

export type GoogleSpec = {
  /** Google Fonts family name. */
  family: string
  /** Variable weight range on the css2 API, e.g. "100..900". */
  range: string
}

// dir -> Google Fonts spec. Only fonts that exist on fonts.google.com.
export const GOOGLE_FONT_SPECS: Readonly<Record<string, GoogleSpec>> = {
  inter: { family: "Inter", range: "100..900" },
  "noto-sans": { family: "Noto Sans", range: "100..900" },
  "nunito-sans": { family: "Nunito Sans", range: "200..1000" },
  figtree: { family: "Figtree", range: "300..900" },
  roboto: { family: "Roboto", range: "100..900" },
  raleway: { family: "Raleway", range: "100..900" },
  "dm-sans": { family: "DM Sans", range: "100..1000" },
  "public-sans": { family: "Public Sans", range: "100..900" },
  outfit: { family: "Outfit", range: "100..900" },
  oxanium: { family: "Oxanium", range: "200..800" },
  manrope: { family: "Manrope", range: "200..800" },
  "space-grotesk": { family: "Space Grotesk", range: "300..700" },
  montserrat: { family: "Montserrat", range: "100..900" },
  "ibm-plex-sans": { family: "IBM Plex Sans", range: "100..700" },
  "source-sans-3": { family: "Source Sans 3", range: "200..900" },
  "instrument-sans": { family: "Instrument Sans", range: "400..700" },
  "jetbrains-mono": { family: "JetBrains Mono", range: "100..800" },
  "noto-serif": { family: "Noto Serif", range: "100..900" },
  "roboto-slab": { family: "Roboto Slab", range: "100..900" },
  merriweather: { family: "Merriweather", range: "300..900" },
  lora: { family: "Lora", range: "400..700" },
  "playfair-display": { family: "Playfair Display", range: "400..900" },
  "eb-garamond": { family: "EB Garamond", range: "400..800" },
  "instrument-serif": { family: "Instrument Serif", range: "400" },
}

export function isGoogleFont(dir: string): boolean {
  return Object.prototype.hasOwnProperty.call(GOOGLE_FONT_SPECS, dir)
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

/** The css2 stylesheet URL for a family — used for direct @import (CDN fallback). */
export function googleFontCssUrl(dir: string, display = "swap"): string {
  const spec = GOOGLE_FONT_SPECS[dir]
  if (!spec) {
    throw new Error(`"${dir}" is not a Google Font (no css2 spec).`)
  }
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(spec.family)}:wght@${spec.range}&display=${display}`
}

/**
 * Downloads the current latin variable woff2 for a family straight from
 * Google Fonts (css2 stylesheet -> last gstatic url). Throws on any failure
 * so the caller can decide the fallback.
 */
export async function downloadVariableWoff2(dir: string): Promise<Uint8Array> {
  const spec = GOOGLE_FONT_SPECS[dir]
  if (!spec) {
    throw new Error(`"${dir}" has no Google Fonts spec to download.`)
  }
  const cssUrl = googleFontCssUrl(dir)
  const res = await fetch(cssUrl, { headers: { "User-Agent": UA } })
  if (!res.ok) {
    throw new Error(`Google Fonts CSS request failed (${res.status}) for ${spec.family}`)
  }
  const css = await res.text()
  const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)].map(
    (m) => m[1]
  )
  if (urls.length === 0) {
    throw new Error(`No woff2 URL found for ${spec.family}`)
  }
  // The CSS lists subsets in order with latin last; the final url is the
  // latin variable face.
  const woff2Url = urls[urls.length - 1]!
  const file = await fetch(woff2Url, { headers: { "User-Agent": UA } })
  if (!file.ok) {
    throw new Error(`Google Fonts woff2 download failed (${file.status}) for ${spec.family}`)
  }
  return new Uint8Array(await file.arrayBuffer())
}