import { ToggleGroupPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Toggle Group — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Toggle Group",
    "A set of two-state buttons that can be toggled on or off, built on Base UI.",
    <ToggleGroupPreview />
  )
}
