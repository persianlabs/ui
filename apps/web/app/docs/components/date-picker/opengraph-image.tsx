import { DatePickerPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Date Picker — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Date Picker",
    "Responsive Shamsi/Gregorian date and date-time fields with safe defaults.",
    <DatePickerPreview />
  )
}
