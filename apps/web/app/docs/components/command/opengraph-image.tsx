import { CommandPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Command — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Command",
    "A command palette component built with Dialog and Autocomplete.",
    <CommandPreview />
  )
}
