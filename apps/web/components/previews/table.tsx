import { preview } from "./shared"
export function TablePreview() {
  const rows = [
    { name: "Invoice", value: "INV001" },
    { name: "Status", value: "Paid" },
  ]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        borderRadius: "10px",
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: `1px solid ${preview.border}`,
          backgroundColor: preview.muted,
          fontSize: "12px",
          color: preview.mutedForeground,
        }}
      >
        <div style={{ display: "flex" }}>Field</div>
        <div style={{ display: "flex" }}>Value</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderBottom:
              i < rows.length - 1 ? `1px solid ${preview.border}` : undefined,
            fontSize: "13px",
            color: preview.foreground,
          }}
        >
          <div style={{ display: "flex" }}>{row.name}</div>
          <div style={{ display: "flex", color: preview.mutedForeground }}>
            {row.value}
          </div>
        </div>
      ))}
    </div>
  )
}
