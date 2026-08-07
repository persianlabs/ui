import { MenubarPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Menubar — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Menubar",
    "A persistent horizontal menu bar for application-style commands, built on Base UI.",
    <MenubarPreview />
  )
}
