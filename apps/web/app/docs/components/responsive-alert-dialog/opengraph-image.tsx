import { ResponsiveAlertDialogPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Responsive Alert Dialog — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Responsive Alert Dialog",
    "Renders an Alert Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
    <ResponsiveAlertDialogPreview />
  )
}
