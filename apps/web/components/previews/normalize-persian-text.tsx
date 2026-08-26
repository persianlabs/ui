import { preview } from "./shared"

export function NormalizePersianTextPreview() {
  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "250px",
        padding: "12px 14px",
        border: `1px solid ${preview.border}`,
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          color: preview.mutedForeground,
          fontFamily: "monospace",
          fontSize: "13px",
          textDecoration: "line-through",
          textDecorationColor: "rgba(248,113,113,0.55)",
        }}
      >
        كتاب‌‌هاي خواندني
      </div>
      <div
        style={{
          display: "flex",
          color: preview.foreground,
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: 1.6,
        }}
      >
        کتاب‌های خواندنی
      </div>
    </div>
  )
}
