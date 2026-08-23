import { ChevronDownGlyph, preview } from "./shared"
export function EmptyPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: "220px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          backgroundColor: preview.muted,
        }}
      >
        <ChevronDownGlyph size={20} />
      </div>
      <div
        style={{ display: "flex", fontSize: "16px", color: preview.foreground }}
      >
        No results
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
          textAlign: "center",
        }}
      >
        Nothing to show yet
      </div>
    </div>
  )
}
