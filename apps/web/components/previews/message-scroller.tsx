import { preview } from "./shared"
export function MessageScrollerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "9999px",
        backgroundColor: preview.muted,
        color: preview.foreground,
      }}
    >
      ↓
    </div>
  )
}
