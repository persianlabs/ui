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
    menuAccent: config.menuAccent,
    menuColor: config.menuColor,
    fontSource: config.fontSource,
    fontHeadingSource: config.fontHeadingSource,
    faFontSource: config.faFontSource,
    faFontHeadingSource: config.faFontHeadingSource,
    fontMono: config.fontMono,
    fontMonoSource: config.fontMonoSource,
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
    // A 404 whose body is an HTML page means the server answered but has no
    // /init route — a stale dev server (running `bun run build` while
    // `next dev` is live corrupts its route manifest). Make that visible.
    if (response.status === 404 && body.includes("<!DOCTYPE html")) {
      throw new Error(
        `The registry at ${new URL(url).origin} has no /init route (404, HTML page).\n` +
          `The dev server is stale — restart it (bun dev in apps/web), or set\n` +
          `PERSIANLABSUI_REGISTRY_URL to a server serving the latest code.`
      )
    }
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

  // "next"-source fonts scaffold a next/font import in the template instead —
  // nothing to download for them.
  if (config.fontSource === "local") {
    const enBody = getFontEntry(EN_FONTS, config.font)
    if (enBody) entries.push({ entry: enBody, role: "body", lang: "en" })
  }

  if (
    config.fontHeading !== "inherit" &&
    config.fontHeadingSource === "local"
  ) {
    const enHeading = getFontEntry(EN_FONTS, config.fontHeading)
    if (enHeading) entries.push({ entry: enHeading, role: "heading", lang: "en" })
  }

  if (config.faFontSource === "local") {
    const faBody = getFontEntry(FA_FONTS, config.faFont)
    if (faBody) entries.push({ entry: faBody, role: "body", lang: "fa" })
  }

  if (
    config.faFontHeading !== config.faFont &&
    config.faFontHeadingSource === "local"
  ) {
    const faHeading = getFontEntry(FA_FONTS, config.faFontHeading)
    if (faHeading) entries.push({ entry: faHeading, role: "heading", lang: "fa" })
  }

  const monoEntry =
    config.fontMonoSource === "local"
      ? getFontEntry(EN_FONTS, config.fontMono)
      : undefined

  const allEntries = [
    ...entries.map((e) => e.entry),
    ...(monoEntry ? [monoEntry] : []),
  ]

  await mkdir(fontsDir, { recursive: true })

  for (const entry of allEntries) {
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

  const css = buildFontsCss(entries, monoEntry)
  const cssPath = path.resolve(cwd, publicDir, "fonts.css")
  await writeFile(cssPath, css)

  return {
    cssPath,
    fontsDir,
    fonts: [
      ...entries.map(({ entry, role, lang }) => ({
        value: entry.value,
        family: entry.family,
        role,
        lang,
      })),
      ...(monoEntry
        ? [{ value: monoEntry.value, family: monoEntry.family, role: "mono", lang: "en" }]
        : []),
    ],
  }
}

// Conventions: each font dir in the registry exposes one variable woff2
// named `<dir>-variable.woff2`. EN fonts keep their latin subset; FA fonts
// are arabic-script subsets WITHOUT Latin glyphs (including ASCII digits —
// digits fall through to the English font). The stack order is always:
// Persian font → English font → system, exposed through the default
// shadcn variables only.
function buildFontsCss(
  entries: Array<{ entry: FontEntry; role: "body" | "heading"; lang: "en" | "fa" }>,
  monoEntry?: FontEntry
) {
  const faces = [...entries.map((e) => e.entry), ...(monoEntry ? [monoEntry] : [])]
    .map((entry) => {
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

  // Mono first so code/IDs keep their width; the Persian font answers any
  // Farsi glyphs inside mono runs (template convention).
  const monoStack = [
    `"${monoEntry?.family ?? ""}"`,
    `"${faBody?.entry.family ?? ""}"`,
    "monospace",
  ]
    .filter((part) => part !== `""`)
    .join(", ")

  const vars = `:root {
  --font-sans: ${sansStack};
  --font-heading: ${headingStack || "var(--font-sans)"};
  --font-mono: ${monoStack};
}`

  return `/* Generated by persianlabsui — offline fonts, no external requests. */\n\n${faces}\n\n${vars}\n`
}
