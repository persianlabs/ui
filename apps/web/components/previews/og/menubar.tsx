export function MenubarPreview() {
  const items = ["File", "Edit", "View"]
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
        borderRadius: "10px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "rgba(242,240,238,0.04)",
        padding: "6px",
      }}
    >
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            display: "flex",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "13px",
            backgroundColor: i === 0 ? "rgba(242,240,238,0.14)" : "transparent",
            color: "#f2f0ee",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
