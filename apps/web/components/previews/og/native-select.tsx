import { ChevronDownGlyph } from "./shared"
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
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        fontSize: "16px",
        color: "#f2f0ee",
      }}
    >
      Next.js
      <ChevronDownGlyph size={14} />
    </div>
  )
}
