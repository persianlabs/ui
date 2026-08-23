import { ChevronDownGlyph, preview } from "./shared"
export function CitySelectorPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {[
        { label: "Province", value: "Alborz" },
        { label: "City", value: "Fardis" },
      ].map((field) => (
        <div
          key={field.label}
          style={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              color: preview.mutedForeground,
            }}
          >
            {field.label}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "220px",
              padding: "9px 14px",
              borderRadius: "10px",
              backgroundColor: preview.background,
              border: `1px solid ${preview.border}`,
              fontSize: "17px",
              color: preview.foreground,
            }}
          >
            <div style={{ display: "flex" }}>{field.value}</div>
            <div style={{ display: "flex" }}>
              <ChevronDownGlyph size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
