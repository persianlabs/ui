import { SearchGlyph } from "./shared"
export function CommandPreview() {
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
          gap: "8px",
          padding: "12px 18px",
          borderBottom: "1px solid rgba(242,240,238,0.12)",
        }}
      >
        <div style={{ display: "flex" }}>
          <SearchGlyph size={16} />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "rgba(242,240,238,0.5)",
          }}
        >
          Search commands...
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: "#f2f0ee",
          backgroundColor: "rgba(242,240,238,0.06)",
        }}
      >
        Calendar
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        Calculator
      </div>
    </div>
  )
}
