import { preview } from "./shared"
export function ProgressPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        height: "8px",
        borderRadius: "999px",
        backgroundColor: preview.muted,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "66%",
          height: "100%",
          backgroundColor: preview.primary,
          borderRadius: "999px",
        }}
      />
    </div>
  )
}
