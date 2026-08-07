import { CheckboxPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Checkbox — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Checkbox",
    "A control for selecting one or more options, built on Base UI.",
    <CheckboxPreview />
  )
}
