export function UseControllableStatePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "190px",
      }}
    >
      {["Controlled", "Uncontrolled"].map((label, index) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: "10px",
            backgroundColor:
              index === 0 ? "rgba(242,240,238,0.1)" : "transparent",
            border: "1px solid rgba(242,240,238,0.16)",
            color: index === 0 ? "#f2f0ee" : "rgba(242,240,238,0.55)",
            fontSize: "12px",
          }}
        >
          <div style={{ display: "flex" }}>{label}</div>
          <div
            style={{
              display: "flex",
              width: "28px",
              height: "16px",
              justifyContent: index === 0 ? "flex-end" : "flex-start",
              alignItems: "center",
              padding: "2px",
              borderRadius: "999px",
              backgroundColor:
                index === 0 ? "#f2f0ee" : "rgba(242,240,238,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                backgroundColor: index === 0 ? "#191817" : "#f2f0ee",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
