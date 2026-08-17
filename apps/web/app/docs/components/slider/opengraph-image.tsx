import { SliderPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Slider — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Slider",
    "An input where the user selects a value from within a given range, built on Base UI.",
    <SliderPreview />
  )
}
