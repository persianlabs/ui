import { NativeSelectPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Native Select — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Native Select",
    "A styled native <select> element for choosing a single value.",
    <NativeSelectPreview />
  )
}
