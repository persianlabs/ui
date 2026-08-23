import { FieldPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Field — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Field",
    "Groups a label, control, and description into an accessible form field, built on Base UI.",
    <FieldPreview />
  )
}
