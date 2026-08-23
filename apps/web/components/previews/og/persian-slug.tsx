import { reshapePersian } from "@workspace/ui/lib/persian-reshape"
export function PersianSlugPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <div
        dir="rtl"
        style={{
          display: "flex",
          fontSize: "24px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        {reshapePersian("راهنمای خرید")}
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
          fontSize: "22px",
          fontWeight: 700,
          color: "#f2f0ee",
        }}
      >
        {reshapePersian("راهنمای-خرید")}
      </div>
    </div>
  )
}
