export function NormalizePersianDigitsPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div
        style={{
          display: "flex",
          fontSize: "28px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        ۱۲۳۴۵
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "24px",
          color: "rgba(242,240,238,0.4)",
        }}
      >
        →
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "28px",
          fontWeight: 700,
          color: "#f2f0ee",
        }}
      >
        12345
      </div>
    </div>
  )
}
