import { preview } from "./shared"
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
      <div style={{ display: "flex", color: preview.mutedForeground }}>
        Home
      </div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>/</div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>
        Components
      </div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>/</div>
      <div style={{ display: "flex", color: preview.foreground }}>
        Breadcrumb
      </div>
    </div>
  )
}
