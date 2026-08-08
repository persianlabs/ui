import { DirectionPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Direction — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Direction",
    "A provider for setting the reading direction (LTR or RTL) of your app, built on Base UI.",
    <DirectionPreview />
  )
}
