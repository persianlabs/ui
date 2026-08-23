import { CollapsiblePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Collapsible — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Collapsible",
    "An interactive component which expands/collapses a panel, built on Base UI.",
    <CollapsiblePreview />
  )
}
