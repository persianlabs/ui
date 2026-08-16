import { QrCodePreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "QR Code — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "QR Code",
    "A flexible QR code builder with shape variants, gradient fills, and a center logo overlay.",
    <QrCodePreview />,
    { previewScale: 1 }
  )
}
