import { UseDatePreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "useDate — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "useDate",
    "A reactive Jalali/Gregorian date and time hook with holiday flagging.",
    <UseDatePreview />
  )
}
