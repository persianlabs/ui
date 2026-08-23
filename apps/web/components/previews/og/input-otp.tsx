export function InputOTPPreview() {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {["1", "2", "3", "4"].map((digit, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: index === 1 ? "#f2f0ee" : "rgba(242,240,238,0.06)",
            border: "1px solid rgba(242,240,238,0.16)",
            color: index === 1 ? "#191817" : "#f2f0ee",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {digit}
        </div>
      ))}
    </div>
  )
}
