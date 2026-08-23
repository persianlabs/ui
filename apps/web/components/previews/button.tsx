import { preview } from "./shared"
export function ButtonPreview() {
  return (
    <div
      style={{
        display: "flex",
        padding: "12px 24px",
        borderRadius: "10px",
        backgroundColor: preview.primary,
        color: preview.primaryForeground,
        fontSize: "18px",
        fontWeight: 600,
      }}
    >
      Button
    </div>
  )
}
