import { AccordionPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Accordion — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Accordion",
    "A vertically stacked set of interactive headings that each reveal a section of content, built on Base UI.",
    <AccordionPreview />
  )
}
