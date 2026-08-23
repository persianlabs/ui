export function RadioGroupPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {["Default", "Comfortable"].map((label, i) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            fontSize: "24px",
            color: "#f2f0ee",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              borderRadius: "999px",
              border: "2px solid rgba(242,240,238,0.4)",
              backgroundColor: i === 1 ? "#f2f0ee" : "transparent",
            }}
          >
            {i === 1 && (
              <div
                style={{
                  display: "flex",
                  width: "9px",
                  height: "9px",
                  borderRadius: "999px",
                  backgroundColor: "#191817",
                }}
              />
            )}
          </div>
          {label}
        </div>
      ))}
    </div>
  )
}
