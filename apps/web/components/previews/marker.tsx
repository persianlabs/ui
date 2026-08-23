import { preview } from "./shared"
export function MarkerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "200px",
        fontSize: "12px",
        color: preview.mutedForeground,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "1px",
          flex: 1,
          backgroundColor: preview.muted,
        }}
      />
      <div style={{ display: "flex" }}>OR</div>
      <div
        style={{
          display: "flex",
          height: "1px",
          flex: 1,
          backgroundColor: preview.muted,
        }}
      />
    </div>
  )
}
