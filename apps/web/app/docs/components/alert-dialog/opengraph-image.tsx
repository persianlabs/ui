import { AlertDialogPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Alert Dialog — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Alert Dialog",
    "A modal dialog that interrupts the user with important content and expects a response, built on Base UI.",
    <AlertDialogPreview />
  )
}
