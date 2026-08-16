import { PasswordInputPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Password Input — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Password Input",
    "A show/hide password field that always renders LTR.",
    <PasswordInputPreview />,
    { previewScale: 1 }
  )
}
