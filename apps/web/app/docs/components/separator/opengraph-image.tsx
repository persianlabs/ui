import { SeparatorPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Separator — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Separator",
    "Visually or semantically separates content, built on Base UI.",
    <SeparatorPreview />
  )
}
