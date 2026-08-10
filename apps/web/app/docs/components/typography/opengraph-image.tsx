import { TypographyPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Typography — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Typography",
    "Text styles for your interface.",
    <TypographyPreview />
  )
}
