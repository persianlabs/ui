import { CheckCircleGlyph, preview } from "./shared"
export function ToastPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        width: "230px",
        padding: "12px 14px",
        borderRadius: "16px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CheckCircleGlyph size={18} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            fontWeight: 600,
            color: preview.foreground,
          }}
        >
          Event created
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            color: preview.mutedForeground,
          }}
        >
          Sunday, December 3 at 9:00 AM
        </div>
      </div>
    </div>
  )
}
