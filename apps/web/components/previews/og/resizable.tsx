export function ResizablePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "360px",
        height: "160px",
        borderRadius: "20px",
        border: "2px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "rgba(242,240,238,0.08)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "4px",
          backgroundColor: "rgba(242,240,238,0.24)",
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      />
    </div>
  )
}
