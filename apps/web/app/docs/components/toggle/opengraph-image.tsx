import { TogglePreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Toggle — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Toggle",
    "A two-state button that can be either on or off, built on Base UI.",
    <TogglePreview />
  )
}
