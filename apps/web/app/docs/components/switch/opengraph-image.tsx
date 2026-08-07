import { SwitchPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Switch — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Switch",
    "A control that toggles between checked and unchecked, built on Base UI.",
    <SwitchPreview />
  )
}
