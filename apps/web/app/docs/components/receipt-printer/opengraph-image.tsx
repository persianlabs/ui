import { ReceiptPrinterPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Receipt Printer — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Receipt Printer",
    "A tactile checkout experience that turns payment processing into a printed receipt.",
    <ReceiptPrinterPreview />
  )
}
