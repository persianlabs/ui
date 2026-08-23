import { preview } from "./shared"
export function TogglePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        backgroundColor: preview.muted,
        color: preview.foreground,
        fontSize: "16px",
        fontWeight: 700,
      }}
    >
      B
    </div>
  )
}
