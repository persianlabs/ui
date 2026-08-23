export function BubblePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          borderRadius: "12px",
          backgroundColor: "rgba(242,240,238,0.1)",
          color: "#f2f0ee",
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        Hey there!
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          borderRadius: "12px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        How can I help?
      </div>
    </div>
  )
}
