export function MessagePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "16px",
        width: "253px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "56px",
          height: "56px",
          borderRadius: "9999px",
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div
        style={{
          display: "flex",
          borderRadius: "21px",
          backgroundColor: "rgba(242,240,238,0.1)",
          color: "#f2f0ee",
          fontSize: "24px",
          padding: "16px 24px",
        }}
      >
        Got it, thanks!
      </div>
    </div>
  )
}
