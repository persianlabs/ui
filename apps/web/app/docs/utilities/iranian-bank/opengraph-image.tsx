import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Iranian Bank — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Iranian Bank",
    "Card and Shaba validation with Iranian bank detection.",
    <div
      style={{
        display: "flex",
        border: "1px solid rgba(242,240,238,.16)",
        borderRadius: 10,
        padding: "14px 18px",
        color: "#f2f0ee",
        fontFamily: "monospace",
      }}
    >
      6219-8619-1894-9297
    </div>
  )
}
