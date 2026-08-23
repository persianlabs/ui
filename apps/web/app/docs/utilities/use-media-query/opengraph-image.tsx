import { UseMediaQueryPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "useMediaQuery — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "useMediaQuery",
    "Reactive media query hook with Tailwind-like syntax.",
    <UseMediaQueryPreview />
  )
}
