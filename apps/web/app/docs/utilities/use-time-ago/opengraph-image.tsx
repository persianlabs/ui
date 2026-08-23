import { UseTimeAgoPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "useTimeAgo — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "useTimeAgo",
    "A reactive relative-time formatter with Persian and English message tables.",
    <UseTimeAgoPreview />
  )
}
