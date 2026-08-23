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
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid rgba(242,240,238,0.16)",
          backgroundColor: "rgba(242,240,238,0.06)",
          fontSize: "12px",
          color: "rgba(242,240,238,0.5)",
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
            ...(i < rows.length - 1
              ? { borderBottom: "1px solid rgba(242,240,238,0.1)" }
              : {}),
            fontSize: "13px",
            color: "#f2f0ee",
          }}
        >
          <div style={{ display: "flex" }}>{row.name}</div>
          <div style={{ display: "flex", color: "rgba(242,240,238,0.6)" }}>
            {row.value}
          </div>
        </div>
      ))}
    </div>
  )
}
