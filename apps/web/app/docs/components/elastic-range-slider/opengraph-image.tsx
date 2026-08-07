import { ElasticRangeSliderPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Elastic Range Slider — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Elastic Range Slider",
    "A single-track, dual-thumb range slider in the same visual language as Elastic Slider.",
    <ElasticRangeSliderPreview />
  )
}
