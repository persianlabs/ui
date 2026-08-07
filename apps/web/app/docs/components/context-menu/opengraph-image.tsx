import { ContextMenuPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Context Menu — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Context Menu",
    "A menu of actions triggered by a right click, built on Base UI.",
    <ContextMenuPreview />
  )
}
