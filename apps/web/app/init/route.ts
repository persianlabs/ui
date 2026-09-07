import { NextResponse, type NextRequest } from "next/server"

import { BASE_COLOR_VARS, THEME_VARS } from "@/lib/create/theme-data"
import {
  RADII,
  type BaseColorName,
  type RadiusName,
  type ThemeName,
} from "@/lib/create/config"

// The /init endpoint: serves a registry:base item describing the whole
// design system for a preset, exactly like ui.shadcn.com/init does for
// shadcn. The persianlabsui CLI fetches this and hands the payload to the
// shadcn CLI to install.
//
// GET /init?baseColor=neutral&theme=violet&radius=default&font=geist
//          &fontHeading=inherit&faFont=vazirmatn&faFontHeading=vazirmatn
//          &rtl=true&base=base[&template=next|vite|next-turborepo][&only=theme|font]

const BASE_COLORS = [
  "neutral",
  "stone",
  "zinc",
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const
const THEMES = [
  "neutral",
  "stone",
  "zinc",
  "mauve",
  "olive",
  "mist",
  "taupe",
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
const RADII_NAMES = ["default", "none", "small", "medium", "large"] as const
const MENU_ACCENTS = ["subtle", "bold"] as const
const MENU_COLORS = [
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent",
] as const
const FONT_SOURCES = ["local", "next"] as const
const MONO_FONTS = ["geist-mono"] as const
const REGISTRY_BASE_PARTS = ["theme", "font"] as const

function pick<T extends readonly string[]>(
  params: URLSearchParams,
  key: string,
  allowed: T,
  fallback: T[number]
): T[number] {
  const value = params.get(key)
  return value && (allowed as readonly string[]).includes(value)
    ? (value as T[number])
    : fallback
}

function parseOnly(
  params: URLSearchParams
): { ok: true; parts: string[] } | { ok: false; error: string } {
  const raw = params.get("only")
  if (!raw) return { ok: true, parts: [] }
  const parts = raw.split(",").filter(Boolean)
  const invalid = parts.filter(
    (p) => !(REGISTRY_BASE_PARTS as readonly string[]).includes(p)
  )
  if (!parts.length || invalid.length) {
    return {
      ok: false,
      error: `Invalid only value. Use one or more of: ${REGISTRY_BASE_PARTS.join(", ")}`,
    }
  }
  return { ok: true, parts: Array.from(new Set(parts)) }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const baseColor = pick(
      searchParams,
      "baseColor",
      BASE_COLORS,
      "neutral"
    ) as BaseColorName
    const theme = pick(searchParams, "theme", THEMES, "neutral") as ThemeName
    const radiusName = pick(searchParams, "radius", RADII_NAMES, "default")

    const only = parseOnly(searchParams)
    if (!only.ok) {
      return NextResponse.json({ error: only.error }, { status: 400 })
    }

    const baseVars = BASE_COLOR_VARS[baseColor]
    const themeVars = THEME_VARS[theme]
    if (!baseVars || !themeVars) {
      return NextResponse.json(
        { error: `Unknown baseColor "${baseColor}" or theme "${theme}"` },
        { status: 400 }
      )
    }

    const menuAccent = pick(searchParams, "menuAccent", MENU_ACCENTS, "subtle")

    // Merge base color + theme (theme wins), then apply menu accent and radius.
    const buildSide = (side: "light" | "dark") => {
      const merged: Record<string, string> = {
        ...baseVars[side],
        ...themeVars[side],
      }
      // Bold menu accent: the accent tokens take the primary color — same
      // transformation as buildPreviewStyle for the live preview.
      if (menuAccent === "bold" && merged.primary && merged.accent) {
        merged.accent = merged.primary
        const primaryFg = merged["primary-foreground"]
        if (primaryFg) {
          merged["accent-foreground"] = primaryFg
        }
      }
      const radius = RADII.find((r) => r.value === (radiusName as RadiusName))
      if (radius && radius.value !== "default" && radius.css) {
        merged.radius = radius.css
      }
      return merged
    }

    const font = searchParams.get("font") || "geist"
    const fontHeading = searchParams.get("fontHeading") || "inherit"
    const faFont = searchParams.get("faFont") || "vazirmatn"
    const faFontHeading = searchParams.get("faFontHeading") || "vazirmatn"
    const normalizedFaFontHeading =
      faFontHeading === faFont ? "inherit" : faFontHeading
    // Install source per font: "local" downloads the offline woff2 from the
    // registry, "next" scaffolds a next/font import instead (no download,
    // no registry font item).
    const fontSource = pick(searchParams, "fontSource", FONT_SOURCES, "local")
    const fontHeadingSource = pick(
      searchParams,
      "fontHeadingSource",
      FONT_SOURCES,
      "local"
    )
    const faFontSource = pick(
      searchParams,
      "faFontSource",
      FONT_SOURCES,
      "local"
    )
    const faFontHeadingSource = pick(
      searchParams,
      "faFontHeadingSource",
      FONT_SOURCES,
      "local"
    )
    const fontMono = pick(searchParams, "fontMono", MONO_FONTS, "geist-mono")
    const fontMonoSource = pick(
      searchParams,
      "fontMonoSource",
      FONT_SOURCES,
      "local"
    )

    const wantTheme = only.parts.length === 0 || only.parts.includes("theme")
    const wantFont = only.parts.length === 0 || only.parts.includes("font")

    const registryDependencies: string[] = []
    const cssVars: Record<string, unknown> = {}
    const menuColor = pick(searchParams, "menuColor", MENU_COLORS, "default")

    // Note: font install sources (fontSource=local|next) intentionally stay
    // out of `config` — shadcn validates registry:base config keys strictly
    // and rejects unknown ones. The CLI already carries the sources in the
    // preset it used to build this URL and skips "next" downloads itself.
    const config: Record<string, unknown> = {
      style: "nova",
      rtl: true,
      iconLibrary: "lucide",
      menuAccent,
      menuColor,
    }

    if (wantTheme) {
      cssVars.light = buildSide("light")
      cssVars.dark = buildSide("dark")
      config.tailwind = { baseColor }
    }

    if (wantFont) {
      if (fontSource === "local") {
        registryDependencies.push(`font-${font}`)
      }
      if (faFontSource === "local") {
        registryDependencies.push(`font-${faFont}`)
      }
      if (fontHeading !== "inherit" && fontHeadingSource === "local") {
        registryDependencies.push(`font-heading-${fontHeading}`)
      }
      if (
        normalizedFaFontHeading !== "inherit" &&
        faFontHeadingSource === "local"
      ) {
        registryDependencies.push(`font-fa-heading-${normalizedFaFontHeading}`)
      }
      if (fontMonoSource === "local") {
        registryDependencies.push(`font-${fontMono}`)
      }
    }

    const item = {
      $schema: "https://ui.persian-labs.ir/schema/registry-item.json",
      name: only.parts.length ? `nova-${only.parts.join("-")}` : "nova",
      type: "registry:base",
      extends: "none",
      config,
      ...(registryDependencies.length > 0 && { registryDependencies }),
      ...(Object.keys(cssVars).length > 0 && { cssVars }),
      css: wantTheme
        ? {
            '@import "tw-animate-css"': {},
            "@layer base": {
              "*": { "@apply border-border outline-ring/50": {} },
              body: {
                "@apply bg-background text-foreground": {},
                'font-feature-settings: "ss01"': {},
              },
            },
          }
        : undefined,
    }

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
