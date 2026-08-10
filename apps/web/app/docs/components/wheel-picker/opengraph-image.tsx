import { WheelPickerPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Wheel Picker — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Wheel Picker",
    "An iOS-like wheel picker with smooth inertia, infinite scrolling, and keyboard navigation.",
    <WheelPickerPreview />
  )
}
