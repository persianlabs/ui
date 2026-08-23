export function BreadcrumbPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "16px",
      }}
    >
      <div style={{ display: "flex", color: "rgba(242,240,238,0.5)" }}>
        Home
      </div>
      <div style={{ display: "flex", color: "rgba(242,240,238,0.3)" }}>/</div>
      <div style={{ display: "flex", color: "rgba(242,240,238,0.5)" }}>
        Components
      </div>
      <div style={{ display: "flex", color: "rgba(242,240,238,0.3)" }}>/</div>
      <div style={{ display: "flex", color: "#f2f0ee" }}>Breadcrumb</div>
    </div>
  )
}
