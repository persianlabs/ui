import { numberToPersianWords } from "@workspace/ui/lib/number-to-persian-words"
import { reshapePersian } from "@workspace/ui/lib/persian-reshape"

// Persian output is the subject being demonstrated, so it stays here —
// reshaped through persian-reshape for Satori (see CLAUDE.md exception).
export function NumberToPersianWordsPreview() {
  const words = reshapePersian(
    numberToPersianWords("12500000", { suffix: "تومان", mode: "mixed" })
  )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "380px",
        padding: "22px 24px",
        border: "1px solid rgba(242,240,238,0.16)",
        borderRadius: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontFamily: "monospace",
          fontSize: "26px",
          letterSpacing: "0.04em",
          color: "rgba(242,240,238,0.45)",
        }}
      >
        12,500,000
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
        {words}
      </div>
    </div>
  )
}
