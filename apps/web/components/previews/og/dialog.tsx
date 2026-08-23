export function DialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "220px",
        borderRadius: "14px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "rgba(242,240,238,0.04)",
        padding: "16px",
      }}
    >
      <div style={{ display: "flex", fontSize: "14px", color: "#f2f0ee" }}>
        Edit profile
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        Make changes to your profile here.
      </div>
      <div
        style={{
          display: "flex",
          height: "24px",
          borderRadius: "6px",
          border: "1px solid rgba(242,240,238,0.16)",
        }}
      />
    </div>
  )
}
