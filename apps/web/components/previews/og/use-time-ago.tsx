export function UseTimeAgoPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "18px 24px",
        borderRadius: "16px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "rgba(242,240,238,0.06)",
      }}
    >
      <div style={{ display: "flex", fontSize: "24px", color: "#f2f0ee" }}>
        2 hours ago
      </div>
    </div>
  )
}
