import { ChevronDownGlyph, preview } from "./shared"
export function ComboboxPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "260px",
        borderRadius: "14px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: `1px solid ${preview.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "18px",
            color: preview.foreground,
          }}
        >
          Next.js
        </div>
        <div style={{ display: "flex" }}>
          <ChevronDownGlyph size={16} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: preview.mutedForeground,
          backgroundColor: preview.muted,
        }}
      >
        SvelteKit
      </div>
    </div>
  )
}
