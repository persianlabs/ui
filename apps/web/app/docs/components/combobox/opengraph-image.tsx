import { ComboboxPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Combobox — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Combobox",
    "A searchable, accessible combobox built on Base UI.",
    <ComboboxPreview />
  )
}
