"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import {
  useQueryStates,
  createLoader,
  createSerializer,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
  type Options,
} from "nuqs"

import { decodePreset, isPresetCode } from "persianlabsui/preset"

import {
  BASE_COLORS,
  RADII,
  THEMES,
  type BaseColorName,
  type RadiusName,
  type ThemeName,
} from "@/lib/create/config"
import { FA_FONTS, FONTS } from "@/lib/create/fonts"
import { getPresetCode } from "@/lib/create/preset-code"

// Adapted from the shadcn create app's search-params. The URL carries a
// single ?preset=CODE for the design system + plain params for everything
// else. Design system: baseColor, theme, radius, font, fontHeading,
// faFont, faFontHeading. Style is fixed to "taymaz" — not a param.
// RTL is always on — not a param. Base is always Base UI — not a param.

const designSystemSearchParams = {
  preset: parseAsString.withDefault("a0"),
  item: parseAsString
    .withDefault("fa-dashboard")
    .withOptions({ shallow: true }),
  baseColor: parseAsStringLiteral<BaseColorName>(
    BASE_COLORS.map((b) => b.value)
  ).withDefault("neutral"),
  theme: parseAsStringLiteral<ThemeName>(
    THEMES.map((t) => t.value)
  ).withDefault("neutral"),
  radius: parseAsStringLiteral<RadiusName>(
    RADII.map((r) => r.value)
  ).withDefault("default"),
  font: parseAsStringLiteral(FONTS.map((f) => f.value)).withDefault("geist"),
  fontHeading: parseAsStringLiteral([
    "inherit",
    ...FONTS.map((f) => f.value),
  ]).withDefault("inherit"),
  faFont: parseAsStringLiteral(FA_FONTS.map((f) => f.value)).withDefault(
    "vazirmatn"
  ),
  faFontHeading: parseAsStringLiteral([
    "inherit",
    ...FA_FONTS.map((f) => f.value),
  ]).withDefault("vazirmatn"),
  menuAccent: parseAsStringLiteral(["subtle", "bold"]).withDefault("subtle"),
  menuColor: parseAsStringLiteral([
    "default",
    "inverted",
    "default-translucent",
    "inverted-translucent",
  ]).withDefault("default"),
}

// Design system param keys that get encoded into the preset code.
export const DESIGN_SYSTEM_KEYS = [
  "baseColor",
  "theme",
  "radius",
  "font",
  "fontHeading",
  "faFont",
  "faFontHeading",
  "menuAccent",
  "menuColor",
] as const

export function isTranslucentMenuColor(
  menuColor?: string | null
): menuColor is "default-translucent" | "inverted-translucent" {
  return (
    menuColor === "default-translucent" || menuColor === "inverted-translucent"
  )
}

// Non-design-system keys that get passed through as-is.
const NON_DESIGN_SYSTEM_KEYS = ["item", "preset"] as const

type SearchParamsLike = Pick<URLSearchParams, "get" | "has">

function normalizeDesignSystemParams(
  params: DesignSystemSearchParams
): DesignSystemSearchParams {
  // Persist "same as body" as an explicit inherit sentinel so the body font
  // can change later without freezing headings to a concrete previous value.
  const fontHeading =
    params.fontHeading === params.font ? "inherit" : params.fontHeading
  return {
    ...params,
    fontHeading,
    faFontHeading:
      params.faFontHeading === params.faFont ? "inherit" : params.faFontHeading,
  }
}

// If preset param exists, decode it and overlay individual params.
// Params explicitly present in the URL override the decoded preset.
function resolvePresetParams(
  rawParams: DesignSystemSearchParams,
  searchParams: SearchParamsLike
) {
  if (rawParams.preset && isPresetCode(rawParams.preset)) {
    const decoded = decodePreset(rawParams.preset)
    if (decoded) {
      const overrides = Object.fromEntries(
        DESIGN_SYSTEM_KEYS.map((key) => {
          if (searchParams.has(key)) {
            const value = searchParams.get(key)
            if (value) return [key, value]
          }
          return [key, undefined]
        }).filter(([, value]) => value !== undefined)
      ) as Partial<DesignSystemSearchParams>

      const presetValues: Partial<DesignSystemSearchParams> = {
        baseColor: decoded.baseColor as BaseColorName,
        theme: decoded.theme as ThemeName,
        radius: decoded.radius as RadiusName,
        font: decoded.font,
        fontHeading: decoded.fontHeading,
        faFont: decoded.faFont,
        faFontHeading: decoded.faFontHeading,
        menuAccent: decoded.menuAccent,
        menuColor: decoded.menuColor,
      }

      return normalizeDesignSystemParams({
        ...presetValues,
        ...overrides,
        item: rawParams.item,
        preset: rawParams.preset,
      } as DesignSystemSearchParams)
    }
  }
  return normalizeDesignSystemParams(rawParams)
}

export function buildPresetUrlUpdate(
  merged: DesignSystemSearchParams,
  resolvedUpdates: Partial<DesignSystemSearchParams> = {}
) {
  const code = getPresetCode(merged)
  const rawUpdate: Record<string, unknown> = { preset: code }

  for (const key of DESIGN_SYSTEM_KEYS) {
    rawUpdate[key] = null
  }

  for (const key of NON_DESIGN_SYSTEM_KEYS) {
    if (key === "preset") {
      continue
    }
    rawUpdate[key] =
      key in resolvedUpdates
        ? (resolvedUpdates as Record<string, unknown>)[key]
        : merged[key]
  }

  return rawUpdate
}

export const loadDesignSystemSearchParams = createLoader(
  designSystemSearchParams
)

export const serializeDesignSystemSearchParams = createSerializer(
  designSystemSearchParams
)

export type DesignSystemSearchParams = inferParserType<
  typeof designSystemSearchParams
>

// Wraps nuqs useQueryStates with transparent preset encoding/decoding.
// - Reads: if ?preset=CODE is in the URL, decodes it and returns individual values.
// - Writes: when design system params are set, encodes them into a preset code.
//
// Default options use shallow: true so picker selections do not trigger a full
// Next.js server navigation. This prevents the customizer panel from
// flickering or resetting while the URL update propagates.
export function useDesignSystemSearchParams(options: Options = {}) {
  const searchParams = useSearchParams()
  const [rawParams, rawSetParams] = useQueryStates(designSystemSearchParams, {
    shallow: true,
    history: "push",
    ...options,
  })

  const params = React.useMemo(
    () => resolvePresetParams(rawParams, searchParams),
    [rawParams, searchParams]
  )

  // Use ref so setParams callback stays stable across renders.
  const paramsRef = React.useRef(params)
  React.useEffect(() => {
    paramsRef.current = params
  }, [params])

  // Sync the initial state into a preset code on first visit (no ?preset=).
  const hasSyncedPresetToUrlRef = React.useRef(false)
  React.useEffect(() => {
    if (hasSyncedPresetToUrlRef.current || searchParams.has("preset")) {
      return
    }
    hasSyncedPresetToUrlRef.current = true

    const merged = normalizeDesignSystemParams(paramsRef.current)
    void rawSetParams(buildPresetUrlUpdate(merged) as RawSetParamsInput, {
      history: "replace",
    })
  }, [rawSetParams, searchParams])

  type RawSetParamsInput = Parameters<typeof rawSetParams>[0]

  const setParams = React.useCallback(
    (
      updates:
        | Partial<DesignSystemSearchParams>
        | ((
            old: DesignSystemSearchParams
          ) => Partial<DesignSystemSearchParams>),
      setOptions?: Options
    ) => {
      const resolvedUpdates =
        typeof updates === "function" ? updates(paramsRef.current) : updates

      const hasDesignSystemUpdate = DESIGN_SYSTEM_KEYS.some(
        (key) => key in resolvedUpdates
      )

      if (!hasDesignSystemUpdate) {
        // No design system change, pass through directly.
        return rawSetParams(resolvedUpdates as RawSetParamsInput, setOptions)
      }

      // Merge current decoded values with updates.
      const merged = normalizeDesignSystemParams({
        ...paramsRef.current,
        ...resolvedUpdates,
      })
      return rawSetParams(
        buildPresetUrlUpdate(merged, resolvedUpdates) as RawSetParamsInput,
        setOptions
      )
    },
    [rawSetParams]
  )

  return [params, setParams] as const
}
