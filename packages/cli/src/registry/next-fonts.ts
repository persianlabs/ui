// Next.js template font generation. The Next base keeps fonts as
// `next/font/local` imports in lib/fonts.ts backed by woff2 files in
// app/_assets/fonts/, wired through CSS variables in app/globals.css. Unlike
// Vite (which routes everything through the generated public/fonts.css), the
// Next template must be rewritten per-picked-font so the picked EN body,
// heading and mono fonts actually render instead of always Geist.
//
// Delivery model (per picked font, from its source):
//   - local: English Google fonts are downloaded FRESH from Google Fonts at
//     init time (nothing pre-stored in the registry — always the latest
//     Google ships). If the download fails we message the user and fall
//     back to next/font/google (the not-local version).
//   - next:  emit a next/font/google import, nothing is downloaded.
//
// Geist / Geist Mono and Vazirmatn are not on Google Fonts: the base ships
// their woff2 files, renamed to the no-"-variable" convention here. Any
// leftover base asset that no picked font references is removed so the
// project stays clean.
import { existsSync } from "node:fs"
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises"
import path from "node:path"

import {
  EN_FONTS,
  FA_FONTS,
  getFontEntry,
  type FontEntry,
} from "../preset/fonts.js"
import type { PresetConfig } from "../preset/preset.js"
import { logger } from "../utils/logger.js"
import { downloadVariableWoff2, isGoogleFont } from "./google-fonts.js"

type Delivery = { kind: "local"; fileName: string } | { kind: "google" }

type Slot = { entry: FontEntry; delivery: Delivery; variable: string }

// "Source Sans 3" -> source-sans, "Geist Mono" -> geist-mono
function varName(title: string) {
  return title
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
}

// "Space Grotesk" -> SpaceGrotesk (asset basename and const name stem)
function constName(title: string) {
  return title.replace(/\s+/g, "")
}

// "Space Grotesk" -> Space_Grotesk (next/font/google export name)
function googleName(title: string) {
  return title.replace(/\s+/g, "_")
}

function localFontDecl(entry: FontEntry, fileName: string, variable: string) {
  const constNameN = constName(entry.title)
  return `const ${constNameN} = localFont({
  src: "../app/_assets/fonts/${fileName}",
  weight: "${entry.weights}",
  variable: "--${variable}",
  display: "swap",
  fallback: [],
  adjustFontFallback: false,
})`
}

function googleFontDecl(entry: FontEntry, variable: string) {
  // Single-weight fonts (e.g. Instrument Serif "400") have no variable axis
  // and must declare an explicit weight for next/font/google. Multi-weight
  // entries (e.g. "100 900" or "400 700") are variable fonts and omit the
  // weight option so next/font serves the full range.
  const isVariable = entry.weights.includes(" ") || entry.weights.includes("..")
  const lines = [`  subsets: ["latin"],`]
  if (!isVariable) {
    lines.push(`  weight: ${JSON.stringify(entry.weights)},`)
  }
  lines.push(
    `  variable: "--${variable}",`,
    `  display: "swap",`,
    `  adjustFontFallback: false,`
  )
  return `const ${constName(entry.title)} = ${googleName(entry.title)}({
${lines.join("\n")}
})`
}

export async function installNextFonts(
  config: PresetConfig,
  cwd: string,
  options?: { cssPath?: string }
) {
  // appDir is apps/web for monorepos or the repo root for flat bases. The
  // paths below are relative to appDir — except the globals.css rewrite,
  // which lives in packages/ui for monorepos (the ui package owns the
  // stylesheet there, mirroring the shadcn monorepo layout).
  const appDir = cwd
  const assetsDir = path.join(appDir, "app", "_assets", "fonts")
  await mkdir(assetsDir, { recursive: true })

  const enBody = getFontEntry(EN_FONTS, config.font)
  const enHeading =
    config.fontHeading !== "inherit"
      ? getFontEntry(EN_FONTS, config.fontHeading)
      : undefined
  const enMono = getFontEntry(EN_FONTS, config.fontMono)
  // The picked Persian font (Vazirmatn by default). FA cuts ship in the
  // base as <Title>Variable.woff2 and are renamed per ensureBaseAsset.
  const fa =
    getFontEntry(FA_FONTS, config.faFont) ??
    getFontEntry(FA_FONTS, "vazirmatn")!

  // Monorepo-spot the base-shipped source file for a non-Google font and
  // rename it to the no-"-variable" convention in place.
  async function ensureBaseAsset(entry: FontEntry): Promise<Delivery> {
    const stem = constName(entry.title)
    const fileName = `${stem}.woff2`
    const baseName = `${stem}Variable.woff2`
    const target = path.join(assetsDir, fileName)
    const source = path.join(assetsDir, baseName)
    if (!existsSync(target)) {
      if (!existsSync(source)) {
        logger.warn(
          `  ${entry.title}: base font file missing (${baseName}). ` +
            `Falling back to next/font (Google CDN).`
        )
        return { kind: "google" }
      }
      await rename(source, target)
    }
    return { kind: "local", fileName }
  }

  // local source -> download the LATEST variable woff2 from Google Fonts
  // right now; on failure message the user and fall back to next/font.
  async function resolve(
    entry: FontEntry,
    configSource: string
  ): Promise<Delivery> {
    if (configSource !== "local") return { kind: "google" }
    if (!isGoogleFont(entry.dir)) return ensureBaseAsset(entry)
    try {
      const bytes = await downloadVariableWoff2(entry.dir)
      const fileName = `${constName(entry.title)}.woff2`
      await writeFile(path.join(assetsDir, fileName), Buffer.from(bytes))
      return { kind: "local", fileName }
    } catch (error) {
      logger.warn(
        `  ${entry.title}: failed to download from Google Fonts ` +
          `(${error instanceof Error ? error.message : String(error)}). ` +
          `Falling back to next/font (Google CDN).`
      )
      return { kind: "google" }
    }
  }

  const faSlot: Slot = {
    entry: fa,
    delivery: await ensureBaseAsset(fa),
    variable: "font-fa",
  }
  // A distinct FA heading pick (inherit / same-as-body resolves away in the
  // web layer, so a differing value here always means a second font).
  const faHeading =
    config.faFontHeading !== "inherit" && config.faFontHeading !== config.faFont
      ? getFontEntry(FA_FONTS, config.faFontHeading)
      : undefined
  const faHeadingSlot: Slot | undefined = faHeading
    ? {
        entry: faHeading,
        delivery: await ensureBaseAsset(faHeading),
        variable: "font-fa-heading",
      }
    : undefined
  const bodySlot = enBody
    ? {
        entry: enBody,
        delivery: await resolve(enBody, config.fontSource),
        variable: `font-${varName(enBody.title)}`,
      }
    : undefined
  const headingSlot =
    enHeading && enHeading.dir !== enBody?.dir
      ? {
          entry: enHeading,
          delivery: await resolve(enHeading, config.fontHeadingSource),
          variable: `font-heading-${varName(enHeading.title)}`,
        }
      : undefined
  const monoSlot =
    enMono && enMono.dir !== enBody?.dir && enMono.dir !== enHeading?.dir
      ? {
          entry: enMono,
          delivery: await resolve(enMono, config.fontMonoSource),
          variable: `font-mono-${varName(enMono.title)}`,
        }
      : undefined

  // Keep exactly the assets the generated fonts.ts references (plus the
  // picked FA fonts). The other base-shipped FA cut is removed.
  const faFileName = `${constName(fa.title)}.woff2`
  const keep = new Set<string>(
    faSlot.delivery.kind === "local" ? [faFileName] : []
  )
  for (const slot of [faHeadingSlot, bodySlot, headingSlot, monoSlot]) {
    if (slot?.delivery.kind === "local") keep.add(slot.delivery.fileName)
  }
  let existing: string[] = []
  try {
    existing = await readdir(assetsDir)
  } catch {
    // dir missing — nothing to clean
  }
  for (const file of existing) {
    if (!keep.has(file)) await rm(path.join(assetsDir, file), { force: true })
  }

  const slots = [faSlot, faHeadingSlot, bodySlot, headingSlot, monoSlot].filter(
    (s): s is Slot => Boolean(s)
  )
  const fontsTs = buildFontsTs(slots, fa)
  await writeFile(path.join(appDir, "lib", "fonts.ts"), fontsTs + "\n")

  await rewriteGlobalsCss(
    options?.cssPath ?? path.join(appDir, "app", "globals.css"),
    enBody,
    enHeading,
    enMono,
    fa,
    faHeadingSlot
  )
}

function buildFontsTs(slots: Slot[], fa: FontEntry) {
  const googleSlots = slots.filter((s) => s.delivery.kind === "google")
  const googleImports = googleSlots.length
    ? `import { ${googleSlots.map((s) => googleName(s.entry.title)).join(", ")} } from "next/font/google"\n`
    : ""

  const decls = slots.map((slot) =>
    slot.delivery.kind === "local"
      ? localFontDecl(slot.entry, slot.delivery.fileName, slot.variable)
      : googleFontDecl(slot.entry, slot.variable)
  )

  const vars = slots.map((s) => `${constName(s.entry.title)}.variable`)

  return `import localFont from "next/font/local"
import { cn } from "cn"
${googleImports}
// Persian: our custom ${fa.title} cut (built by scripts/build-${fa.dir}-subset.py
// from the upstream variable font). Variable weights ${fa.weights}, digits 0-9
// kept, Arabic/Persian kept, Latin LETTERS removed — so English falls
// through to the English font and body ${fa.digitsFeature ?? "ss01"} turns typed digits
// into Farsi. This font is LOCAL ONLY: the file is ours, nothing on Google
// Fonts matches it.
${decls.join("\n\n")}

export const fontVariables = cn(
${vars.map((v) => `  ${v},`).join("\n")}
)
`
}

// Rewrites the --font-sans/--font-heading/--font-mono runtime variables in
// the :root block (the @theme inline block is left untouched — the base
// already routes utilities through those same var names, and its
// `--font-heading: var(--font-sans)` self-reference must stay). Vazirmatn
// first (owns Persian glyphs + digits), the picked EN font second, the
// heading/mono after.
async function rewriteGlobalsCss(
  cssPath: string,
  enBody: ReturnType<typeof getFontEntry>,
  enHeading: ReturnType<typeof getFontEntry>,
  enMono: ReturnType<typeof getFontEntry>,
  fa: FontEntry,
  faHeadingSlot?: Slot
) {
  let css = await readFile(cssPath, "utf8")

  const bodyVar = enBody ? `var(--font-${varName(enBody.title)})` : null
  const faVar = "var(--font-fa)"
  const faHeadingVar = faHeadingSlot ? "var(--font-fa-heading)" : null
  const headingVar =
    enHeading && enHeading.dir !== enBody?.dir
      ? `var(--font-heading-${varName(enHeading.title)})`
      : bodyVar
  const monoVar =
    enMono && enMono.dir !== enBody?.dir && enMono.dir !== enHeading?.dir
      ? `var(--font-mono-${varName(enMono.title)})`
      : null

  const sansStack = [faVar, bodyVar].filter(Boolean).join(", ")
  const headingStack = [faHeadingVar ?? faVar, headingVar]
    .filter(Boolean)
    .join(", ")
  const monoStack = [monoVar, faVar].filter(Boolean).join(", ")

  // Scope edits to the :root block only — never the @theme inline block.
  const rootStart = css.indexOf(":root {")
  const rootEnd = css.indexOf("\n}", rootStart)
  if (rootStart === -1 || rootEnd === -1) {
    throw new Error(
      "Could not locate the :root block in globals.css to rewrite font vars."
    )
  }
  const before = css.slice(0, rootStart)
  let root = css.slice(rootStart, rootEnd)
  const after = css.slice(rootEnd)

  // The base comment above the font vars names Geist specifically; rewrite
  // it to name the fonts this preset actually picked so the project reads
  // accurately.
  const bodyTitle = enBody?.title ?? "Geist"
  const monoTitle = enMono?.title ?? "Geist Mono"
  const digitsFeature = fa.digitsFeature ?? "ss01"
  const fontComment = `    /* Our custom ${fa.title} cut first (variable, digits + Arabic, NO Latin
       letters — built by scripts/build-${fa.dir}-subset.py). It owns
       Persian glyphs AND digits; body ${digitsFeature} (below) turns typed 0-9
       into Farsi digits. English falls through to ${bodyTitle} — the cut has
       no Latin letters. No system fallbacks by design. Mono stays
       ${monoTitle} first so code numbers keep their width. */\n`
  root = root.replace(
    /\/\* Our custom \w+ cut first[\s\S]*?\*\/\n/,
    fontComment
  )

  root = root
    // Handle an already-set --font-heading line, else we insert one after --font-sans.
    .replace(/(--font-heading:\s*)[^;]+;?/, `$1${headingStack};`)

  root = root.replace(/(--font-sans:\s*)[^;]+;?/, `$1${sansStack};`)
  root = root.replace(/(--font-mono:\s*)[^;]+;?/, `$1${monoStack};`)

  // Ensure a runtime --font-heading exists in :root (base only maps it in
  // @theme inline). Insert it right after the --font-sans line if absent.
  if (!root.includes("--font-heading:")) {
    root = root.replace(
      /(--font-sans:[^;]+;)/,
      `$1\n    --font-heading: ${headingStack};`
    )
  }

  await writeFile(cssPath, before + root + after)

  // The digit utilities + body rule enable the FA font's Farsi-digits
  // stylistic set — ss01 for Vazirmatn, ss20 for Estedad.
  const globalsCss = await readFile(cssPath, "utf8")
  await writeFile(
    cssPath,
    globalsCss.replaceAll('"ss01"', `"${fa.digitsFeature ?? "ss01"}"`)
  )
}
