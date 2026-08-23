import { MarkerPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Marker — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Marker",
    "A small label for annotating content, such as a section divider or inline note.",
    <MarkerPreview />
  )
}
