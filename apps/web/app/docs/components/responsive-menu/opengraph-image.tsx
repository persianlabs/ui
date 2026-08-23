import { ResponsiveMenuPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Responsive Menu — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Responsive Menu",
    "Renders a Dropdown Menu on desktop and a bottom Drawer menu on mobile from one shared set of components.",
    <ResponsiveMenuPreview />
  )
}
