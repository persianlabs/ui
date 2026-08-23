import { preview } from "./shared"
export function AspectRatioPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "220px",
        height: "124px",
        borderRadius: "12px",
        backgroundColor: preview.muted,
        border: `1px solid ${preview.border}`,
        fontSize: "12px",
        color: preview.mutedForeground,
      }}
    >
      16 : 9
    </div>
  )
}
