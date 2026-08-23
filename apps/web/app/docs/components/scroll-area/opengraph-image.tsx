import { ScrollAreaPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Scroll Area — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Scroll Area",
    "Cross-browser custom scrollbars, built on Base UI.",
    <ScrollAreaPreview />
  )
}
