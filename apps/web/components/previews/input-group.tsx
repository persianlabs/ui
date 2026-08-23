import { preview } from "./shared"
export function InputGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "240px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.mutedForeground,
      }}
    >
      Search...
    </div>
  )
}
