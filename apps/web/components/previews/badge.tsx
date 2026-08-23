import { preview } from "./shared"
export function BadgePreview() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <div
        style={{
          display: "flex",
          borderRadius: "9999px",
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
          fontSize: "12px",
          fontWeight: 600,
          padding: "3px 10px",
        }}
      >
        Default
      </div>
      <div
        style={{
          display: "flex",
          borderRadius: "9999px",
          border: `1px solid ${preview.border}`,
          color: preview.foreground,
          fontSize: "12px",
          fontWeight: 600,
          padding: "3px 10px",
        }}
      >
        Outline
      </div>
    </div>
  )
}
