export function ToggleGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      {["B", "I", "U"].map((letter, i) => (
        <div
          key={letter}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            backgroundColor: i === 0 ? "rgba(242,240,238,0.14)" : "transparent",
            color: "#f2f0ee",
            fontSize: "16px",
            fontWeight: 700,
            ...(i > 0
              ? { borderInlineStart: "1px solid rgba(242,240,238,0.16)" }
              : {}),
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}
