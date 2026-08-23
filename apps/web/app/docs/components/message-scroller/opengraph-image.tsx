import { MessageScrollerPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Message Scroller — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Message Scroller",
    "An auto-scrolling viewport for chat messages, with scroll-to-start/end buttons, built on @shadcn/react.",
    <MessageScrollerPreview />,
    { titleFontSize: 54 }
  )
}
