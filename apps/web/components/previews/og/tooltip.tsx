export function TooltipPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: "12px",
          backgroundColor: "#f2f0ee",
          color: "#1a1a1a",
          fontSize: "24px",
          padding: "12px 20px",
        }}
      >
        Add to library
      </div>
      <div
        style={{
          display: "flex",
          width: "16px",
          height: "16px",
          backgroundColor: "#f2f0ee",
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: "16px",
          borderRadius: "16px",
          border: "1px solid rgba(242,240,238,0.2)",
          fontSize: "26px",
          color: "#f2f0ee",
          padding: "12px 32px",
        }}
      >
        Hover
      </div>
    </div>
  )
}
