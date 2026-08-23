import { TomanGlyph, preview } from "./shared"
export function PriceInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "200px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "16px",
          fontWeight: 600,
          color: preview.foreground,
        }}
      >
        125,000
      </div>
      <div style={{ display: "flex", marginInlineStart: "auto" }}>
        <TomanGlyph size={16} />
      </div>
    </div>
  )
}
