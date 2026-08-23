import { preview } from "./shared"
export function PopoverPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "200px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        padding: "14px 16px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Dimensions
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: preview.mutedForeground,
        }}
      >
        Set the dimensions for the layer.
      </div>
    </div>
  )
}
