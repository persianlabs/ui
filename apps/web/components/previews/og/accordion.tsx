import { ChevronDownGlyph } from "./shared"
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
              i < rows.length - 1 ? "1px solid rgba(242,240,238,0.12)" : "none",
            fontSize: "13px",
            color: i === 0 ? "#f2f0ee" : "rgba(242,240,238,0.6)",
          }}
        >
          <span>{row}</span>
          <ChevronDownGlyph size={14} />
        </div>
      ))}
    </div>
  )
}
