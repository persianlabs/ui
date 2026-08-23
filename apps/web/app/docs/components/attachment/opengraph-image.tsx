import { AttachmentPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Attachment — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Attachment",
    "Displays a file or image attachment with media, metadata, upload state, and actions.",
    <AttachmentPreview />,
    { previewScale: 1 }
  )
}
