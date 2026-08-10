import { CopyButtonPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Copy Button — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Copy Button",
    "An icon button that copies text to the clipboard, morphs its icon to reflect the result, and anchors a confirmation toast to itself.",
    <CopyButtonPreview />
  )
}
