import { preview } from "./shared"
export function SpinnerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "9999px",
        border: `2px solid ${preview.border}`,
        borderTopColor: preview.primary,
      }}
    />
  )
}
