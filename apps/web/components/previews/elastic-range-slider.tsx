import { preview } from "./shared"
export function ElasticRangeSliderPreview() {
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
          insetInlineStart: "25%",
          insetInlineEnd: "20%",
          top: 0,
          bottom: 0,
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Price
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: preview.mutedForeground,
        }}
      >
        $200 – $700
      </div>
    </div>
  )
}
