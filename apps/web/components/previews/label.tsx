import { preview } from "./shared"
export function LabelPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "16px",
          height: "16px",
          borderRadius: "4px",
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
          fontSize: "11px",
        }}
      >
        ✓
      </div>
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
        Accept terms and conditions
      </div>
    </div>
  )
}
