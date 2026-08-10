import { PersianDatePreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Persian Date (Zod) — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Persian Date (Zod)",
    "zod schemas for coercing and validating dates and reservation-style ranges.",
    <PersianDatePreview />
  )
}
