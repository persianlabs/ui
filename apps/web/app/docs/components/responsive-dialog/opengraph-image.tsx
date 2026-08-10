import { ResponsiveDialogPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Responsive Dialog — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Responsive Dialog",
    "Renders a Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
    <ResponsiveDialogPreview />
  )
}
