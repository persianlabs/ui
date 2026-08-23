import { preview } from "./shared"
export function MobileNumberInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "220px",
        alignItems: "center",
        gap: "8px",
        padding: "10px 14px",
        border: `1px solid ${preview.border}`,
        borderRadius: "9px",
        color: preview.foreground,
        fontFamily: "monospace",
        fontSize: "13px",
        letterSpacing: "0.04em",
      }}
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
        0912 123 4567
      </div>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={preview.success}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "flex", flexShrink: 0 }}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  )
}
