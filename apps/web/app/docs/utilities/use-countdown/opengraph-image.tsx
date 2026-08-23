import { UseCountdownPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "useCountdown — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "useCountdown",
    "A timer-aligned countdown hook with formatted output and overdue state.",
    <UseCountdownPreview />
  )
}
