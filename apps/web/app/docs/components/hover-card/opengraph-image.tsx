import { HoverCardPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Hover Card — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Hover Card",
    "For sighted users to preview content available behind a link, built on Base UI.",
    <HoverCardPreview />
  )
}
