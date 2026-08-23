import { preview } from "./shared"
export function CheckboxPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "16px",
        color: preview.foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "16px",
          height: "16px",
          borderRadius: "4px",
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
          fontSize: "12px",
        }}
      >
        ✓
      </div>
      Accept terms
    </div>
  )
}
