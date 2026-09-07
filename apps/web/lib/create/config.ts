import { BASE_COLOR_VARS, THEME_VARS } from "@/lib/create/theme-data"

// Catalogs for the /create customizer. Values match the preset codec in
// packages/cli (persianlabsui/preset) — the array orders there are
// append-only for backward compat, so keep these in sync.

export type BaseColorName =
  "neutral" | "stone" | "zinc" | "mauve" | "olive" | "mist" | "taupe"

export const BASE_COLORS: Array<{
  value: BaseColorName
  title: string
}> = [
  { value: "neutral", title: "Neutral" },
  { value: "stone", title: "Stone" },
  { value: "zinc", title: "Zinc" },
  { value: "mauve", title: "Mauve" },
  { value: "olive", title: "Olive" },
  { value: "mist", title: "Mist" },
  { value: "taupe", title: "Taupe" },
]

export type ThemeName =
  | "neutral"
  | "stone"
  | "zinc"
  | "mauve"
  | "olive"
  | "mist"
  | "taupe"
  | "amber"
  | "blue"
  | "cyan"
  | "emerald"
  | "fuchsia"
  | "green"
  | "indigo"
  | "lime"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "rose"
  | "sky"
  | "teal"
  | "violet"
  | "yellow"

export const THEMES: Array<{ value: ThemeName; title: string }> = [
  { value: "neutral", title: "Neutral" },
  { value: "stone", title: "Stone" },
  { value: "zinc", title: "Zinc" },
  { value: "mauve", title: "Mauve" },
  { value: "olive", title: "Olive" },
  { value: "mist", title: "Mist" },
  { value: "taupe", title: "Taupe" },
  { value: "amber", title: "Amber" },
  { value: "blue", title: "Blue" },
  { value: "cyan", title: "Cyan" },
  { value: "emerald", title: "Emerald" },
  { value: "fuchsia", title: "Fuchsia" },
  { value: "green", title: "Green" },
  { value: "indigo", title: "Indigo" },
  { value: "lime", title: "Lime" },
  { value: "orange", title: "Orange" },
  { value: "pink", title: "Pink" },
  { value: "purple", title: "Purple" },
  { value: "red", title: "Red" },
  { value: "rose", title: "Rose" },
  { value: "sky", title: "Sky" },
  { value: "teal", title: "Teal" },
  { value: "violet", title: "Violet" },
  { value: "yellow", title: "Yellow" },
]

// Mirrors shadcn's getThemesForBaseColor: the theme matching the base color
// plus every non-base theme. The picker renders base themes first.
export function getThemesForBaseColor(baseColor: BaseColorName) {
  const baseColorNames = BASE_COLORS.map((b) => b.value)
  return THEMES.filter((theme) => {
    if (theme.value === baseColor) {
      return true
    }
    return !baseColorNames.includes(theme.value as BaseColorName)
  })
}

export type RadiusName = "default" | "none" | "small" | "medium" | "large"

export const RADII: Array<{
  value: RadiusName
  title: string
  css: string
}> = [
  { value: "none", title: "None", css: "0rem" },
  { value: "small", title: "Small", css: "0.35rem" },
  { value: "default", title: "Default", css: "0.625rem" },
  { value: "medium", title: "Medium", css: "0.85rem" },
  { value: "large", title: "Large", css: "1.1rem" },
]

export function getRadiusCss(radius: RadiusName) {
  return RADII.find((r) => r.value === radius)?.css ?? "0.625rem"
}

// Swatches for the pickers.
export function getBaseColorSwatch(name: BaseColorName) {
  return BASE_COLOR_VARS[name]?.light.border ?? "oklch(0.922 0 0)"
}

export function getThemeSwatch(name: ThemeName) {
  return THEME_VARS[name]?.light.primary ?? "oklch(0.205 0 0)"
}

// Builds the inline CSS variable overrides for the live preview.
// Base color paints the neutrals, the theme overlays primary/ring, and
// radius feeds the --radius scale the components derive from.
export function buildPreviewStyle(
  baseColor: BaseColorName,
  theme: ThemeName,
  radius: RadiusName,
  mode: "light" | "dark",
  menuAccent: "subtle" | "bold" = "subtle"
): React.CSSProperties {
  const base = BASE_COLOR_VARS[baseColor]?.[mode] ?? {}
  const themeOverride = THEME_VARS[theme]?.[mode] ?? {}
  const merged = { ...base, ...themeOverride }

  // Bold menu accent: the accent tokens take the primary color, like
  // shadcn's buildRegistryTheme menuAccent transformation.
  if (menuAccent === "bold" && merged.primary) {
    if (merged.accent) {
      merged.accent = merged.primary
      const primaryFg = merged["primary-foreground"]
      if (primaryFg) {
        merged["accent-foreground"] = primaryFg
      }
    }
  }

  const style: Record<string, string> = {
    "--radius": getRadiusCss(radius),
  }
  for (const [key, value] of Object.entries(merged)) {
    if (value) style[`--${key}`] = value
  }
  return style as React.CSSProperties
}
