import { NavigationMenuPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Navigation Menu — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Navigation Menu",
    "A collection of links for navigating websites.",
    <NavigationMenuPreview />,
    { previewScale: 1 }
  )
}
