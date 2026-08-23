import { preview } from "./shared"
export function InputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "220px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.mutedForeground,
      }}
    >
      you@example.com
    </div>
  )
}
