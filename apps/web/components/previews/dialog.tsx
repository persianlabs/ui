import { preview } from "./shared"
export function DialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "220px",
        borderRadius: "14px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.muted,
        padding: "16px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
        Edit profile
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
        }}
      >
        Make changes to your profile here.
      </div>
      <div
        style={{
          display: "flex",
          height: "24px",
          borderRadius: "6px",
          border: `1px solid ${preview.border}`,
        }}
      />
    </div>
  )
}
