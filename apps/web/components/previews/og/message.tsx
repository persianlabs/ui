export function MessagePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "24px",
        width: "380px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "84px",
          height: "84px",
          borderRadius: "9999px",
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div
        style={{
          display: "flex",
          borderRadius: "32px",
          backgroundColor: "rgba(242,240,238,0.1)",
          color: "#f2f0ee",
          fontSize: "36px",
          padding: "24px 36px",
        }}
      >
        Got it, thanks!
      </div>
    </div>
  )
}
