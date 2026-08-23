import { PersianSlugPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Persian Slug — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Persian Slug",
    "Converts Persian/mixed text into a URL-safe slug.",
    <PersianSlugPreview />
  )
}
