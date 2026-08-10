import { EmptyPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Empty — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Empty",
    "Displays an empty state with a title, description, and optional actions.",
    <EmptyPreview />
  )
}
