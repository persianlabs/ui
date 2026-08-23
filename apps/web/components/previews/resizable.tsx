import { preview } from "./shared"
export function ResizablePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "180px",
        height: "80px",
        borderRadius: "10px",
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "2px",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      />
    </div>
  )
}
