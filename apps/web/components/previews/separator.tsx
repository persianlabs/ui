import { preview } from "./shared"
export function SeparatorPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        width: "220px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "16px", color: preview.foreground }}
      >
        PersianLabs/ui
      </div>
      <div
        style={{
          display: "flex",
          height: "1px",
          width: "100%",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: preview.mutedForeground,
        }}
      >
        Design system foundation
      </div>
    </div>
  )
}
