import { Suspense } from "react"

import { decodePreset, isPresetCode } from "persianlabsui/preset"

import { PREVIEW_ITEMS, type PreviewItemName } from "@/components/create/forward-types"
import { PreviewClient } from "@/components/create/previews/preview-client"
import type { DesignSystemSearchParams } from "@/lib/create/search-params"

export const metadata = {
  title: "Preview",
  robots: { index: false },
}

type PageProps = {
  params: Promise<{ item: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// The searchParams read is runtime data (cacheComponents) — the prerendered
// shell renders the Suspense fallback, the params-resolved content streams in.
export default function CreatePreviewPage({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={null}>
      <CreatePreviewContent params={params} searchParams={searchParams} />
    </Suspense>
  )
}

// Server-safe resolution (no nuqs loader — it's client-only): mirror
// search-params.ts — decode ?preset=CODE, then overlay explicitly-set params.
const DEFAULTS = {
  preset: "a0",
  baseColor: "neutral",
  theme: "neutral",
  radius: "default",
  font: "geist",
  fontHeading: "inherit",
  faFont: "vazirmatn",
  faFontHeading: "vazirmatn",
} as const

const DESIGN_KEYS = [
  "baseColor",
  "theme",
  "radius",
  "font",
  "fontHeading",
  "faFont",
  "faFontHeading",
] as const

async function CreatePreviewContent({ params, searchParams }: PageProps) {
  const { item: routeItem } = await params
  const resolved = await searchParams

  const url = new URLSearchParams()
  for (const [key, value] of Object.entries(resolved)) {
    if (typeof value === "string") url.set(key, value)
  }

  const raw = {
    preset: url.get("preset") ?? DEFAULTS.preset,
    item: url.get("item"),
  }

  let design: DesignSystemSearchParams = {
    ...DEFAULTS,
    item: "fa-dashboard",
  }
  if (isPresetCode(raw.preset)) {
    const decoded = decodePreset(raw.preset)
    if (decoded) {
      design = {
        ...design,
        baseColor: decoded.baseColor as DesignSystemSearchParams["baseColor"],
        theme: decoded.theme as DesignSystemSearchParams["theme"],
        radius: decoded.radius as DesignSystemSearchParams["radius"],
        font: decoded.font as DesignSystemSearchParams["font"],
        fontHeading: decoded.fontHeading as DesignSystemSearchParams["fontHeading"],
        faFont: decoded.faFont as DesignSystemSearchParams["faFont"],
        faFontHeading: decoded.faFontHeading as DesignSystemSearchParams["faFontHeading"],
      }
    }
  }
  for (const key of DESIGN_KEYS) {
    const value = url.get(key)
    if (value) {
      design = { ...design, [key]: value } as DesignSystemSearchParams
    }
  }

  // Route segment is authoritative for the item when it names a known one.
  const routeMatch = PREVIEW_ITEMS.find((preview) => preview.name === routeItem)
  const searchMatch = PREVIEW_ITEMS.find(
    (preview) => preview.name === raw.item
  )
  const item: PreviewItemName =
    routeMatch?.name ?? searchMatch?.name ?? "fa-dashboard"

  const initialParams: DesignSystemSearchParams = {
    ...design,
    item,
    preset: raw.preset,
  }

  return <PreviewClient initialParams={initialParams} item={item} />
}
