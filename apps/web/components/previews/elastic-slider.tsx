import { preview } from "./shared"
export function ElasticSliderPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "200px",
        height: "36px",
        borderRadius: "10px",
        backgroundColor: preview.muted,
        padding: "0 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          width: "55%",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Opacity
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: preview.mutedForeground,
        }}
      >
        0.55
      </div>
    </div>
  )
}
