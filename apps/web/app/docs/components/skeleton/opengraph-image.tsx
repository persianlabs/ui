import { SkeletonPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Skeleton — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Skeleton",
    "Used to show a placeholder while content is loading.",
    <SkeletonPreview />
  )
}
