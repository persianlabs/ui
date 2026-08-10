import { AspectRatioPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Aspect Ratio — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Aspect Ratio",
    "Displays content within a desired ratio.",
    <AspectRatioPreview />
  )
}
