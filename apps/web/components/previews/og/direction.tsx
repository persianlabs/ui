export function DirectionPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "300px",
        height: "190px",
        gap: "20px",
        borderRadius: "18px",
        border: "1px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.07)",
        fontSize: "46px",
        fontWeight: 700,
        color: "#f2f0ee",
      }}
    >
      <div style={{ display: "flex", letterSpacing: "-2px" }}>LTR</div>
      <div
        style={{
          display: "flex",
          color: "rgba(242,240,238,0.5)",
          fontSize: "38px",
        }}
      >
        {"↔"}
      </div>
      <div style={{ display: "flex", letterSpacing: "-2px" }}>RTL</div>
    </div>
  )
}
