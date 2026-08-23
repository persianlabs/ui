export function UseMediaQueryPreview() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
      <div
        style={{
          display: "flex",
          width: "44px",
          height: "74px",
          borderRadius: "8px",
          border: "2px solid rgba(242,240,238,0.35)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "112px",
          height: "74px",
          borderRadius: "8px",
          border: "2px solid #f2f0ee",
          boxShadow: "0 0 0 5px rgba(242,240,238,0.08)",
        }}
      />
    </div>
  )
}
