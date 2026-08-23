import { preview } from "./shared"
export function DropdownMenuPreview() {
  const rows = ["Profile", "Billing", "Settings"]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "160px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        padding: "6px",
        gap: "2px",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row}
          style={{
            display: "flex",
            borderRadius: "6px",
            padding: "6px 8px",
            fontSize: "12px",
            backgroundColor: i === 0 ? preview.muted : "transparent",
            color: preview.foreground,
          }}
        >
          {row}
        </div>
      ))}
    </div>
  )
}
