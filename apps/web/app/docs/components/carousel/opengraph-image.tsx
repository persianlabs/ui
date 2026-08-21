import { CarouselPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Carousel — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Carousel",
    "A carousel with motion and swipe built using Embla.",
    <CarouselPreview />,
    { previewScale: 1 }
  )
}
