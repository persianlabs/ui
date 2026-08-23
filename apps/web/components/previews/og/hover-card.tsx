export function HoverCardPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "200px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "#191817",
        padding: "12px 14px",
      }}
    >
      <div style={{ display: "flex", fontSize: "14px", color: "#f2f0ee" }}>
        @shadcn
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        The React Framework for design engineers
      </div>
    </div>
  )
}
