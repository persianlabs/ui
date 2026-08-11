import { DateWheelPickerPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Date Wheel Picker — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Date Wheel Picker",
    "An iOS-style year/month/day wheel-based date picker, switchable between the Shamsi and Gregorian calendars, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
    <DateWheelPickerPreview />
  )
}
