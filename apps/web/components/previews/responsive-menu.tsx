import { ContextMenuPreview } from "./context-menu"
export function ResponsiveMenuPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <ContextMenuPreview />
    </div>
  )
}
