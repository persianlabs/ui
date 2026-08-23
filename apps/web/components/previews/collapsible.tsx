import { ChevronDownGlyph, preview } from "./shared"
export function CollapsiblePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "220px",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: preview.foreground,
        }}
      >
        <span>3 starred repos</span>
        <ChevronDownGlyph size={14} />
      </div>
      <div
        style={{
          display: "flex",
          padding: "8px 12px",
          borderRadius: "8px",
          border: `1px solid ${preview.border}`,
          color: preview.mutedForeground,
        }}
      >
        @base_ui/react
      </div>
    </div>
  )
}
