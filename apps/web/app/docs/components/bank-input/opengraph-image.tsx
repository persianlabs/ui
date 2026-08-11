import { BankInputPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Bank Input — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Bank Input",
    "Iranian card and Shaba fields with bank detection.",
    <BankInputPreview />,
    { previewScale: 1 }
  )
}
