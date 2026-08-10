import { DialogPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Dialog — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Dialog",
    "A modal window layered over the page for focused tasks or confirmations, built on Base UI.",
    <DialogPreview />
  )
}
