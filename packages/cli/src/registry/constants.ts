// Central registry constants. The registry serves:
//   /init?...        → registry:base item JSON for a design system config
//   /r/<name>.json   → individual registry items (components, fonts)
//
// English Google-font files are NOT stored here anymore — the CLI downloads
// them fresh from Google Fonts at init time.
//
// PERSIANLABSUI_REGISTRY_URL overrides the registry host — used by the
// template matrix test (scripts/test-templates.mts) to run init against a
// local dev server instead of production.
export const REGISTRY_URL =
  process.env.PERSIANLABSUI_REGISTRY_URL ?? "https://ui.persian-labs.ir"

export const INIT_ENDPOINT = `${REGISTRY_URL}/init`
export const registryItemUrl = (name: string) =>
  `${REGISTRY_URL}/r/${name}.json`
export const createUrl = (preset?: string) =>
  preset ? `${REGISTRY_URL}/create?preset=${preset}` : `${REGISTRY_URL}/create`
