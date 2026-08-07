import { RadioGroupPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Radio Group — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Radio Group",
    "A set of mutually exclusive radio buttons, built on Base UI.",
    <RadioGroupPreview />
  )
}
