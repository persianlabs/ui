import { preview } from "./shared"
export function TooltipPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: "6px",
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
          fontSize: "12px",
          padding: "6px 10px",
        }}
      >
        Add to library
      </div>
      <div
        style={{
          display: "flex",
          width: "8px",
          height: "8px",
          backgroundColor: preview.primary,
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: "8px",
          borderRadius: "8px",
          border: `1px solid ${preview.border}`,
          fontSize: "13px",
          color: preview.foreground,
          padding: "6px 16px",
        }}
      >
        Hover
      </div>
    </div>
  )
}
