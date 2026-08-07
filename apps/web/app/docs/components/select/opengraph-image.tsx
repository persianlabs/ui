import { SelectPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Select — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Select",
    "A listbox for choosing a single value, built on Base UI.",
    <SelectPreview />
  )
}
