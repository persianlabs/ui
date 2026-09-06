import { INIT_ENDPOINT, fontFileUrl } from "./constants.js"
import {
  getFontEntry,
  EN_FONTS,
  FA_FONTS,
  type FontEntry,
} from "../preset/fonts.js"
import type { PresetConfig } from "../preset/preset.js"
import { writeFile, mkdir } from "node:fs/promises"
import path from "node:path"

// Builds our /init URL from a design system config. RTL is always true —
// it is not configurable. Base is always Base UI — it is not configurable.
export function buildInitUrl(config: PresetConfig, options?: {
  template?: string
  only?: string
}) {
  const params = new URLSearchParams({
    style: config.style,
    baseColor: config.baseColor,
    theme: config.theme,
    font: config.font,
    fontHeading: config.fontHeading,
    faFont: config.faFont,
    faFontHeading: config.faFontHeading,
    radius: config.radius,
    rtl: "true",
    base: "base",
  })

  if (options?.template) {
    params.set("template", options.template)
  }
  if (options?.only) {
    params.set("only", options.only)
  }

  return `${INIT_ENDPOINT}?${params.toString()}`
}

export async function fetchRegistryBase(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(
      `Failed to fetch registry base (${response.status}): ${body.slice(0, 200)}`
    )
  }
  return response.json()
}

// Fonts are stored offline in the registry repo (public/fonts/<dir>/).
// The CLI downloads the variable woff2 for every font referenced by the
// config and writes a single fonts.css with @font-face rules. Nothing
// ever loads from Google Fonts — Iran-safe by construction.
//
// Persian fonts are committed as LATIN-FREE arabic-script subsets, so the
// font stack routes languages structurally: Farsi glyphs resolve from the
// Persian font, everything else falls through to the English font, then
// system. We only ever set the DEFAULT shadcn variables — --font-sans and
// --font-heading — no custom -fa variables.
export async function installFontsOffline(
  config: PresetConfig,
  cwd: string,
  options?: { publicDir?: string }
) {
  const publicDir = options?.publicDir ?? "public"
  const fontsDir = path.resolve(cwd, publicDir, "fonts")

  const entries: Array<{ entry: FontEntry; role: "body" | "heading"; lang: "en" | "fa" }> = []

  const enBody = getFontEntry(EN_FONTS, config.font)
  if (enBody) entries.push({ entry: enBody, role: "body", lang: "en" })

  if (config.fontHeading !== "inherit") {
    const enHeading = getFontEntry(EN_FONTS, config.fontHeading)
    if (enHeading) entries.push({ entry: enHeading, role: "heading", lang: "en" })
  }

  const faBody = getFontEntry(FA_FONTS, config.faFont)
  if (faBody) entries.push({ entry: faBody, role: "body", lang: "fa" })

  if (config.faFontHeading !== config.faFont) {
    const faHeading = getFontEntry(FA_FONTS, config.faFontHeading)
    if (faHeading) entries.push({ entry: faHeading, role: "heading", lang: "fa" })
  }

  await mkdir(fontsDir, { recursive: true })

  for (const { entry } of entries) {
    const fileName = `${entry.dir}-variable.woff2`
    const response = await fetch(fontFileUrl(entry.dir, fileName))
    if (!response.ok) {
      throw new Error(
        `Failed to download font ${entry.title} (${response.status}). ` +
          `Expected ${fontFileUrl(entry.dir, fileName)} to exist in the registry.`
      )
    }
    const buffer = Buffer.from(await response.arrayBuffer())
    await writeFile(path.join(fontsDir, fileName), buffer)
  }

  const css = buildFontsCss(entries)
  const cssPath = path.resolve(cwd, publicDir, "fonts.css")
  await writeFile(cssPath, css)

  return {
    cssPath,
    fontsDir,
    fonts: entries.map(({ entry, role, lang }) => ({
      value: entry.value,
      family: entry.family,
      role,
      lang,
    })),
  }
}

// Conventions: each font dir in the registry exposes one variable woff2
// named `<dir>-variable.woff2`. EN fonts keep their latin subset; FA fonts
// are arabic-script subsets WITHOUT Latin glyphs (including ASCII digits —
// digits fall through to the English font). The stack order is always:
// Persian font → English font → system, exposed through the default
// shadcn variables only.
function buildFontsCss(
  entries: Array<{ entry: FontEntry; role: "body" | "heading"; lang: "en" | "fa" }>
) {
  const faces = entries
    .map(({ entry }) => {
      return `@font-face {
  font-family: "${entry.family}";
  src: url("/fonts/${entry.dir}-variable.woff2") format("woff2");
  font-weight: ${entry.weights};
  font-style: normal;
  font-display: swap;
}`
    })
    .join("\n\n")

  const enBody = entries.find((e) => e.lang === "en" && e.role === "body")
  const enHeading = entries.find((e) => e.lang === "en" && e.role === "heading")
  const faBody = entries.find((e) => e.lang === "fa" && e.role === "body")
  const faHeading = entries.find((e) => e.lang === "fa" && e.role === "heading")

  // Persian first (no Latin in the file), English second, system last.
  const sansStack = [
    `"${faBody?.entry.family ?? ""}"`,
    `"${enBody?.entry.family ?? "system-ui"}"`,
    "ui-sans-serif, system-ui, sans-serif",
  ]
    .filter((part) => part !== `""`)
    .join(", ")

  const headingStack = [
    `"${faHeading?.entry.family ?? faBody?.entry.family ?? ""}"`,
    `"${enHeading?.entry.family ?? enBody?.entry.family ?? ""}"`,
  ]
    .filter((part) => part !== `""`)
    .join(", ")

  const vars = `:root {
  --font-sans: ${sansStack};
  --font-heading: ${headingStack || "var(--font-sans)"};
}`

  return `/* Generated by persianlabsui — offline fonts, no external requests. */\n\n${faces}\n\n${vars}\n`
}
