import { SpinnerPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Spinner — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Spinner",
    "A spinning loading indicator icon.",
    <SpinnerPreview />
  )
}
