import { PlateInputPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Plate Input — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Plate Input",
    "An Iranian vehicle license plate input with digit segments, a letter picker including wheelchair plates, and the Iran serial tab.",
    <PlateInputPreview />
  )
}
