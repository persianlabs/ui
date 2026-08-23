import { preview } from "./shared"
export function FieldPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "200px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Email
      </div>
      <div
        style={{
          display: "flex",
          padding: "9px 12px",
          borderRadius: "8px",
          backgroundColor: preview.background,
          border: `1px solid ${preview.border}`,
          fontSize: "13px",
          color: preview.mutedForeground,
        }}
      >
        you@example.com
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: preview.mutedForeground,
        }}
      >
        We&apos;ll never share your email.
      </div>
    </div>
  )
}
