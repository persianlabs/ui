import { preview } from "./shared"
export function ScrollAreaPreview() {
  const rows = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"]
  return (
    <div
      style={{
        display: "flex",
        width: "140px",
        height: "110px",
        borderRadius: "10px",
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "12px",
        }}
      >
        {rows.map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              fontSize: "12px",
              color: preview.foreground,
            }}
          >
            {row}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          insetInlineEnd: "3px",
          top: "8px",
          bottom: "8px",
          width: "4px",
          borderRadius: "999px",
          backgroundColor: preview.muted,
        }}
      />
    </div>
  )
}
