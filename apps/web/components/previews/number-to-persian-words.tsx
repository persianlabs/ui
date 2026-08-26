import { numberToPersianWords } from "@workspace/ui/lib/number-to-persian-words"

import { preview } from "./shared"

export function NumbertoPersianWordsPreview() {
  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "240px",
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
          letterSpacing: "0.04em",
        }}
      >
        12500000
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
        {numberToPersianWords("12500000", {
          suffix: "تومان",
          mode: "mixed",
        })}
      </div>
    </div>
  )
}
