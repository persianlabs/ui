import { DatePickerPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Date Picker — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Date Picker",
    "A date picker composed from Popover and Calendar — there's no standalone DatePicker component, same as upstream shadcn/ui.",
    <DatePickerPreview />
  )
}
