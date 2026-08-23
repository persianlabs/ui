export function PopoverPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "18px",
        width: "280px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "54px",
          padding: "0 22px",
          borderRadius: "12px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        Open popover
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "280px",
          borderRadius: "16px",
          border: "1px solid rgba(242,240,238,0.2)",
          backgroundColor: "#242321",
          padding: "20px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "22px",
            fontWeight: 600,
            color: "#f2f0ee",
          }}
        >
          Dimensions
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            lineHeight: 1.4,
            color: "rgba(242,240,238,0.58)",
          }}
        >
          Set the dimensions for the layer.
        </div>
      </div>
    </div>
  )
}
