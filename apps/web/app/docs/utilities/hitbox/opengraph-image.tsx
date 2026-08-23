import { HitboxPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Hitbox — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Hitbox",
    "Extends the clickable area of a child element for improved accessibility.",
    <HitboxPreview />
  )
}
