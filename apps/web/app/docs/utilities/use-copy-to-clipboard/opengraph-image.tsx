import { UseCopyToClipboardPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "useCopyToClipboard — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "useCopyToClipboard",
    "A React hook that copies text and resets copied state after a timeout.",
    <UseCopyToClipboardPreview />
  )
}
