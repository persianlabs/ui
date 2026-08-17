import { MobileNumberInputPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Mobile Number Input — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Mobile Number Input",
    "An Iranian mobile number field with paste normalization and a validity indicator.",
    <MobileNumberInputPreview />,
    { previewScale: 1 }
  )
}
