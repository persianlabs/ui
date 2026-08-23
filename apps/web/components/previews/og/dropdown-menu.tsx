export function DropdownMenuPreview() {
  const rows = ["Profile", "Billing", "Settings"]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "160px",
        borderRadius: "10px",
        backgroundColor: "#1a1a1a",
        border: "1px solid rgba(242,240,238,0.14)",
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
            backgroundColor: i === 0 ? "rgba(242,240,238,0.12)" : "transparent",
            color: "#f2f0ee",
          }}
        >
          {row}
        </div>
      ))}
    </div>
  )
}
