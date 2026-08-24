import { reshapePersian } from "@workspace/ui/lib/persian-reshape"

const SAMPLE = "راهنمای خرید"

export function PersianReshapePreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div
        dir="rtl"
        style={{
          display: "flex",
          fontSize: "24px",
          color: "rgba(242,240,238,0.35)",
        }}
      >
        {SAMPLE}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "24px",
          color: "rgba(242,240,238,0.4)",
        }}
      >
        →
      </div>
      <div
        dir="rtl"
        style={{
          display: "flex",
          fontSize: "24px",
          fontWeight: 700,
          color: "#f2f0ee",
        }}
      >
        {reshapePersian(SAMPLE)}
      </div>
    </div>
  )
}
