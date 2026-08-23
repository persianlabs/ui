import { KbdPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Kbd — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Kbd",
    "Displays a keyboard key or shortcut.",
    <KbdPreview />
  )
}
