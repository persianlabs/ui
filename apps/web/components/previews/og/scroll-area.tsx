export function ScrollAreaPreview() {
  const rows = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"]
  return (
    <div
      style={{
        display: "flex",
        width: "210px",
        height: "165px",
        borderRadius: "15px",
        border: "2px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "18px",
        }}
      >
        {rows.map((row) => (
          <div
            key={row}
            style={{ display: "flex", fontSize: "18px", color: "#f2f0ee" }}
          >
            {row}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          insetInlineEnd: "5px",
          top: "12px",
          bottom: "12px",
          width: "6px",
          borderRadius: "999px",
          backgroundColor: "rgba(242,240,238,0.24)",
        }}
      />
    </div>
  )
}
