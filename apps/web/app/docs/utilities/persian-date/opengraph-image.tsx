import { PersianDatePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Persian Date — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Persian Date",
    "Jalali/Gregorian date utilities: formatting, parsing, conversion, arithmetic, and ranges.",
    <PersianDatePreview />
  )
}
