import { DropdownMenuPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Dropdown Menu — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Dropdown Menu",
    "Displays a menu of actions or options, triggered by a button.",
    <DropdownMenuPreview />
  )
}
