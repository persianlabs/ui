import { ResizablePreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Resizable — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Resizable",
    "Accessible resizable panel groups and layouts, built on react-resizable-panels.",
    <ResizablePreview />
  )
}
