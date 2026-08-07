import { InputOTPPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Input OTP — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Input OTP",
    "An accessible one-time password input, built on input-otp.",
    <InputOTPPreview />
  )
}
