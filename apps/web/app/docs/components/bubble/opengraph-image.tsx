import { BubblePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Bubble — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Bubble",
    "A chat message bubble with variants, reactions, and start/end alignment.",
    <BubblePreview />
  )
}
