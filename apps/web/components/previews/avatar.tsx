import { preview } from "./shared"
export function AvatarPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "48px",
        height: "48px",
        borderRadius: "9999px",
        backgroundColor: preview.muted,
        color: preview.foreground,
        fontSize: "16px",
        fontWeight: 700,
      }}
    >
      CN
    </div>
  )
}
