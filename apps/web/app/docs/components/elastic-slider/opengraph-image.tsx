import { ElasticSliderPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Elastic Slider — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Elastic Slider",
    "Slider with elastic rubber-band drag and magnetic snap feedback.",
    <ElasticSliderPreview />
  )
}
