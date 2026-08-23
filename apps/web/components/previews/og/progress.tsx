export function ProgressPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        height: "8px",
        borderRadius: "999px",
        backgroundColor: "rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "66%",
          height: "100%",
          backgroundColor: "#f2f0ee",
          borderRadius: "999px",
        }}
      />
    </div>
  )
}
