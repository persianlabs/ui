import { ToastPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Toast — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Toast",
    "A temporary notification that stacks in a corner of the screen or anchors to an element, built on Base UI.",
    <ToastPreview />
  )
}
