export function SidebarPreview() {
  const rows = [
    { width: "70%", active: true },
    { width: "55%", active: false },
    { width: "62%", active: false },
  ]
  return (
    <div
      style={{
        display: "flex",
        width: "330px",
        height: "210px",
        borderRadius: "15px",
        border: "2px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.06)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "38%",
          padding: "18px 14px",
          backgroundColor: "#1a1a1a",
          borderInlineEnd: "2px solid rgba(242,240,238,0.16)",
        }}
      >
        {rows.map((row) => (
          <div
            key={row.width}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: row.width,
              height: "22px",
              borderRadius: "8px",
              backgroundColor: row.active
                ? "rgba(242,240,238,0.9)"
                : "rgba(242,240,238,0.08)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                marginLeft: "4px",
                backgroundColor: row.active
                  ? "#1a1a1a"
                  : "rgba(242,240,238,0.5)",
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(242,240,238,0.9)"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <div
            style={{
              width: "34%",
              height: "8px",
              borderRadius: "999px",
              backgroundColor: "rgba(242,240,238,0.4)",
            }}
          />
        </div>
        <div
          style={{
            width: "82%",
            height: "9px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.25)",
            marginBottom: "9px",
          }}
        />
        <div
          style={{
            width: "58%",
            height: "9px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.25)",
          }}
        />
      </div>
    </div>
  )
}
