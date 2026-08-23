import { PopoverPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Popover — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Popover",
    "Displays rich content in a portal, anchored to a trigger.",
    <PopoverPreview />
  )
}
