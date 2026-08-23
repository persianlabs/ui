export function DataTablePreview() {
  const rows = [
    { selected: true, cells: ["ken99@example.com", "$316"] },
    { selected: false, cells: ["abe45@example.com", "$242"] },
    { selected: false, cells: ["silas22@example.com", "$625"] },
  ]

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "360px",
        borderRadius: "16px",
        border: "1px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.07)",
        overflow: "hidden",
        fontSize: "17px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(242,240,238,0.18)",
          color: "rgba(242,240,238,0.55)",
          fontWeight: 600,
        }}
      >
        <div style={{ width: "22px" }} />
        <div style={{ flex: 1 }}>Email</div>
        <div style={{ textAlign: "right" }}>Amount</div>
      </div>
      {rows.map((row) => (
        <div
          key={row.cells[0]}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(242,240,238,0.18)",
            backgroundColor: row.selected
              ? "rgba(242,240,238,0.14)"
              : "transparent",
            color: "#f2f0ee",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "19px",
              height: "19px",
              borderRadius: "5px",
              border: `1px solid ${row.selected ? "#f2f0ee" : "rgba(242,240,238,0.18)"}`,
              backgroundColor: row.selected ? "#f2f0ee" : "transparent",
              color: "#18181b",
              fontSize: "12px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={12}
              height={12}
              fill="none"
              stroke={row.selected ? "#18181b" : "#f2f0ee"}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>{row.cells[0]}</div>
          <div style={{ fontWeight: 600 }}>{row.cells[1]}</div>
        </div>
      ))}
    </div>
  )
}
