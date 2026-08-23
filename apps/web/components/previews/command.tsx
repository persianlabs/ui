import { SearchGlyph, preview } from "./shared"
export function CommandPreview() {
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
          gap: "8px",
          padding: "12px 18px",
          borderBottom: `1px solid ${preview.border}`,
        }}
      >
        <div style={{ display: "flex" }}>
          <SearchGlyph size={16} />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: preview.mutedForeground,
          }}
        >
          Search commands...
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: preview.foreground,
          backgroundColor: preview.muted,
        }}
      >
        Calendar
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: preview.mutedForeground,
        }}
      >
        Calculator
      </div>
    </div>
  )
}
