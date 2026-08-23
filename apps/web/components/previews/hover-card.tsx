import { preview } from "./shared"
export function HoverCardPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "200px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        padding: "12px 14px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
        @shadcn
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
        }}
      >
        The React Framework for design engineers
      </div>
    </div>
  )
}
