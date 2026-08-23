export function KbdPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {["Ctrl", "K"].map((key) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: key === "Ctrl" ? "95px" : "65px",
            height: "75px",
            borderRadius: "10px",
            border: "1px solid rgba(242,240,238,0.28)",
            backgroundColor: "rgba(242,240,238,0.12)",
            color: "#f2f0ee",
            fontSize: key === "Ctrl" ? "24px" : "32px",
            fontWeight: 600,
          }}
        >
          {key}
        </div>
      ))}
    </div>
  )
}
