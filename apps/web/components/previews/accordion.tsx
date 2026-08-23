import { ChevronDownGlyph, preview } from "./shared"
export function AccordionPreview() {
  const rows = ["Is it accessible?", "Is it styled?", "Is it animated?"]
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "220px" }}>
      {rows.map((row, i) => (
        <div
          key={row}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 2px",
            borderBottom:
              i < rows.length - 1 ? `1px solid ${preview.border}` : "none",
            fontSize: "13px",
            color: i === 0 ? preview.foreground : preview.mutedForeground,
          }}
        >
          <span>{row}</span>
          <ChevronDownGlyph size={14} />
        </div>
      ))}
    </div>
  )
}
