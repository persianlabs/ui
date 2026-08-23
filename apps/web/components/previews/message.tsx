import { preview } from "./shared"
export function MessagePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "28px",
          height: "28px",
          borderRadius: "9999px",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          borderRadius: "12px",
          backgroundColor: preview.muted,
          color: preview.foreground,
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        Got it, thanks!
      </div>
    </div>
  )
}
