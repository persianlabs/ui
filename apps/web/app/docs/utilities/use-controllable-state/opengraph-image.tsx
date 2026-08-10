import { UseControllableStatePreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "useControllableState — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "useControllableState",
    "A hook for controlled and uncontrolled state with one consistent API.",
    <UseControllableStatePreview />
  )
}
