import { preview } from "./shared"
export function DrawerPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
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
          alignItems: "center",
          gap: "8px",
          position: "absolute",
          insetInlineStart: 0,
          insetInlineEnd: 0,
          bottom: 0,
          height: "55%",
          backgroundColor: preview.background,
          borderTop: `1px solid ${preview.border}`,
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          padding: "10px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "36px",
            height: "4px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
          }}
        />
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "8px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
          }}
        />
      </div>
    </div>
  )
}
