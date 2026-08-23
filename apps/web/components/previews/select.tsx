import { ChevronDownGlyph, preview } from "./shared"
export function SelectPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "220px",
        padding: "12px 18px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <div
        style={{ display: "flex", fontSize: "18px", color: preview.foreground }}
      >
        Apple
      </div>
      <div style={{ display: "flex" }}>
        <ChevronDownGlyph size={16} />
      </div>
    </div>
  )
}
