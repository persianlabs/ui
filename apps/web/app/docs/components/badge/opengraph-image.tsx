import { BadgePreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Badge — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Badge",
    "Displays a small badge to highlight status or metadata.",
    <BadgePreview />
  )
}
