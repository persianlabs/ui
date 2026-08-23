export function HitboxPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "264px",
        height: "264px",
        borderRadius: "14px",
        border: "2px dashed #f87171",
        backgroundColor: "rgba(248,113,113,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "64px",
          height: "64px",
          borderRadius: "8px",
          backgroundColor: "#383634",
          border: "1px solid rgba(242,240,238,0.14)",
        }}
      />
    </div>
  )
}
