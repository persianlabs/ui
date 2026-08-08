import { ItemPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Item — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Item",
    "A flexible layout for a piece of content, media, or action, often used in lists.",
    <ItemPreview />
  )
}
