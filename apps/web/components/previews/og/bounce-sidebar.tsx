const rows = [
  { label: "Home", active: true },
  { label: "Profile", active: false },
  { label: "Messages", active: false },
  { label: "Settings", heading: true },
  { label: "General", active: false },
  { label: "Billing", active: false },
]

export function BounceSidebarPreview() {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          position: "relative",
          paddingLeft: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "8px",
            top: "9px",
            width: "6px",
            height: "6px",
            borderRadius: "9999px",
            backgroundColor: "#FC4C01",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {rows.map((row) =>
            "heading" in row ? (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#FC4C01",
                  paddingTop: "18px",
                  paddingBottom: "2px",
                }}
              >
                {row.label}
              </div>
            ) : (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  fontSize: "14px",
                  color: row.active ? "#f2f0ee" : "rgba(242,240,238,0.5)",
                }}
              >
                {row.label}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
