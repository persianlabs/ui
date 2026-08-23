import { TomanGlyph, preview } from "./shared"
export function TomanIconPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "56px",
        height: "56px",
        borderRadius: "14px",
        backgroundColor: preview.muted,
      }}
    >
      <TomanGlyph size={28} />
    </div>
  )
}
