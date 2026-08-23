import { QRCodePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "QR Code — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "QR Code",
    "QR code generator with rounded finder patterns and dot-style data modules.",
    <QRCodePreview />,
    { previewScale: 1 }
  )
}
