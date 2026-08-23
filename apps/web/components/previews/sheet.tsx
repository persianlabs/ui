import { preview } from "./shared"
export function SheetPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        height: "140px",
        borderRadius: "10px",
        backgroundColor: preview.muted,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "absolute",
          insetInlineEnd: 0,
          top: 0,
          bottom: 0,
          width: "40%",
          backgroundColor: preview.background,
          borderInlineStart: `1px solid ${preview.border}`,
          padding: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "8px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
          }}
        />
        <div
          style={{
            display: "flex",
            width: "80%",
            height: "6px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
          }}
        />
      </div>
    </div>
  )
}
