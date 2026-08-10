import { ImageResponse } from "next/og"

export const alt =
  "PersianLabs UI — Copy-paste components for Persian interfaces"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#191817",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0px",
        }}
      >
        <svg viewBox="0 0 1024 1024" width="56" height="56" fill="none">
          <path
            d="M210 842V330C210 286 226 251 258 219L382 95V842H210Z"
            fill="#f2f0ee"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M382 95H608C754 95 848 187 848 326C848 465 754 557 608 557H382V405H594C661 405 696 375 696 326C696 277 661 247 594 247H382V95Z"
            fill="#f2f0ee"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: "40px",
            fontWeight: 600,
            color: "#f2f0ee",
          }}
        >
          ersianLabs UI
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "48px",
          fontSize: "58px",
          fontWeight: 600,
          lineHeight: 1.15,
          color: "#f2f0ee",
          maxWidth: "920px",
        }}
      >
        Persian-first components. Copy, paste, own.
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "28px",
          fontSize: "28px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        RTL-first · Open source · shadcn registry
      </div>
    </div>,
    { ...size }
  )
}
