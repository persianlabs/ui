import { PriceInputPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Price Input — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Price Input",
    "A text input that formats grouped prices as you type.",
    <PriceInputPreview />
  )
}
