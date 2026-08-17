import { reshapePersian } from "@workspace/ui/lib/persian-reshape"

import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Persian Reshape — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

const SAMPLE = "راهنمای خرید"

export default function OpengraphImage() {
  return buildOgImage(
    "Persian Reshape",
    "Pre-shapes Persian text so it renders correctly in Satori/next-og images.",
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div
        dir="rtl"
        style={{
          display: "flex",
          fontSize: "24px",
          color: "rgba(242,240,238,0.35)",
        }}
      >
        {SAMPLE}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "24px",
          color: "rgba(242,240,238,0.4)",
        }}
      >
        →
      </div>
      <div
        dir="rtl"
        style={{
          display: "flex",
          fontSize: "24px",
          fontWeight: 700,
          color: "#f2f0ee",
        }}
      >
        {reshapePersian(SAMPLE)}
      </div>
    </div>,
    { previewScale: 1.4 }
  )
}
