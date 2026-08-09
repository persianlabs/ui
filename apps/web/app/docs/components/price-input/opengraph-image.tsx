import { PriceInputPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Price Input — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Price Input",
    "A text input that formats digits as a grouped price as you type, with support for Persian/Arabic-Indic numerals.",
    <PriceInputPreview />
  )
}
