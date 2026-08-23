import { CheckCircleGlyph } from "./shared"
export function ToastPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "13px",
        width: "299px",
        padding: "16px 18px",
        borderRadius: "21px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CheckCircleGlyph size={23} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div
          style={{
            display: "flex",
            fontSize: "17px",
            fontWeight: 600,
            color: "#f2f0ee",
          }}
        >
          Event created
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "14px",
            color: "rgba(242,240,238,0.5)",
          }}
        >
          Sunday, December 3 at 9:00 AM
        </div>
      </div>
    </div>
  )
}
