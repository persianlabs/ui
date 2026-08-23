import { preview } from "./shared"
export function SkeletonPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "140px",
          height: "10px",
          borderRadius: "6px",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100px",
          height: "10px",
          borderRadius: "6px",
          backgroundColor: preview.muted,
        }}
      />
    </div>
  )
}
