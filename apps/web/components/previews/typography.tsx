import { preview } from "./shared"
export function TypographyPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: preview.foreground,
        }}
      >
        Persian interfaces
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "1px",
          backgroundColor: preview.border,
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          lineHeight: 1.5,
          color: preview.mutedForeground,
        }}
      >
        Clear hierarchy for headings, paragraphs, and readable Persian copy.
      </div>
    </div>
  )
}
