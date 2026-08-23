export function ItemPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "220px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
          Item title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            color: "rgba(242,240,238,0.5)",
          }}
        >
          Item description
        </div>
      </div>
    </div>
  )
}
