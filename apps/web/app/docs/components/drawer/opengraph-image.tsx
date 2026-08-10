import { DrawerPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Drawer — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Drawer",
    "A swipeable panel that slides in from an edge of the screen, built on Base UI.",
    <DrawerPreview />
  )
}
