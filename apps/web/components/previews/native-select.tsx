import { ChevronDownGlyph, preview } from "./shared"
export function NativeSelectPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "180px",
        padding: "10px 14px",
        borderRadius: "8px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.foreground,
      }}
    >
      Next.js
      <ChevronDownGlyph size={14} />
    </div>
  )
}
