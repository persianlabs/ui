export function MarkerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "252px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "252px",
          gap: "13px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "1px",
            flex: 1,
            backgroundColor: "rgba(242,240,238,0.24)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: 700,
            color: "#f2f0ee",
          }}
        >
          OR
        </div>
        <div
          style={{
            display: "flex",
            height: "1px",
            flex: 1,
            backgroundColor: "rgba(242,240,238,0.24)",
          }}
        />
      </div>
    </div>
  )
}
