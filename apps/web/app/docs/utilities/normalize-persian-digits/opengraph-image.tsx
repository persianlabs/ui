import { NormalizePersianDigitsPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Normalize Persian Digits — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Normalize Persian Digits",
    "Converts Persian and Arabic-Indic numerals to plain 0-9 digits.",
    <NormalizePersianDigitsPreview />
  )
}
