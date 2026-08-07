import { SheetPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Sheet — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Sheet",
    "A panel that slides in from an edge of the screen to complement the main content, built on Base UI.",
    <SheetPreview />
  )
}
