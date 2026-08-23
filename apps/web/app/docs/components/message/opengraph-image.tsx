import { MessagePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Message — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Message",
    "Composable layout for a chat message with an avatar, header, content, and footer.",
    <MessagePreview />
  )
}
