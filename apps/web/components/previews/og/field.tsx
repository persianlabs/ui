export function FieldPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "200px",
      }}
    >
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Email
      </div>
      <div
        style={{
          display: "flex",
          padding: "9px 12px",
          borderRadius: "8px",
          backgroundColor: "#191817",
          border: "1px solid rgba(242,240,238,0.16)",
          fontSize: "13px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        you@example.com
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        We&apos;ll never share your email.
      </div>
    </div>
  )
}
