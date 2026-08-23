export function SeparatorPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        width: "440px",
      }}
    >
      <div style={{ display: "flex", fontSize: "32px", color: "#f2f0ee" }}>
        PersianLabs/ui
      </div>
      <div
        style={{
          display: "flex",
          height: "2px",
          width: "100%",
          backgroundColor: "rgba(242,240,238,0.16)",
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "26px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        Design system foundation
      </div>
    </div>
  )
}
