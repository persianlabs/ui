export function ElasticSliderPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "200px",
        height: "36px",
        borderRadius: "10px",
        backgroundColor: "rgba(242,240,238,0.1)",
        padding: "0 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          width: "55%",
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Opacity
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        0.55
      </div>
    </div>
  )
}
