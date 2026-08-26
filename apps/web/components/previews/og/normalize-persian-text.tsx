import { reshapePersian } from "@workspace/ui/lib/persian-reshape"

// Persian output is the subject being demonstrated, so it stays here —
// reshaped through persian-reshape for Satori (see CLAUDE.md exception).
export function NormalizePersianTextPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "400px",
        padding: "22px 24px",
        border: "1px solid rgba(242,240,238,0.16)",
        borderRadius: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "monospace",
          fontSize: "24px",
          color: "rgba(242,240,238,0.45)",
          textDecoration: "line-through",
          textDecorationColor: "rgba(248,113,113,0.6)",
        }}
      >
        كتاب‌‌هاي خـواندني
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "27px",
          fontWeight: 700,
          lineHeight: 1.5,
          color: "#f2f0ee",
        }}
      >
        {reshapePersian("کتاب‌های خواندنی")}
      </div>
    </div>
  )
}
