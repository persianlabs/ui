export function SheetPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "330px",
        height: "210px",
        borderRadius: "15px",
        border: "2px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "absolute",
          insetInlineEnd: 0,
          top: 0,
          bottom: 0,
          width: "40%",
          backgroundColor: "#1a1a1a",
          borderInlineStart: "2px solid rgba(242,240,238,0.16)",
          padding: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "12px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.5)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "80%",
            height: "9px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.2)",
          }}
        />
      </div>
    </div>
  )
}
