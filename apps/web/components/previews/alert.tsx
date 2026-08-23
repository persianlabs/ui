import { preview } from "./shared"
export function AlertPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "220px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        padding: "12px 14px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
        Heads up
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
        }}
      >
        You can add components to your app
      </div>
    </div>
  )
}
