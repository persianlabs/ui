import { preview } from "./shared"
export function SliderPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "220px",
        height: "16px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "6px",
          borderRadius: "999px",
          backgroundColor: preview.muted,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "40%",
            height: "100%",
            backgroundColor: preview.primary,
            borderRadius: "999px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "1px",
          left: "calc(40% - 7px)",
          width: "16px",
          height: "16px",
          borderRadius: "999px",
          backgroundColor: preview.background,
          border: `2px solid ${preview.primary}`,
        }}
      />
    </div>
  )
}
