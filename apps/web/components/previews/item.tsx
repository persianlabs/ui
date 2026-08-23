import { preview } from "./shared"
export function ItemPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "220px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          backgroundColor: preview.muted,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            color: preview.foreground,
          }}
        >
          Item title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            color: preview.mutedForeground,
          }}
        >
          Item description
        </div>
      </div>
    </div>
  )
}
