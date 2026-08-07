import { TextareaPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Textarea — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Textarea",
    "Displays a form textarea or a component that looks like a textarea.",
    <TextareaPreview />
  )
}
