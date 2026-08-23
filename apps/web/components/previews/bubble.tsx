import { preview } from "./shared"
export function BubblePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          borderRadius: "12px",
          backgroundColor: preview.muted,
          color: preview.foreground,
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        Hey there!
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          borderRadius: "12px",
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        How can I help?
      </div>
    </div>
  )
}
