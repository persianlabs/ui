import { DataTablePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Data Table — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Data Table",
    "Powerful tables and datagrids built with TanStack Table.",
    <DataTablePreview />,
    { previewScale: 1 }
  )
}
