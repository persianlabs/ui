import { TimePickerPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Time Picker — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Time Picker",
    "An hour/minute/second wheel-based time picker, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
    <TimePickerPreview />
  )
}
