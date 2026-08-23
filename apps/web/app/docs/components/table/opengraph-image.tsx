import { TablePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Table — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Table",
    "A responsive table component, with an optional card-row variant.",
    <TablePreview />
  )
}
