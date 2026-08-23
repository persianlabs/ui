import { ChevronDownGlyph } from "./shared"
export function ComboboxPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "260px",
        borderRadius: "14px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: "1px solid rgba(242,240,238,0.12)",
        }}
      >
        <div style={{ display: "flex", fontSize: "18px", color: "#f2f0ee" }}>
          Next.js
        </div>
        <div style={{ display: "flex" }}>
          <ChevronDownGlyph size={16} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: "rgba(242,240,238,0.6)",
          backgroundColor: "rgba(242,240,238,0.06)",
        }}
      >
        SvelteKit
      </div>
    </div>
  )
}
