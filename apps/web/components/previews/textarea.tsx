import { preview } from "./shared"
export function TextareaPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        minHeight: "64px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.mutedForeground,
      }}
    >
      Type your message here.
    </div>
  )
}
