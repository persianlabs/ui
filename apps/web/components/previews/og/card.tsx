export function CardPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        borderRadius: "14px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "16px 18px",
        }}
      >
        <div style={{ display: "flex", fontSize: "17px", color: "#f2f0ee" }}>
          Card Title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            color: "rgba(242,240,238,0.5)",
          }}
        >
          Card description text
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(242,240,238,0.12)",
          padding: "12px 18px",
          fontSize: "13px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        Card footer
      </div>
    </div>
  )
}
