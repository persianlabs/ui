import { ButtonGroupPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Button Group — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Button Group",
    "A container that groups related buttons together with consistent styling.",
    <ButtonGroupPreview />
  )
}
