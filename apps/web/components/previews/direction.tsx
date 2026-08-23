import { preview } from "./shared"
export function DirectionPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        color: preview.foreground,
      }}
    >
      <div style={{ display: "flex" }}>LTR</div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>
        {"<->"}
      </div>
      <div style={{ display: "flex" }}>RTL</div>
    </div>
  )
}
