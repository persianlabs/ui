import { preview } from "./shared"
export function DataTablePreview() {
  const rows = [
    { selected: true, cells: ["ken99@example.com", "$316"] },
    { selected: false, cells: ["abe45@example.com", "$242"] },
    { selected: false, cells: ["silas22@example.com", "$625"] },
  ]

  return (
    <div
      style={{
        width: "230px",
        borderRadius: "10px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        overflow: "hidden",
        fontSize: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "7px 10px",
          borderBottom: `1px solid ${preview.border}`,
          color: preview.mutedForeground,
          fontWeight: 600,
        }}
      >
        <div style={{ width: "14px" }} />
        <div style={{ flex: 1 }}>Email</div>
        <div style={{ textAlign: "right" }}>Amount</div>
      </div>
      {rows.map((row) => (
        <div
          key={row.cells[0]}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "7px 10px",
            borderBottom: `1px solid ${preview.border}`,
            backgroundColor: row.selected ? preview.muted : "transparent",
            color: preview.foreground,
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              border: `1px solid ${row.selected ? preview.primary : preview.border}`,
              backgroundColor: row.selected ? preview.primary : "transparent",
              color: preview.primaryForeground,
              fontSize: "8px",
              lineHeight: "11px",
              textAlign: "center",
            }}
          >
            ✓
          </div>
          <div style={{ flex: 1 }}>{row.cells[0]}</div>
          <div style={{ fontWeight: 600 }}>{row.cells[1]}</div>
        </div>
      ))}
    </div>
  )
}
