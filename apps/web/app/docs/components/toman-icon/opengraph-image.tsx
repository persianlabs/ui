import { TomanIconPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Toman Icon — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Toman Icon",
    "The Toman currency symbol, as a standalone icon component.",
    <TomanIconPreview />
  )
}
