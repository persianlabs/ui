import { StatusButtonPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Status Button — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Status Button",
    "A button that swaps between idle, loading, and success feedback for async actions.",
    <StatusButtonPreview />
  )
}
