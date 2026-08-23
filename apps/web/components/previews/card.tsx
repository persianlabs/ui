import { preview } from "./shared"
export function CardPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        borderRadius: "14px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "16px 18px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "17px",
            color: preview.foreground,
          }}
        >
          Card Title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            color: preview.mutedForeground,
          }}
        >
          Card description text
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: `1px solid ${preview.border}`,
          padding: "12px 18px",
          fontSize: "13px",
          color: preview.mutedForeground,
        }}
      >
        Card footer
      </div>
    </div>
  )
}
