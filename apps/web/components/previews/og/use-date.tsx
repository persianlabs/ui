export function UseDatePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        padding: "28px 40px",
        borderRadius: "20px",
        border: "1px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "40px",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#f2f0ee",
        }}
      >
        1404/06/01
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "26px",
          color: "rgba(242,240,238,0.55)",
        }}
      >
        14:22:05
      </div>
    </div>
  )
}
