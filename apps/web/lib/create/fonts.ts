// Font metadata for the create page pickers. Values match the preset codec
// in persianlabsui/preset (PRESET_EN_FONTS / PRESET_FA_FONTS) — append only.
// All fonts are LOCAL ONLY: the create system installs woff2 files from our
// registry, never Google Fonts. The preview only bundles Geist + our custom
// Vazirmatn cut, so picking a font we don't ship yet previews with the
// closest loaded family.

export type FontOption = {
  value: string
  title: string
}

export const FONTS: FontOption[] = [
  { value: "geist", title: "Geist" },
  { value: "inter", title: "Inter" },
  { value: "ibm-plex-sans", title: "IBM Plex Sans" },
  { value: "manrope", title: "Manrope" },
  { value: "space-grotesk", title: "Space Grotesk" },
  { value: "dm-sans", title: "DM Sans" },
]

// Shadcn-style: heading lists show fonts only — "same as body" is the
// internal default, the picker shows the body font when nothing is set.
export const FONT_HEADING_OPTIONS: FontOption[] = [...FONTS]

export const FA_FONTS: FontOption[] = [
  { value: "vazirmatn", title: "وزیرمتن" },
]

export const FA_FONT_HEADING_OPTIONS: FontOption[] = [...FA_FONTS]

export function getFontTitle(list: FontOption[], value: string) {
  return list.find((f) => f.value === value)?.title ?? value
}
