import { Suspense } from "react"

import { decodePreset, isPresetCode } from "persianlabsui/preset"

import { PreviewClient } from "@/components/create/previews/preview-client"
import type { DesignSystemSearchParams } from "@/lib/create/search-params"

export const metadata = {
  title: "Preview",
  robots: { index: false },
}

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function CreatePreviewPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={null}>
      <CreatePreviewContent searchParams={searchParams} />
    </Suspense>
  )
}

const DEFAULTS = {
  preset: "a0",
  baseColor: "neutral",
  theme: "neutral",
  radius: "default",
  font: "geist",
  fontHeading: "inherit",
  faFont: "vazirmatn",
  faFontHeading: "vazirmatn",
  menuAccent: "subtle",
  menuColor: "default",
} as const

const DESIGN_KEYS = [
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

async function CreatePreviewContent({ searchParams }: PageProps) {
  const resolved = await searchParams
  const url = new URLSearchParams()
  for (const [key, value] of Object.entries(resolved)) {
    if (typeof value === "string") url.set(key, value)
  }

  const preset = url.get("preset") ?? DEFAULTS.preset
  let design: DesignSystemSearchParams = { ...DEFAULTS, item: "fa-dashboard" }
  if (isPresetCode(preset)) {
    const decoded = decodePreset(preset)
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
        menuAccent: decoded.menuAccent as DesignSystemSearchParams["menuAccent"],
        menuColor: decoded.menuColor as DesignSystemSearchParams["menuColor"],
      }
    }
  }
  for (const key of DESIGN_KEYS) {
    const value = url.get(key)
    if (value) {
      design = { ...design, [key]: value } as DesignSystemSearchParams
    }
  }

  const initialParams: DesignSystemSearchParams = {
    ...design,
    preset,
  }

  return <PreviewClient initialParams={initialParams} />
}
