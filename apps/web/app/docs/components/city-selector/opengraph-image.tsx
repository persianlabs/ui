import { CitySelectorPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "City Selector — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "City Selector",
    "A province & city picker for Iran, bundled with all 31 provinces and 1,119 cities.",
    <CitySelectorPreview />
  )
}
