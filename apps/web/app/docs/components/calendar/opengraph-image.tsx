import { CalendarPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Calendar — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Calendar",
    "A date-grid calendar built on react-day-picker, switchable between the Jalali (Shamsi) and Gregorian (Miladi) calendars via a calendarType prop.",
    <CalendarPreview />
  )
}
