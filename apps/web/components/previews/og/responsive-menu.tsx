import { ContextMenuPreview } from "./context-menu"
export function ResponsiveMenuPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transform: "scale(1.5)",
      }}
    >
      <ContextMenuPreview />
    </div>
  )
}
