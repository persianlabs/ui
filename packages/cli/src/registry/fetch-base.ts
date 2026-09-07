import { INIT_ENDPOINT } from "./constants.js"
import {
  getFontEntry,
  EN_FONTS,
  FA_FONTS,
  type FontEntry,
} from "../preset/fonts.js"
import type { PresetConfig } from "../preset/preset.js"
import { writeFile, rm, readFile } from "node:fs/promises"
import path from "node:path"
import { googleFontCssUrl, isGoogleFont } from "./google-fonts.js"

export function buildInitUrl(
  config: PresetConfig,
  options?: {
    template?: string
    only?: string
  }
) {
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

  if (options?.template) params.set("template", options.template)
  if (options?.only) params.set("only", options.only)
  return `${INIT_ENDPOINT}?${params.toString()}`
}

export async function fetchRegistryBase(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    const body = await response.text().catch(() => "")
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

// ---------------------------------------------------------------------------
// Vite font setup — fontsource npm packages + Google CDN css2 @import.
// ---------------------------------------------------------------------------
//
//   - local source, EN Google font  -> self-hosted @fontsource-variable/*
//     npm package, bundled by Vite at build time. No runtime CDN hit.
//   - next source                   -> Google Fonts css2 @import in index.css.
//   - Geist / Geist Mono            -> their @fontsource packages (matching
//     shadcn's own Vite default).
//   - Persian cuts (Vazirmatn)      -> custom Latin-free woff2 committed in
//     src/assets/fonts, with a @font-face already in the base's index.css.
//     fontsource's Vazirmatn includes Latin and would break the Persian-first
//     / Latin-fall-through design, so it stays a local asset.
//
// Stack order is Persian -> English -> system, written directly into
// src/index.css @theme inline as static values (shadcn convention).

const FONTSOURCE_VERSION = "^5.3.0"

// The shadcn/tailwind.css import anchors the region the CLI manages.
const CSS_IMPORT_ANCHOR = '@import "shadcn/tailwind.css";'

// Persian fonts ship as custom Latin-free cuts (no variant on fontsource with
// that cut) — they always bundle as a local asset. Everything in EN_FONTS
// (Geist/Geist Mono included) has a fontsource package.
function isPersianFont(dir: string): boolean {
  return FA_FONTS.some((f) => f.dir === dir)
}

export function fontsourcePkg(entry: FontEntry): string {
  const variable = entry.weights.includes(" ")
  return `${variable ? "@fontsource-variable" : "@fontsource"}/${entry.dir}`
}

export function fontsourceFamily(entry: FontEntry): string {
  const variable = entry.weights.includes(" ")
  const base = entry.family.replace(/ Variable$/, "")
  return variable ? `${base} Variable` : base
}

function googleServedFamily(entry: FontEntry): string {
  const base = entry.family.replace(/ Variable$/, "")
  return entry.weights.includes(" ") ? `${base} Variable` : base
}

export type ViteFontDelivery =
  | { kind: "fontsource"; pkg: string; family: string }
  | { kind: "google"; family: string }
  | { kind: "asset"; family: string }

export type ViteFontSlot = {
  entry: FontEntry
  role: "body" | "heading" | "mono"
  lang: "en" | "fa"
  delivery: ViteFontDelivery
}

function slotFamily(slot: ViteFontSlot): string {
  return slot.delivery.family
}

export async function installFontsOffline(
  config: PresetConfig,
  cwd: string,
  options?: { publicDir?: string }
) {
  const appDir = path.resolve(cwd)
  const cssPath = path.resolve(appDir, "src", "index.css")
  const pkgJsonPath = path.resolve(appDir, "package.json")

  // Clean stale public/fonts.css + public/fonts from old vite bases.
  const publicDir = options?.publicDir ?? "public"
  await rm(path.resolve(cwd, publicDir, "fonts.css"), { force: true })
  await rm(path.resolve(cwd, publicDir, "fonts"), {
    recursive: true,
    force: true,
  })

  const slots: ViteFontSlot[] = []

  function resolve(entry: FontEntry, source: string): ViteFontDelivery {
    // Persian fonts always bundle as local assets.
    if (isPersianFont(entry.dir)) {
      return { kind: "asset", family: entry.family }
    }
    if (source === "local") {
      return {
        kind: "fontsource",
        pkg: fontsourcePkg(entry),
        family: fontsourceFamily(entry),
      }
    }
    // next source: a Google Fonts css2 @import. Geist/Geist Mono are not on
    // Google Fonts, so they self-host via fontsource even in next mode.
    if (!isGoogleFont(entry.dir)) {
      return {
        kind: "fontsource",
        pkg: fontsourcePkg(entry),
        family: fontsourceFamily(entry),
      }
    }
    return { kind: "google", family: googleServedFamily(entry) }
  }

  const enBody = getFontEntry(EN_FONTS, config.font)
  const enHeading =
    config.fontHeading !== "inherit"
      ? getFontEntry(EN_FONTS, config.fontHeading)
      : undefined
  const faBody = getFontEntry(FA_FONTS, config.faFont)
  const faHeading =
    config.faFontHeading !== config.faFont
      ? getFontEntry(FA_FONTS, config.faFontHeading)
      : undefined
  const enMono = getFontEntry(EN_FONTS, config.fontMono)

  function add(
    entry: FontEntry | undefined,
    role: ViteFontSlot["role"],
    lang: ViteFontSlot["lang"],
    source: string
  ) {
    if (!entry) return
    slots.push({ entry, role, lang, delivery: resolve(entry, source) })
  }

  add(enBody, "body", "en", config.fontSource)
  if (enHeading && enHeading.dir !== enBody?.dir) {
    add(enHeading, "heading", "en", config.fontHeadingSource)
  }
  add(faBody, "body", "fa", "local")
  if (faHeading && faHeading.dir !== faBody?.dir) {
    add(faHeading, "heading", "fa", "local")
  }
  if (enMono && enMono.dir !== enBody?.dir && enMono.dir !== enHeading?.dir) {
    add(enMono, "mono", "en", config.fontMonoSource)
  }

  // Build the @import lines (fontsource + CDN only; assets have their
  // @font-face already in the base's index.css — no CSS @import needed).
  const importLines = slots
    .filter((s) => s.delivery.kind !== "asset")
    .map((s) => {
      const d = s.delivery
      return d.kind === "fontsource"
        ? `@import "${d.pkg}";`
        : `@import url("${googleFontCssUrl(s.entry.dir)}");`
    })

  // Dedupe identical fontsource packages (same pkg for body + heading = mono).
  const uniqueFontsourcePkgs = [
    ...new Set(
      slots
        .filter((s) => s.delivery.kind === "fontsource")
        .map(
          (s) =>
            (s.delivery as Extract<ViteFontDelivery, { kind: "fontsource" }>)
              .pkg
        )
    ),
  ]

  // ---- Rewrite index.css ----
  let css = await readFile(cssPath, "utf8")

  // 1. Strip any CLI-managed font imports between the shadcn anchor and the
  //    Vazirmatn @font-face.  Matches: @fontsource-* imports, Google css2
  //    url() imports, and the old asset url() imports.
  css = css.replace(
    /^[ \t]*@import[ \t]+(?:"@fontsource[^"]*"|url\("https:\/\/fonts\.googleapis\.com[^"]*"\)|url\("\.\/assets\/fonts\/[^"]*"\));[ \t]*\r?\n/gm,
    ""
  )

  // 2. Insert new imports right after the shadcn/tailwind.css anchor.  The
  //    line's own trailing newline terminates the last import, so the blank
  //    line that separates imports from the Vazirmatn @font-face is kept.
  if (importLines.length) {
    css = css.replace(
      CSS_IMPORT_ANCHOR,
      `${CSS_IMPORT_ANCHOR}\n${importLines.join("\n")}`
    )
  }

  // 3. Rewrite the @theme inline --font-* lines.  Stacks are always
  //    single-quoted family names (matching shadcn convention) followed by
  //    unquoted generic keywords.
  const slotFor = (lang: "en" | "fa", role: "body" | "heading" | "mono") =>
    slots.find((s) => s.lang === lang && s.role === role)

  const faBodySlot = slotFor("fa", "body")
  const enBodySlot = slotFor("en", "body")
  const enHeadingSlot = slotFor("en", "heading")
  const enMonoSlot = slotFor("en", "mono")

  const sansStack = [
    faBodySlot ? `'${slotFamily(faBodySlot)}'` : null,
    enBodySlot ? `'${slotFamily(enBodySlot)}'` : null,
    "ui-sans-serif, system-ui, sans-serif",
  ]
    .filter(Boolean)
    .join(", ")

  const headingStack = [
    faBodySlot ? `'${slotFamily(faBodySlot)}'` : null,
    enHeadingSlot
      ? `'${slotFamily(enHeadingSlot)}'`
      : enBodySlot
        ? `'${slotFamily(enBodySlot)}'`
        : null,
    "ui-sans-serif, system-ui, sans-serif",
  ]
    .filter(Boolean)
    .join(", ")

  const monoStack = [
    enMonoSlot ? `'${slotFamily(enMonoSlot)}'` : null,
    faBodySlot ? `'${slotFamily(faBodySlot)}'` : null,
    "monospace",
  ]
    .filter(Boolean)
    .join(", ")

  const stacks: Record<string, string> = {
    "--font-sans": sansStack,
    "--font-heading": headingStack,
    "--font-mono": monoStack,
  }
  for (const [token, value] of Object.entries(stacks)) {
    // Matches the line inside @theme inline and replaces the entire value
    // while preserving the indent.  The trailing ; is included in the
    // replacement so the line is always well-formed.
    css = css.replace(
      new RegExp(`^([ \\t]*)${token}:[^\\r\\n]*`, "m"),
      `$1${token}: ${value};`
    )
  }

  await writeFile(cssPath, css)

  // ---- Sync @fontsource deps in package.json ----
  if (uniqueFontsourcePkgs.length) {
    const pkgJson = JSON.parse(await readFile(pkgJsonPath, "utf8"))
    const deps: Record<string, string> = (pkgJson.dependencies ??= {})
    for (const pkg of uniqueFontsourcePkgs) {
      deps[pkg] = FONTSOURCE_VERSION
    }
    for (const key of Object.keys(deps)) {
      if (
        (key.startsWith("@fontsource/") ||
          key.startsWith("@fontsource-variable/")) &&
        !uniqueFontsourcePkgs.includes(key)
      ) {
        delete deps[key]
      }
    }
    await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n")
  }

  return {
    cssPath,
    fontsDir: path.resolve(appDir, "src", "assets", "fonts"),
    fonts: slots.map(({ entry, role, lang, delivery }) => ({
      value: entry.value,
      family: delivery.family,
      role,
      lang,
    })),
  }
}
