import { encodePreset, type PresetConfig } from "persianlabsui/preset"

import type { DesignSystemSearchParams } from "@/lib/create/search-params"

type PresetCodeConfig = Pick<
  DesignSystemSearchParams,
  | "baseColor"
  | "theme"
  | "radius"
  | "font"
  | "fontHeading"
  | "faFont"
  | "faFontHeading"
  | "menuAccent"
  | "menuColor"
  | "fontSource"
  | "fontHeadingSource"
  | "faFontSource"
  | "faFontHeadingSource"
  | "fontMono"
  | "fontMonoSource"
> & { style?: "nova" }

export function getPresetCode(config: PresetCodeConfig) {
  const presetConfig: Partial<PresetConfig> = {
    style: "nova",
    baseColor: config.baseColor as PresetConfig["baseColor"],
    theme: config.theme as PresetConfig["theme"],
    radius: config.radius as PresetConfig["radius"],
    font: config.font as PresetConfig["font"],
    fontHeading: config.fontHeading as PresetConfig["fontHeading"],
    faFont: config.faFont as PresetConfig["faFont"],
    faFontHeading: config.faFontHeading as PresetConfig["faFontHeading"],
    menuAccent: config.menuAccent as PresetConfig["menuAccent"],
    menuColor: config.menuColor as PresetConfig["menuColor"],
    fontSource: config.fontSource as PresetConfig["fontSource"],
    fontHeadingSource:
      config.fontHeadingSource as PresetConfig["fontHeadingSource"],
    faFontSource: config.faFontSource as PresetConfig["faFontSource"],
    faFontHeadingSource:
      config.faFontHeadingSource as PresetConfig["faFontHeadingSource"],
    fontMono: config.fontMono as PresetConfig["fontMono"],
    fontMonoSource: config.fontMonoSource as PresetConfig["fontMonoSource"],
  }

  return encodePreset(presetConfig)
}
