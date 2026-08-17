import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Postal Code — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Postal Code",
    "Validates the structural format of Iranian postal codes.",
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        maxWidth: "340px",
        padding: "18px 20px",
        border: "1px solid rgba(242,240,238,0.16)",
        borderRadius: "14px",
        color: "#f2f0ee",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "24px",
          letterSpacing: "0.04em",
        }}
      >
        1985813151
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "17px",
          fontWeight: 600,
          color: "#10b981",
        }}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "flex", flexShrink: 0 }}
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        Verified Postal Code
      </div>
    </div>,
    { previewScale: 1.4 }
  )
}
