export function SliderPreview() {
  // Unfilled track on the left, filled portion on the right, thumb sitting
  // right at the far edge of the fill — not at the fill/unfilled boundary.
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "220px",
        height: "16px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          height: "6px",
          borderRadius: "999px",
          backgroundColor: "rgba(242,240,238,0.16)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "72%",
            height: "100%",
            backgroundColor: "#f2f0ee",
            borderRadius: "999px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "1px",
          left: "34%",
          marginLeft: "-16px",
          width: "16px",
          height: "16px",
          borderRadius: "999px",
          backgroundColor: "#191817",
          border: "2px solid #f2f0ee",
        }}
      />
    </div>
  )
}
