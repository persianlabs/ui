import { PersianHolidaysPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Persian Holidays — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Persian Holidays",
    "Iranian holiday lookup for a date, range, or year across Jalali, Gregorian, and Hijri calendars.",
    <PersianHolidaysPreview />
  )
}
