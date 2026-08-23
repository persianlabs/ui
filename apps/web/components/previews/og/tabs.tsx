export function TabsPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px",
        borderRadius: "14px",
        backgroundColor: "rgba(242,240,238,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          borderRadius: "10px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "17px",
          fontWeight: 600,
        }}
      >
        Overview
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "17px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        Activity
      </div>
    </div>
  )
}
