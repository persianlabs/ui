import { InputGroupPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Input Group — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Input Group",
    "Groups an input with addons, buttons, or text for complex input layouts.",
    <InputGroupPreview />
  )
}
