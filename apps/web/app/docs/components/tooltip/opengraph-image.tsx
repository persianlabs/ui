import { TooltipPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Tooltip — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Tooltip",
    "Displays contextual information when hovering or focusing an element, built on Base UI.",
    <TooltipPreview />
  )
}
