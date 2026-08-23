export function ButtonGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      {["Button 1", "Button 2"].map((label, index) => (
        <div
          key={label}
          style={{
            display: "flex",
            padding: "12px 20px",
            fontSize: "17px",
            color: "#f2f0ee",
            ...(index > 0
              ? { borderLeft: "1px solid rgba(242,240,238,0.16)" }
              : {}),
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
