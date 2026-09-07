// Template x preset matrix test for the persianlabsui create system.
//
// Phase A: /init endpoint matrix against the local dev server (default
// http://localhost:3460 — override with BASE_URL). Covers every template,
// every base color, every theme, fonts, radii, menu options and only= parts.
// Phase B: CLI codec round-trip + buildInitUrl per combo (fully offline).
// Phase C (--e2e): scaffold real projects in _templates/<template>--<slug>/
// and run the actual `persianlabsui init` CLI against the local registry.
// Needs network for `npx shadcn@latest`.
//
// Run from repo root:
//   bun scripts/test-templates.mts            (A + B)
//   bun scripts/test-templates.mts --e2e       (A + B + C)
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { spawn } from "node:child_process"

import {
  decodePreset,
  encodePreset,
  type PresetConfig,
} from "../packages/cli/src/preset/preset.ts"
import { buildInitUrl } from "../packages/cli/src/registry/fetch-base.ts"
import {
  BASE_COLOR_VARS,
  THEME_VARS,
} from "../apps/web/lib/create/theme-data.ts"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3460"
const ROOT = path.dirname(path.dirname(Bun.fileURLToPath(import.meta.url)))
const TEMPLATES_DIR = path.join(ROOT, "_templates")
const RUN_E2E = process.argv.includes("--e2e")

const TEMPLATES = ["next", "vite", "next-monorepo", "vite-monorepo"] as const

type Combo = Omit<
  PresetConfig,
  "style" | "fontMono" | "fontMonoSource"
> & {
  slug: string
  fontMono?: PresetConfig["fontMono"]
  fontMonoSource?: PresetConfig["fontMonoSource"]
}

const LOCAL_SOURCES = {
  fontSource: "local",
  fontHeadingSource: "local",
  faFontSource: "local",
  faFontHeadingSource: "local",
  fontMono: "geist-mono",
  fontMonoSource: "local",
} as const

const PRESETS: Combo[] = [
  {
    slug: "default",
    baseColor: "neutral",
    theme: "neutral",
    font: "geist",
    fontHeading: "inherit",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "default",
    menuAccent: "subtle",
    menuColor: "default",
    ...LOCAL_SOURCES,
  },
  {
    slug: "taupe-violet-british",
    baseColor: "taupe",
    theme: "violet",
    font: "space-grotesk",
    fontHeading: "dm-sans",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "large",
    menuAccent: "bold",
    menuColor: "inverted",
    // Next/font install: no woff2 download, no font registry items.
    fontSource: "next",
    fontHeadingSource: "next",
    faFontSource: "local",
    faFontHeadingSource: "local",
  },
  {
    slug: "mauve-amber",
    baseColor: "mauve",
    theme: "amber",
    font: "inter",
    fontHeading: "inherit",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "small",
    menuAccent: "subtle",
    menuColor: "default-translucent",
    ...LOCAL_SOURCES,
  },
  {
    slug: "olive-rose",
    baseColor: "olive",
    theme: "rose",
    font: "manrope",
    fontHeading: "manrope",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "medium",
    menuAccent: "bold",
    menuColor: "inverted-translucent",
    ...LOCAL_SOURCES,
  },
  {
    slug: "mist-sky",
    baseColor: "mist",
    theme: "sky",
    font: "ibm-plex-sans",
    fontHeading: "inherit",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "none",
    menuAccent: "subtle",
    menuColor: "default",
    ...LOCAL_SOURCES,
  },
  {
    slug: "stone-teal",
    baseColor: "stone",
    theme: "teal",
    font: "dm-sans",
    fontHeading: "space-grotesk",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "default",
    menuAccent: "subtle",
    menuColor: "inverted",
    ...LOCAL_SOURCES,
  },
  {
    slug: "zinc-emerald",
    baseColor: "zinc",
    theme: "emerald",
    font: "geist",
    fontHeading: "inter",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "small",
    menuAccent: "bold",
    menuColor: "default",
    ...LOCAL_SOURCES,
  },
  {
    slug: "neutral-lime",
    baseColor: "neutral",
    theme: "lime",
    font: "inter",
    fontHeading: "inherit",
    faFont: "vazirmatn",
    faFontHeading: "vazirmatn",
    radius: "large",
    menuAccent: "subtle",
    menuColor: "default-translucent",
    ...LOCAL_SOURCES,
  },
]

let failures = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) {
    console.log(`  ok   ${name}`)
  } else {
    failures++
    console.log(`  FAIL ${name}${extra ? ` — ${extra}` : ""}`)
  }
}

async function phaseA() {
  console.log("Phase A: /init endpoint matrix")
  const health = await fetch(`${BASE_URL}/init?baseColor=neutral&theme=neutral`)
    .then((r) => r.status)
    .catch(() => 0)
  if (health !== 200) {
    console.log(
      `  dev server not reachable at ${BASE_URL} (status ${health}). Start it: bun dev --port 3460 in apps/web`
    )
    process.exit(1)
  }

  for (const template of TEMPLATES) {
    for (const preset of PRESETS) {
      const code = encodePreset({ style: "nova", ...preset })
      const url = buildInitUrlLocal(code, template)
      const res = await fetch(url)
      const label = `${template}--${preset.slug}`
      check(`${label} status 200`, res.status === 200, `got ${res.status}`)
      if (res.status !== 200) continue
      const item = (await res.json()) as {
        name: string
        config: Record<string, unknown>
        registryDependencies: string[]
        cssVars: { light: Record<string, string>; dark: Record<string, string> }
      }
      check(`${label} style nova + rtl`, item.config.style === "nova" && item.config.rtl === true)
      check(
        `${label} tailwind.baseColor`,
        (item.config.tailwind as { baseColor: string })?.baseColor === preset.baseColor
      )
      const expectedPrimary = THEME_VARS[preset.theme]?.light.primary
      check(
        `${label} theme primary override`,
        item.cssVars.light.primary === expectedPrimary,
        `want ${expectedPrimary}, got ${item.cssVars.light.primary}`
      )
      if (preset.menuAccent === "bold") {
        check(
          `${label} bold accent couples to primary`,
          item.cssVars.light.accent === item.cssVars.light.primary
        )
      }
      const wantHeadingDep =
        preset.fontHeading !== "inherit" && preset.fontHeadingSource === "local"
      void wantHeadingDep
      check(
        `${label} payload carries theme + config, no deps`,
        "cssVars" in item &&
          item.config.style === "nova" &&
          !("registryDependencies" in item)
      )
      // only= parts
      const themeOnly = await fetch(`${url}&only=theme`).then((r) => r.json())
      check(
        `${label} only=theme keeps theme css`,
        "cssVars" in themeOnly && "css" in themeOnly
      )
      const fontOnly = await fetch(`${url}&only=font`).then((r) => r.json())
      check(
        `${label} only=font drops theme`,
        !("cssVars" in fontOnly) && !("css" in fontOnly)
      )
    }
  }
}

// buildInitUrl points at the production host — rewrite to the local server.
function buildInitUrlLocal(code: string, template: string) {
  const remote = buildInitUrl(decodePreset(code)!, { template })
  const u = new URL(remote)
  return `${BASE_URL}/init${u.search}`
}

async function phaseB() {
  console.log("Phase B: codec round-trip (offline)")
  for (const preset of PRESETS) {
    const full = { style: "nova", ...preset } as PresetConfig
    const code = encodePreset(full)
    const decoded = decodePreset(code)
    const { slug: _slug, ...want } = preset
    const same =
      decoded !== null &&
      (Object.keys(want) as (keyof typeof want)[]).every((k) => decoded[k] === want[k])
    check(`round-trip ${preset.slug} (${code})`, same, JSON.stringify(decoded))
  }
  // base color sanity: every base paints neutrals, themes never carry background
  for (const [name, vars] of Object.entries(BASE_COLOR_VARS)) {
    check(`base ${name} has background+primary`, Boolean(vars.light.background && vars.light.primary))
  }
  for (const [name, vars] of Object.entries(THEME_VARS)) {
    check(`theme ${name} carries no background`, !("background" in vars.light))
  }
}

function runCli(args: string[], cwd: string, env: Record<string, string>) {
  return new Promise<{ code: number; log: string }>((resolve) => {
    const child = spawn("bun", args, { cwd, env: { ...process.env, ...env }, shell: false })
    let log = ""
    child.stdout?.on("data", (d) => (log += d.toString()))
    child.stderr?.on("data", (d) => (log += d.toString()))
    child.on("close", (code) => resolve({ code: code ?? 1, log }))
    child.on("error", (e) => resolve({ code: 1, log: String(e) }))
  })
}

async function phaseC() {
  console.log("Phase C: create-from-zero init in _templates/")
  await mkdir(TEMPLATES_DIR, { recursive: true })
  // Default preset only: geist + vazirmatn are the fonts shipped in the
  // template bases, so only it can pass the offline-font step without the
  // network. Every other combination is covered by Phases A + B.
  const combos = TEMPLATES.map((template) => ({ template, preset: PRESETS[0]! }))
  for (const { template, preset } of combos) {
    const dirName = `${template}--${preset.slug}`
    const dir = path.join(TEMPLATES_DIR, dirName)
    // Fresh scaffold every run (init refuses non-empty targets without --force).
    const { rm } = await import("node:fs/promises")
    await rm(dir, { recursive: true, force: true })
    const code = encodePreset({ style: "nova", ...preset })
    const result = await runCli(
      [
        path.join(ROOT, "packages/cli/src/index.ts"),
        "init",
        "--preset", code,
        "--template", template,
        "--name", dirName,
        "--cwd", TEMPLATES_DIR,
        "--silent",
      ],
      ROOT,
      { PERSIANLABSUI_REGISTRY_URL: BASE_URL }
    )
    check(`${dirName} init exit 0`, result.code === 0, result.log.slice(-500))
    if (result.code === 0) {
      const { existsSync } = await import("node:fs")
      // Monorepo bases keep the app in apps/web; flat bases at the root.
      const appDir = template.endsWith("-monorepo") || template === "next-turborepo"
        ? path.join(dir, "apps/web")
        : dir
      check(`${dirName} app scaffolded`, existsSync(path.join(appDir, "package.json")))
      check(`${dirName} components.json`, existsSync(path.join(appDir, "components.json")))
      if (template.startsWith("vite")) {
        const { readFileSync } = await import("node:fs")
        const pkg = readFileSync(path.join(appDir, "package.json"), "utf8")
        const indexCss = readFileSync(path.join(appDir, "src/index.css"), "utf8")
        // Vite: fonts self-host via fontsource packages (+ Vazirmatn asset).
        check(`${dirName} no public/fonts.css`, !existsSync(path.join(appDir, "public/fonts.css")))
        check(`${dirName} Vazirmatn asset`, existsSync(path.join(appDir, "src/assets/fonts/Vazirmatn.woff2")))
        check(`${dirName} geist fontsource dep`, /"@fontsource-variable\/geist"/.test(pkg))
        check(`${dirName} geist import in index.css`, /@import "@fontsource-variable\/geist";/.test(indexCss))
      } else {
        // Next: fonts self-host via app/_assets/fonts + a generated lib/fonts.ts.
        check(`${dirName} fonts.ts`, existsSync(path.join(appDir, "lib/fonts.ts")))
      }
    }
  }
}

await phaseA()
await phaseB()
if (RUN_E2E) {
  await phaseC()
} else {
  console.log("Phase C skipped (pass --e2e to scaffold + run real init)")
}

if (failures > 0) {
  console.log(`\n${failures} FAILURE(S)`)
  process.exit(1)
}
console.log("\nAll matrix checks passed.")
