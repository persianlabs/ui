export function PriceInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        width: "310px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "17px",
          fontWeight: 500,
          color: "rgba(242,240,238,0.68)",
        }}
      >
        Amount
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "310px",
          height: "78px",
          overflow: "hidden",
          borderRadius: "14px",
          border: "1px solid rgba(242,240,238,0.28)",
          backgroundColor: "#1e1d1b",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "0 22px",
            fontSize: "31px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            color: "#f2f0ee",
          }}
        >
          125,000
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
            width: "96px",
            borderLeft: "1px solid rgba(242,240,238,0.18)",
            backgroundColor: "rgba(242,240,238,0.1)",
            color: "rgba(242,240,238,0.8)",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Toman
        </div>
      </div>
    </div>
  )
}
