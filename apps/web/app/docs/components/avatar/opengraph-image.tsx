import { AvatarPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Avatar — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Avatar",
    "An image element with a fallback, for representing a user or entity, built on Base UI.",
    <AvatarPreview />
  )
}
