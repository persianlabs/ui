export function BadgePreview() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <div
        style={{
          display: "flex",
          borderRadius: "9999px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "12px",
          fontWeight: 600,
          padding: "3px 10px",
        }}
      >
        Default
      </div>
      <div
        style={{
          display: "flex",
          borderRadius: "9999px",
          border: "1px solid rgba(242,240,238,0.24)",
          color: "#f2f0ee",
          fontSize: "12px",
          fontWeight: 600,
          padding: "3px 10px",
        }}
      >
        Outline
      </div>
    </div>
  )
}
