import { ProgressPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Progress — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Progress",
    "Displays an indicator showing the completion progress of a task, built on Base UI.",
    <ProgressPreview />
  )
}
